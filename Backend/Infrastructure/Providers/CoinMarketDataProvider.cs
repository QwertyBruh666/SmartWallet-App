using Application.DTOs.ExchangeDTOs;
using Application.Providers;
using System.Net.Http.Json;
using System.Text.Json;
using Infrastructure.Options;
using Microsoft.Extensions.Options;

namespace Infrastructure.Providers;

public class CoinMarketDataProvider : ICoinMarketDataProvider
{
    private HttpClient Client;
    private CoinMarketOptions options;
    public CoinMarketDataProvider(HttpClient httpClient, IOptions<CoinMarketOptions> options)
    {
        this.options = options.Value;
        Client = httpClient;
        Client.BaseAddress = new Uri("https://api.coingecko.com/api/v3/coins/markets");
        Client.DefaultRequestHeaders.Add("x-cg-demo-api-key", this.options.ApiKey);
    }
    public async Task<CoinExchangeDTO> GetCoinInfoAsync(string id)
    {
        var response = await Client.GetAsync($"?vs_currency=usd&ids={id}&price_change_percentage=1h,24h,7d,30d,1y");
        var responseData = await response.Content.ReadFromJsonAsync<List<CoinExchangeDTO>>();
        return responseData[0];
    }
    public async Task<IEnumerable<CoinExchangeDTO>> GetCoinsAsync(int page, int perPage)
    {
        var response = await Client.GetAsync($"?vs_currency=usd&page={page}&per_page={perPage}&price_change_percentage=1h,24h,7d,30d");
        var coinsList = await response.Content.ReadFromJsonAsync<List<CoinExchangeDTO>>();
        return coinsList;
    }
}