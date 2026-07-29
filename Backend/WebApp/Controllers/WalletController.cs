using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.DTOs.WalletDTOs;
using Application.Services.Interfaces;
using Application.DTOs.WalletDTOs;
using System.Runtime.CompilerServices;
using Microsoft.Extensions.Options;
using Infrastructure.Options;

namespace WebApp.Controllers
{
    [Route("[controller]/[action]")]
    public class WalletController(IWalletsService walletsService) : ControllerBase
    {
        private IWalletsService WalletsService { get; init; } = walletsService;

        [HttpPost]
        [Authorize]
        [Consumes("application/json")]
        public async Task<IActionResult> AddWallet([FromBody] WalletCredentialsDTO info)
        {
            await WalletsService.AddWalletAsync((int)HttpContext.Items["userId"], info);
            return Ok();
        }

        [HttpDelete]
        [Authorize]
        [Route("{type}")]
        public async Task<IActionResult> RemoveWallet([FromRoute] string type)
        {
            await WalletsService.RemoveWalletAsync((int)HttpContext.Items["userId"], type);
            return Ok();
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetWallets()
        {
            IEnumerable<WalletDTO> answ = await WalletsService.GetAllWalletsAsync((int)HttpContext.Items["userId"]);
            return Ok(answ);
        }

        [HttpGet]
        [Authorize]
        [Route("{exchangeName}")]
        public async Task<IActionResult> GetWallet(string exchangeName)
        {
            var wallet = await WalletsService.GetWalletByNameAsync(exchangeName.ToLower(), (int)HttpContext.Items["userId"]);
            return Ok(wallet);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetWalletActivities([FromQuery] string exchangeName)
        {
            return Ok(await WalletsService.GetWalletActivitiesAsync(exchangeName.ToLower(), (int)HttpContext.Items["userId"]));
        }

        [HttpPost("/stats")]
        [Authorize]
        public async Task<IActionResult> GetWalletsStats()
        {
            await WalletsService.UpdateWalletsStatsAsync();
            return Ok();
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllWalletsBalanceStats()
        {
            return Ok(await WalletsService.GetAllWalletBalanceStatsAsync((int)HttpContext.Items["userId"]));
        }
        
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetWalletBalanceStats(string exchangeName)
        {
            return Ok(await WalletsService.GetWalletBalanceStatsAsync(exchangeName, (int)HttpContext.Items["userId"]));
        }
    }
}