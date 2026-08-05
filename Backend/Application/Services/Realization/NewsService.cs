using Application.Services.Interfaces;
using Domain.Entities;
using Application.DTOs.NewsDTOs;
using Application.Providers;
using Application.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Realization
{
    public partial class NewsService(ICacheService cacheService, IAppDbContext dbContext, INewsProvider newsProvider) : INewsService
    {
        private readonly ICacheService CacheService = cacheService;
        private readonly INewsProvider NewsProvider = newsProvider;
        private readonly IAppDbContext DbContext = dbContext;

        public async Task<IEnumerable<NewsContentDTO>> GetPortfolioNewsAsync(int userId)
        {
            List<NewsContentDTO> result = [];
            List<string> keyWords = [];
            foreach (Wallet wallet in await DbContext.Wallets.Where(w => w.UserId == userId).ToListAsync())
                keyWords.Add(wallet.ExchangeName);
            foreach (FavCoin coin in await DbContext.FavCoins.Where(c => c.UserId == userId).ToListAsync())
                keyWords.AddRange([coin.CoinId, coin.Symbol]);
            if (keyWords.Count == 0)
                return [];
            result = (await NewsProvider.GetNewsAsync(keyWords, 1, 50)).ToList();
            return result;
        }

        public async Task<IEnumerable<NewsContentDTO>> GetTrendingNews()
        {
            return await CacheService.CachedInfo<IEnumerable<NewsContentDTO>>("trending", () => NewsProvider.GetNewsAsync("", 1, 50), 60);
        }

        public async Task<IEnumerable<NewsContentDTO>> GetCoinNewsAsync(string coinName)
        {
            return await CacheService.CachedInfo<IEnumerable<NewsContentDTO>>($"newsByCoin:{coinName}", () => NewsProvider.GetNewsAsync(coinName, 1, 5));
        }
    }
}