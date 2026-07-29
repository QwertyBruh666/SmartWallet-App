using Application.DTOs.ExchangeDTOs;
using Application.DTOs.UserDTOs;

namespace Application.Services.Interfaces
{
    public interface ICryptoMarketService
    {
        Task<List<CoinChartPointDTO>> GetCoinChartAsync(string symbol, string timeInterval, long timeStamp);
        Task<CoinExchangeDTO> GetCoinByIdAsync(string id);
        Task<CoinExchangeDTO> GetCoinBySymbolAsync(string symbol);
        Task<IEnumerable<CoinExchangeDTO>> GetCoinsAsync(int page, int perPage);
        Task<IEnumerable<CoinExchangeDTO>> GetTopPriceChange24h();
        CoinFileDTO GetCoinBase(string symbol);
    }
}