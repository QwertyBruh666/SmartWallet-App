using Application.Adapters;
using Infrastructure.Adapters.Base;
using CryptoExchange.Net.Authentication;
using Bybit.Net.Objects.Models.V5;
using Bybit.Net.Clients;
using Application.DTOs.UserDTOs;
using Application.DTOs.WalletDTOs;
using System.Text.Json;
using Bybit.Net.Enums;

namespace Infrastructure.Adapters;

public class BybitAdapter : BaseAdapter<BybitRestClient>, IExchangeAdapter
{
    public BybitAdapter(string apiKey, string secretKey)
    {
        ConfigureClient(() =>
        {
            return new BybitRestClient(opt => { opt.ApiCredentials = new ApiCredentials(apiKey, secretKey); });
        });
    }
    public bool CanHandle(string exchangeName) => exchangeName.ToLower() == "bybit";
    public async Task<WalletDTO> GetMyWallet()
    {
        BybitBalance response = (await client.V5Api.Account.GetBalancesAsync(Bybit.Net.Enums.AccountType.Unified)).Data.List.ToList().FirstOrDefault();

        var formattedCoins = new List<WalletCoinDTO>();

        foreach (BybitAssetBalance coin in response.Assets)
        {
            formattedCoins.Add(new WalletCoinDTO(coin.Asset, (decimal)coin.WalletBalance, coin.UsdValue));
        }

        return new WalletDTO(formattedCoins, "bybit", response.TotalEquity);
    }

    public async Task<List<WalletActivityDTO>> GetWalletActivities()
    {
        List<TradeActivityDTO> trades = (await client.V5Api.Trading.GetUserTradesAsync(Category.Spot)).Data.List.ToList().
            Select( t => new TradeActivityDTO() { OrderSide = t.Side.ToString(), Price = t.Price, Quantity = t.Quantity, Symbol = t.Symbol, Time = t.Timestamp }).ToList();
        List<DepositActivityDTO> deposits = (await client.V5Api.Account.GetDepositsAsync()).Data.Deposits.
            Select(d => new DepositActivityDTO() { Coin = d.Asset, Quantity = d.Quantity, Time = d.SuccessTime ?? new DateTime() }).ToList();  
        List<WithdrawalActivityDTO> withdrawals = (await client.V5Api.Account.GetWithdrawalsAsync()).Data.List.ToList().
            Select(w => new WithdrawalActivityDTO() { Coin = w.Asset, Quantity = w.Quantity, Time = w.CreateTime }).ToList();
        List<ConvertActivityDTO> converts = (await client.V5Api.Account.GetConvertHistoryAsync()).Data.ToList().
            Select(c => new ConvertActivityDTO() { FromCoin = c.FromAsset, ToCoin = c.ToAsset, FromAmount = c.FromQuantity, ToAmount = c.ToQuantity, Time = c.CreateTime }).ToList();

        List<WalletActivityDTO> activities = [..trades, ..deposits, ..withdrawals, ..converts];
        
        return activities;
    }
}