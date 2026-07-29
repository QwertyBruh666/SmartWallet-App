using Application.Providers;
using Application.DTOs.NewsDTOs;
using System.Net.Http.Json;
using CryptoExchange.Net.SharedApis;
using System.Runtime.CompilerServices;
using System.Text.Json;
using Infrastructure.Options;
using Microsoft.Extensions.Options;

namespace Infrastructure.Providers
{
    public class NewsProvider : INewsProvider
    {
        private HttpClient Client;
        private NewsOptions options;
        public NewsProvider(HttpClient client, IOptions<NewsOptions> options)
        {
            this.options = options.Value;
            Client = client;
            Client.BaseAddress = new Uri("https://newsapi.org/v2/everything");
            Client.DefaultRequestHeaders.Add("X-Api-Key", this.options.ApiKey);
            Client.DefaultRequestHeaders.Add("User-Agent", "SmartWallet");
        }

        private async Task<NewsResponseDTO> GetResponse(string queryString)
        {
            string query = queryString.Length == 0 ? null : "&q=" + queryString;
            var response = await Client.GetAsync($"?language=en&sortBy=popularity&domains=coindesk.com,cointelegraph.com{query}&pageSize=100");
            var responseObj = await response.Content.ReadFromJsonAsync<NewsResponseDTO>();
            return responseObj;
        }
        public async Task<IEnumerable<NewsContentDTO>> GetNewsAsync(string query, int pages, int pageSize)
        {
            var newsResp = await GetResponse(query);
            return newsResp.Articles;
        }
        public async Task<IEnumerable<NewsContentDTO>> GetNewsAsync(IEnumerable<string> queryParams, int pages, int pageSize)
        {
            string query = string.Join(" OR ", queryParams);
            var newsResp = await GetResponse(query);
            return newsResp.Articles;
        }
    }
}