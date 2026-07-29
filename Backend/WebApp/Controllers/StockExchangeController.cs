using Microsoft.AspNetCore.Mvc;
using Application.Services.Interfaces;
using Application.DTOs.ExchangeDTOs;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class StockExchangeController(ICryptoMarketService cmService) : ControllerBase
    {
        private readonly ICryptoMarketService CMService = cmService;

        [HttpGet]
        [Route("{symbol}")]
        public async Task<IActionResult> GetChart(string symbol, [FromQuery] string timeInterval, [FromQuery] long timeStamp = 0)
        {
            var candleList = await CMService.GetCoinChartAsync(symbol, timeInterval, timeStamp);
            return Ok(candleList);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCoin([FromRoute] string id)
        {
            CoinExchangeDTO coinInfo = await CMService.GetCoinByIdAsync(id);
            return Ok(coinInfo);
        }

        [HttpGet]
        public async Task<IActionResult> GetCoins([FromQuery] int page)
        {
            return Ok(await CMService.GetCoinsAsync(page, 50));
        }

        [HttpGet]
        public async Task<IActionResult> GetTop24hCoins()
        {
            return Ok(await CMService.GetTopPriceChange24h());
        }
    }
}

