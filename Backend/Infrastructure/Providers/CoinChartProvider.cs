using Application.Providers;
using System.Threading.Tasks;
using System.Net.Http.Json;
using Application.DTOs.ExchangeDTOs;

namespace Infrastructure.Providers;

public class CoinChartProvider : ICoinChartProvider
{
    private HttpClient Client;
    public CoinChartProvider(HttpClient httpClient)
    {
        Client = httpClient;
        Client.BaseAddress = new Uri("https://api.bybit.com/v5/");
    }

    private async Task<T> GetResponseAsync<T>(string queryString)
    {
        var response = await Client.GetAsync(queryString);
        var responseData = await response.Content.ReadFromJsonAsync<T>();
        return responseData;
    }
    public async Task<List<CoinChartPointDTO>> GetCoinChartInfoAsync(string symbol, string timeInterval, long startTimeStamp)
    {
        long endTimeStamp = DateTimeOffset.Now.ToUnixTimeMilliseconds();
        if (startTimeStamp != 0) {
            endTimeStamp = startTimeStamp;
        }
        var responseData = (await GetResponseAsync<ChartRespDTO>($"market/kline?end={endTimeStamp}&symbol={symbol.ToUpper() + "USDT"}&category=spot&interval={timeInterval}")).Result.List;
        List<CoinChartPointDTO> chartData = responseData.Select(data => new CoinChartPointDTO(long.Parse(data[0]), double.Parse(data[1]), double.Parse(data[2]), double.Parse(data[3]), double.Parse(data[4]))).ToList();
        return chartData;
    }
}