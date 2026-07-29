using Application.Services.Interfaces;
using Domain.Entities;
using Domain.CustomExceptions;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Application.DataBase;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Options;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class TokensService(IAppDbContext dbContext, IHttpContextAccessor httpContextAccessor, IOptions<AuthOptions> options) : ITokensService
    {
        private AuthOptions Options = options.Value;
        private IAppDbContext DbContext = dbContext;
        private HttpContext Context = httpContextAccessor.HttpContext;

        private void CreateJwtTokens(List<Claim> rClaims, List<Claim> aClaims)
        {
            JwtSecurityToken rToken = new(issuer: "Kolobok&CO", audience: "Papich", claims: rClaims, expires: DateTime.UtcNow.AddDays(30), signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mySuperPuperVerySecureFuckingKey")), SecurityAlgorithms.HmacSha256));
            JwtSecurityToken aToken = new(issuer: "Kolobok&CO", audience: "Papich", claims: aClaims, expires: DateTime.UtcNow.AddMinutes(15), signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mySuperPuperVerySecureFuckingKey")), SecurityAlgorithms.HmacSha256));

            //Строковое представление jwt токенов
            string strRToken = new JwtSecurityTokenHandler().WriteToken(rToken);
            string strAToken = new JwtSecurityTokenHandler().WriteToken(aToken);

            Context.Response.Cookies.Append("refreshToken", strRToken, new CookieOptions() { HttpOnly = true, Expires = DateTime.UtcNow.AddDays(29) });
            Context.Response.Cookies.Append("accessToken", strAToken, new CookieOptions() { HttpOnly = true, Expires = DateTime.UtcNow.AddMinutes(14) });
        }
        public async Task CreateNewJwtTokensByRefreshTokenAsync()
        {
            Console.WriteLine($"Cookie count: {Context.Request.Cookies.Count}");
            Console.WriteLine($"Has refresh token: {Context.Request.Cookies.ContainsKey("refreshToken")}");
             if (!Context.Request.Cookies.ContainsKey("refreshToken"))
                throw new AuthException(401, "AUTH.TOKEN_EXPIRED", "User need to log in again");
            string cook = Context.Request.Cookies.First(c => c.Key == "refreshToken").Value;
            var check = new JwtSecurityTokenHandler().ValidateToken(cook, new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidIssuer = "Kolobok&CO",
                ValidateAudience = true,
                ValidAudience = "Papich",
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Options.JwtSecurityKey)),
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken _);

            JwtSecurityToken oldTokenValue = new JwtSecurityTokenHandler().ReadJwtToken(cook);
            string userId = oldTokenValue.Claims.FirstOrDefault(i => i.Type.EndsWith("/name")).Value ?? throw new AuthException(401, "AUTH.WRONG_TOKEN", "Wrong token");
            string newGuidVal = Guid.NewGuid().ToString();
            Console.WriteLine($"UserId: {userId}");
            Console.WriteLine($"Кол-во найденных токенов: { DbContext.RefTokens.Where(t => t.UserId.ToString() == userId).ToList().Count}");
            int rowsAffected = await DbContext.RefTokens.Where(t => t.UserId.ToString() == userId ).ExecuteUpdateAsync(s => s.SetProperty(t => t.Jti, newGuidVal));
            if (rowsAffected == 0)
                throw new AuthException(401, "AUTH.REUSED_TOKEN", "Token was used before");
            List<Claim> rClaims = [new(ClaimTypes.Name, userId.ToString()), new(ClaimTypes.Authentication, newGuidVal)];
            List<Claim> aClaims = [new(ClaimTypes.Name, userId)];
            
            CreateJwtTokens(rClaims, aClaims);
            Console.WriteLine("USER ENTER BY REFRESH TOKEN");
        }
        public async Task CreateJwtTokensForNewUserAsync(int userId)
        {
            Guid jti = Guid.NewGuid();

            List<Claim> rClaims = [new(ClaimTypes.Name, userId.ToString()), new Claim(ClaimTypes.Authentication, Guid.NewGuid().ToString()) ];
            List<Claim> aClaims = [new(ClaimTypes.Name, userId.ToString())];

            await DbContext.RefTokens.AddAsync(new RefToken() { UserId = userId, Jti = jti.ToString() });
            await DbContext.SaveChangesAsync();

            CreateJwtTokens(rClaims, aClaims);
        }
        public async Task CreateJwtTokensForEnteredUserAsync(int userId)
        {
            Guid jti = Guid.NewGuid();
            await DbContext.RefTokens.AddAsync(new RefToken() { UserId = userId, Jti = jti.ToString() });
            await DbContext.SaveChangesAsync();
            List<Claim> rClaims = [new(ClaimTypes.Name, userId.ToString()), new Claim(ClaimTypes.Authentication, Guid.NewGuid().ToString()) ];
            List<Claim> aClaims = [new(ClaimTypes.Name, userId.ToString())];
            CreateJwtTokens(rClaims, aClaims);
        }
        public async Task<List<RefToken>> GetAllValidRefTokensByUserId(int userId)
        {
            return await DbContext.RefTokens.Where(t => t.UserId == userId && t.UsedAt == null).ToListAsync();
        }
    }
}