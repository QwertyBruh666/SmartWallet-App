using Microsoft.AspNetCore.Mvc;
using Application.Services.Interfaces;
using Application.DTOs.ExchangeDTOs;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("coins")]
    public class StockExchangeController(ICryptoMarketService cmService) : ControllerBase
    {
        private readonly ICryptoMarketService CMService = cmService;

        [HttpGet]
        [Route("{symbol}/chart")]
        public async Task<IActionResult> GetChart([FromRoute] string symbol, [FromQuery] string timeInterval, [FromQuery] long timeStamp = 0)
        {
            var candleList = await CMService.GetCoinChartAsync(symbol, timeInterval, timeStamp);
            return Ok(candleList);
        }

        [HttpGet]
        [Route("{coinId}")]
        public async Task<IActionResult> GetCoin([FromRoute] string coinId)
        {
            CoinExchangeDTO coinInfo = await CMService.GetCoinByIdAsync(coinId);
            return Ok(coinInfo);
        }

        [HttpGet]
        public async Task<IActionResult> GetCoins([FromQuery] int page)
        {
            return Ok(await CMService.GetCoinsAsync(page, 50));
        }

        [HttpGet]
        [Route("top-gainers")]
        public async Task<IActionResult> GetTop24hCoins()
        {
            return Ok(await CMService.GetTopPriceChange24h());
        }
    }
}

