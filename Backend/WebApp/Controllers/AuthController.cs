using Microsoft.AspNetCore.Mvc;
using Application.Services.Interfaces;
using Application.DTOs.UserDTOs;

namespace WebApp.Controllers
{
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private IAuthService AuthService { get; init; }
        private ITokensService TokensService { get; init; }

        public AuthController(IAuthService authService, ITokensService tokensService)
        {
            AuthService = authService;
            TokensService = tokensService;
        }

        [HttpGet]
        [Route("sign-with-google")]
        public async Task<IActionResult> GetWithGoogle([FromQuery] string code)
        {
            var id = await AuthService.GoogleAuth(code);
            await TokensService.CreateJwtTokensForNewUserAsync(id);
            return Redirect("http://localhost:3000/app/main");
        }

        [HttpGet]
        [Route("enters")]
        public async Task<IActionResult> GetAllEnters()
        {
            return Ok(await TokensService.GetAllValidRefTokensByUserId((int)HttpContext.Items["userId"]));
        }

        [HttpPost]
        [Route("sign-in")]
        [Consumes("application/json")]
        public async Task<IActionResult> SignIn([FromBody] LoginInfoDTO info)
        {
            int userId = await AuthService.PasswordAuth(info);
            await TokensService.CreateJwtTokensForEnteredUserAsync(userId);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Auth()
        {
            await TokensService.CreateNewJwtTokensByRefreshTokenAsync();
            return Ok();
        }

        [HttpPost]
        [Route("sign-up")]
        [Consumes("application/json")]
        public async Task<IActionResult> SignUp([FromBody] LoginInfoDTO loginInfo)
        {
            var user = await AuthService.AddAccountAsync(loginInfo);
            await TokensService.CreateJwtTokensForNewUserAsync(user);
            return Ok();
        }

        [HttpPost]
        [Route("log-out")]
        public async Task<IActionResult> LogOut()
        {
            await AuthService.LogOut((int)HttpContext.Items["userId"]);
            return Ok();
        }
    }
}