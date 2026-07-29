using Application.Services.Interfaces;
using Infrastructure.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class NewsController(INewsService newsService) : ControllerBase
    {
        public INewsService NewsService { get; init; } = newsService;

        [HttpGet]
        [Route("{coinName}")]
        public async Task<IActionResult> GetCoinNews([FromRoute] string coinName)
        {
            var res = await NewsService.GetNewsByCoinAsync(coinName);
            return Ok(res);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetNewsByUser()
        {
            var result = await NewsService.GetNewsByUserAsync((int)HttpContext.Items["userId"]);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetTrendingNews()
        {
            return Ok(await NewsService.GetTrendingNews());
        }
    }
}