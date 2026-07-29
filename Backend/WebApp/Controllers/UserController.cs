using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Interfaces;
using Application.DTOs.UserDTOs;
using Application.DTOs.ExchangeDTOs;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController(IAuthService authService, ITokensService tService, IUsersService usersService) : ControllerBase
    {
        private readonly ITokensService TService = tService;
        private readonly IUsersService UsersService = usersService;
        private readonly IAuthService AuthService = authService;

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            AccountInfoDTO info = await UsersService.GetAccountInfoAsync((int)HttpContext.Items["userId"]);
            return Ok(info);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetFavCoins()
        {
            List<CoinExchangeDTO> coins = await UsersService.GetFavCoinsAsync((int)HttpContext.Items["userId"]);
            return Ok(coins);
        }

        [HttpPost]
        public async Task<IActionResult> SetFavCoin([FromQuery] string coinId, [FromQuery] string symbol)
        {
            await UsersService.SetFavCoinAsync((int)HttpContext.Items["userId"], coinId, symbol);
            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveFavCoin([FromRoute] string id)
        {
            await UsersService.RemoveFavCoinAsync(id);
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