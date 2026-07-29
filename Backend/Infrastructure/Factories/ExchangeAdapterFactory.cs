using Application.Factories;
using Application.Adapters;
using Infrastructure.Adapters;

namespace Infrastructure.Factories;
public class ExchangeAdapterFactory : IExchangeAdapterFactory
{
    public IExchangeAdapter GetAdapter(string exchangeName, string apiKey, string secretKey, string phrase = null)
    {
        IExchangeAdapter foundAdapter = exchangeName.ToLower() switch
        {
            "binance" => new BinanceAdapter(apiKey, secretKey),
            "bybit" => new BybitAdapter(apiKey, secretKey),
            "okx" => new OKXAdapter(apiKey, secretKey, phrase),
            "kraken" => new KrakenAdapter(apiKey, secretKey)
        };

        return foundAdapter;
    }
}