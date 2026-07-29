using Application.DTOs.ExchangeDTOs;

namespace Application.Providers
{
    public interface ICoinChartProvider
    {
        Task<List<CoinChartPointDTO>> GetCoinChartInfoAsync(string symbol, string timeInterval, long startTimeStamp);
    }
}
