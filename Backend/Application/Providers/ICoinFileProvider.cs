using Application.DTOs.ExchangeDTOs;

namespace Application.Providers
{
    public interface ICoinFileProvider
    {
        CoinFileDTO? GetCoinInfoFromFileById(string id);
        CoinFileDTO? GetCoinInfoFromFileBySymbol(string symbol);

    }
}