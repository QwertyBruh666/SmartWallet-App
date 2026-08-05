using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Interfaces;
using Application.DTOs.UserDTOs;
using Application.DTOs.ExchangeDTOs;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController(IAuthService authService, ITokensService tService, IUsersService usersService) : ControllerBase
    {
        private readonly ITokensService TService = tService;
        private readonly IUsersService UsersService = usersService;
        private readonly IAuthService AuthService = authService;

        [HttpGet]
        [Authorize]
        [Route("me")]
        public async Task<IActionResult> GetUser()
        {
            AccountInfoDTO info = await UsersService.GetAccountInfoAsync((int)HttpContext.Items["userId"]);
            return Ok(info);
        }

        [HttpGet]
        [Authorize]
        [Route("favorites")]
        public async Task<IActionResult> GetFavCoins()
        {
            List<CoinExchangeDTO> coins = await UsersService.GetFavCoinsAsync((int)HttpContext.Items["userId"]);
            return Ok(coins);
        }

        [HttpPost]
        [Route("favorites")]
        public async Task<IActionResult> SetFavCoin([FromQuery] string coinId, [FromQuery] string symbol)
        {
            await UsersService.SetFavCoinAsync((int)HttpContext.Items["userId"], coinId, symbol);
            return Ok();
        }

        [HttpDelete]
        [Route("favorites/{coinId}")]
        public async Task<IActionResult> RemoveFavCoin([FromRoute] string coinId)
        {
            await UsersService.RemoveFavCoinAsync(coinId);
            return Ok();
        }

        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> AddNewUser([FromBody] LoginInfoDTO loginInfo)
        {
            var user = await AuthService.AddAccountAsync(loginInfo);
            Console.WriteLine(user);
            await TService.CreateJwtTokensForNewUserAsync(user);
            return Ok();
        }
    }
}