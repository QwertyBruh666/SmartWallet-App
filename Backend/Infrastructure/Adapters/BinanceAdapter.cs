using System.Text.Json;
using Application.Adapters;
using Infrastructure.Adapters.Base;
using CryptoExchange.Net.Authentication;
using Binance.Net.Objects.Models.Spot;
using Binance.Net.Clients;
using Application.DTOs.UserDTOs;
using Application.DTOs.WalletDTOs;
using Binance.Net.Objects.Models.Spot.Margin;

namespace Infrastructure.Adapters;

public class BinanceAdapter : BaseAdapter<BinanceRestClient>, IExchangeAdapter
{
    public BinanceAdapter(string apiKey, string secretKey)
    {
        ConfigureClient(() =>
        {
            return new BinanceRestClient(opt => { opt.ApiCredentials = new ApiCredentials(apiKey, secretKey); });
        });
    }
    public bool CanHandle(string exchangeName) => exchangeName.ToLower() == "binance";
    public async Task<WalletDTO> GetMyWallet()
    {
        List<BinanceUserBalance> response = (await client.SpotApi.Account.GetBalancesAsync()).Data.ToList();
        
        var formattedCoins = new List<WalletCoinDTO>();

        foreach(BinanceUserBalance coin in response) {
            formattedCoins.Add(new WalletCoinDTO(coin.Asset, (decimal)coin.Total));
        }

        return new WalletDTO(formattedCoins, "binance");
    }

    public async Task<List<WalletActivityDTO>> GetWalletActivities()
    {
        List<DepositActivityDTO> deposits = (await client.SpotApi.Account.GetDepositHistoryAsync()).Data.
            Select(d => new DepositActivityDTO() { Coin = d.Asset, Quantity = d.Quantity }).ToList();  
        List<WithdrawalActivityDTO> withdrawals = (await client.SpotApi.Account.GetWithdrawalHistoryAsync()).Data.ToList().
            Select(w => new WithdrawalActivityDTO() { Coin = w.Asset, Quantity = w.Quantity }).ToList();
        List<ConvertActivityDTO> converts = (await client.SpotApi.Trading.GetConvertTradeHistoryAsync(DateTime.UtcNow.AddDays(-14), DateTime.UtcNow)).Data.Data.
            Select(c => new ConvertActivityDTO() { FromCoin = c.QuoteAsset, ToCoin = c.BaseAsset, FromAmount = c.QuoteQuantity, ToAmount = c.BaseQuantity }).ToList();
        
        List<WalletActivityDTO> activities = [..deposits, ..withdrawals, ..converts];
        
        return activities;
    }
}