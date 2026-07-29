using Application.Adapters;

namespace Application.Factories;
public interface IExchangeAdapterFactory
{
    IExchangeAdapter GetAdapter(string exchangeName, string apiKey, string secretKey, string phrase = null);
}