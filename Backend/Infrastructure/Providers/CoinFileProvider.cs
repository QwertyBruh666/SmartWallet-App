using Application.DTOs.ExchangeDTOs;
using System.Text.Json;
using System.IO;
using System.Collections.Generic;
using Application.Providers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Net.Http.Json;

namespace Infrastructure.Providers
{
    public class CoinFileProvider : ICoinFileProvider
    {
        private List<CoinFileDTO> CoinsInfoList;
        public CoinFileProvider()
        {
            string fileInfo = File.ReadAllText("/app/Infrastructure/Sources/CryptoCurrenciesMetadata.json");
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            CoinsInfoList = JsonSerializer.Deserialize<List<CoinFileDTO>>(fileInfo, options);
        }
        public CoinFileDTO? GetCoinInfoFromFileById(string id)
        {
            var coin = CoinsInfoList.FirstOrDefault(c => c.Id == id.ToLower());
            return coin;
        }
        public CoinFileDTO? GetCoinInfoFromFileBySymbol(string symbol)
        {
            var coin = CoinsInfoList.FirstOrDefault(c => c.Symbol == symbol.ToLower());
            return coin;
        }
    }
}