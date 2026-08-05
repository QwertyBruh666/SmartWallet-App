using Application.Services.Interfaces;
using Infrastructure.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("news")]
    public class NewsController(INewsService newsService) : ControllerBase
    {
        public INewsService NewsService { get; init; } = newsService;

        [HttpGet]
        [Route("/coins/{coinId}/news")]
        public async Task<IActionResult> GetCoinNews([FromRoute] string coinId)
        {
            return Ok(await NewsService.GetCoinNewsAsync(coinId));
        }

        [HttpGet]
        [Authorize]
        [Route("portfolio")]
        public async Task<IActionResult> GetPortfolioNews()
        {
            var result = await NewsService.GetPortfolioNewsAsync((int)HttpContext.Items["userId"]);
            return Ok(result);
        }

        [HttpGet]
        [Route("trending")]
        public async Task<IActionResult> GetTrendingNews()
        {
            return Ok(await NewsService.GetTrendingNews());
        }
    }
}