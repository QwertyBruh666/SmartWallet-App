using Application.Services.Interfaces;
using Application.Providers;
using Application.Factories;
using Application.DTOs.ExchangeDTOs;
using Domain.CustomExceptions;

namespace Application.Services.Realization
{
    public class CryptoMarketService(ICacheService cacheService, ICoinFileProvider coinInfoProvider, IExchangeAdapterFactory adapterFactory, ICoinChartProvider coinChartProvider, ICoinMarketDataProvider coinMarketDataProvider) : ICryptoMarketService
    {
        private ICacheService CacheService = cacheService;
        private ICoinFileProvider CoinInfoProvider = coinInfoProvider;
        private ICoinChartProvider CoinChartProvider = coinChartProvider;
        private ICoinMarketDataProvider CoinMarketDataProvider = coinMarketDataProvider;

        private bool HasNullProp(CoinExchangeDTO coin)
        {
            return coin.GetType().GetProperties().Any(p => p.GetValue(coin) == null);
        }
        public async Task<CoinExchangeDTO> GetCoinByIdAsync(string id)
        {
            return await CacheService.CachedInfo<CoinExchangeDTO>($"coinInfo:{id}",
            async () =>
            {
                CoinExchangeDTO coin = await CoinMarketDataProvider.GetCoinInfoAsync(id);
                if (HasNullProp(coin))
                    throw new Exception("Incomplit data");
                return coin;
            }, 5);
        }

        public async Task<CoinExchangeDTO> GetCoinBySymbolAsync(string symbol)
        {
            var coinShortInfo = CoinInfoProvider.GetCoinInfoFromFileBySymbol(symbol) ?? throw new CoinException(404, "COIN.NOT_FOUND", $"Монета {symbol} не найдена");
            return await CoinMarketDataProvider.GetCoinInfoAsync(coinShortInfo.Id);
        }

        public async Task<List<CoinChartPointDTO>> GetCoinChartAsync(string symbol, string timeInterval, long timeStamp)
        {
            return await CoinChartProvider.GetCoinChartInfoAsync(symbol, timeInterval, timeStamp);
        }

        public async Task<IEnumerable<CoinExchangeDTO>> GetCoinsAsync(int page, int perPage)
        {
            return await CacheService.CachedInfo<IEnumerable<CoinExchangeDTO>>($"findCoins:{page}",
            async () => {
                var response = await CoinMarketDataProvider.GetCoinsAsync(page, perPage);
                return response.Where(c => c.Price_change_percentage_24h != null);
            }, 5);
        }

        public async Task<IEnumerable<CoinExchangeDTO>> GetTopPriceChange24h()
        {
            return await CacheService.CachedInfo<IEnumerable<CoinExchangeDTO>>("topBy24hPercetage",
            async () =>
            { 
                var coins = await CoinMarketDataProvider.GetCoinsAsync(1, 250);
                return coins.OrderByDescending(c => c.Price_change_percentage_24h).Take(3).ToList(); 
            }, 60);
        }

        public CoinFileDTO GetCoinBase(string symbol)
        {
            return CoinInfoProvider.GetCoinInfoFromFileBySymbol(symbol);
        }
    }
}