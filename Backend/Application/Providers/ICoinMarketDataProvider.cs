using Application.DTOs.ExchangeDTOs;

namespace Application.Providers;

public interface ICoinMarketDataProvider
{
    Task<CoinExchangeDTO> GetCoinInfoAsync(string id);
    Task<IEnumerable<CoinExchangeDTO>> GetCoinsAsync(int page, int perPage);
}