using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.DTOs.WalletDTOs;
using Application.Services.Interfaces;

namespace WebApp.Controllers
{
    [Route("wallets")]
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
        [Route("{walletId}")]
        public async Task<IActionResult> RemoveWallet([FromRoute] string walletId)
        {
            await WalletsService.RemoveWalletAsync((int)HttpContext.Items["userId"], walletId);
            return Ok();
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetWallets()
        {
            IEnumerable<WalletDTO> answ = await WalletsService.GetWalletsAsync((int)HttpContext.Items["userId"]);
            return Ok(answ);
        }

        [HttpGet]
        [Authorize]
        [Route("{walletId}")]
        public async Task<IActionResult> GetWallet(string walletId)
        {
            var wallet = await WalletsService.GetWalletByNameAsync(walletId.ToLower(), (int)HttpContext.Items["userId"]);
            return Ok(wallet);
        }

        [HttpGet]
        [Authorize]
        [Route("{walletId}/activities")]
        public async Task<IActionResult> GetActivitiesByWallet([FromRoute] string walletId)
        {
            return Ok(await WalletsService.GetActivitiesByWalletAsync(walletId.ToLower(), (int)HttpContext.Items["userId"]));
        }

        [HttpPost("update-history")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateBalanceHistory()
        {
            await WalletsService.UpdateBalanceHistoryAsync();
            return Ok();
        }
        [HttpGet]
        [Authorize]
        [Route("history")]
        public async Task<IActionResult> GetBalanceHistory()
        {
            return Ok(await WalletsService.GetBalanceHistoryAsync((int)HttpContext.Items["userId"]));
        }

        [HttpGet]
        [Authorize]
        [Route("{walletId}/history")]
        public async Task<IActionResult> GetBalanceHistoryByWallet(string walletId)
        {
            return Ok(await WalletsService.GetBalanceHistoryByWalletAsync(walletId, (int)HttpContext.Items["userId"]));
        }
    }
}