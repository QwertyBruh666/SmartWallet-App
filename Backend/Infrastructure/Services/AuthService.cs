using System.Net.Http.Json;
using Application.DTOs.UserDTOs;
using Application.Services.Interfaces;
using Domain.Entities;
using Application.CustomExceptions;
using Google.Apis.Auth;
using System.Text;
using System.Security.Cryptography;
using Application.DataBase;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Infrastructure.Options;
using Microsoft.Extensions.Options;


namespace Infrastructure.Services
{
    public class AuthService(HttpClient httpClient, IAppDbContext dbContext, IHttpContextAccessor httpContext, IOptions<OAuthOptions> oAuthOptions) : IAuthService
    {
        readonly OAuthOptions OAuthOptions = oAuthOptions.Value;
        readonly HttpClient Client = httpClient;
        readonly IAppDbContext DbContext = dbContext;
        readonly HttpContext HttpContext = httpContext.HttpContext;

        public async Task<int> AddAccountAsync(LoginInfoDTO lInfo)
        {
            byte[] inputPassHashBytes = Encoding.UTF8.GetBytes(lInfo.Password);
            byte[] hashPassBytes = SHA256.HashData(inputPassHashBytes);
            User? user = new User() { UserName = lInfo.UserName, Password = Convert.ToHexString(hashPassBytes) };
            try
            {
                await DbContext.Users.AddAsync(user);
                await DbContext.SaveChangesAsync();
            }
            catch
            {
                throw new UserException(409, "USER.ALREADY_EXISTS", $"Пользователь с именем {lInfo.UserName} уже существует!");
            }
            return user.Id;
        }

        public async Task<int> GoogleAuth(string code)
        {
            string basePath = "https://oauth2.googleapis.com/token";
            Dictionary<string, string> dict = new()
            {
                { "client_id", OAuthOptions.ClientId },
                { "client_secret", OAuthOptions.ClientSecret },
                { "grant_type", "authorization_code" },
                { "redirect_uri", "http://localhost:5004/Auth/GetWithGoogle" },
                { "code", code }
            };
            HttpResponseMessage answ = await Client.PostAsync(basePath, new FormUrlEncodedContent(dict));
            var answContent = await answ.Content.ReadFromJsonAsync<GoogleAccountDTO>();
            var payload = await GoogleJsonWebSignature.ValidateAsync(answContent.id_token);
            string email = payload.Email;
            User user = new User() { UserName = email };
            try
            {
                await DbContext.Users.AddAsync(user);
                await DbContext.SaveChangesAsync();
                await DbContext.OAuths.AddAsync(new OAuth() { ServiceName = "Google", UserId = user.Id });
                await DbContext.SaveChangesAsync();
            }
            catch (Exception _)
            {
                DbContext.Entry(user).State = EntityState.Detached;
                return (await DbContext.Users.FirstOrDefaultAsync(u => u.UserName == user.UserName)).Id;
            }
            return user.Id;
        }

        public async Task<int> PasswordAuth(LoginInfoDTO userInfo)
        {
            User user = await DbContext.Users.FirstOrDefaultAsync(u => u.UserName == userInfo.UserName) ?? throw new UserException(401, "USER.NOT_FOUND", $"Пользователь с именем {userInfo.UserName} не существует!");
            byte[] inputPassHashBytes = Encoding.UTF8.GetBytes(userInfo.Password);
            byte[] hashPassBytes = SHA256.HashData(inputPassHashBytes);
            if (user.Password != Convert.ToHexString(hashPassBytes))
                throw new UserException(401, "USER.FAIL_VALIDATE", $"У пользователя {userInfo.UserName} другой пароль!");
            return user.Id;
        }

        public async Task LogOut(int userId)
        {
            HttpContext.Response.Cookies.Delete("refreshToken");
            HttpContext.Response.Cookies.Delete("accessToken");
            DbContext.RefTokens.Remove(await DbContext.RefTokens.FirstAsync(t => t.UserId == userId));
        }
    }
}