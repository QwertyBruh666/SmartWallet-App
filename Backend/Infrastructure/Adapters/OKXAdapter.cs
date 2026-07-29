using System.Text.Json;
using Application.Adapters;
using Infrastructure.Adapters.Base;
using CryptoExchange.Net.Authentication;
using OKX.Net.Clients;
using OKX.Net.Objects.Account;
using Application.DTOs.UserDTOs;
using Application.DTOs.WalletDTOs;
using OKX.Net.Objects.Funding;
using OKX.Net.Objects.Market;
using OKX.Net.Objects.Trade;

namespace Infrastructure.Adapters;
public class OKXAdapter : BaseAdapter<OKXRestClient>, IExchangeAdapter
{
    public OKXAdapter(string apiKey, string secretKey, string passPhrase)
    {
        ConfigureClient(() =>
        {
            return new OKXRestClient(opt => { opt.ApiCredentials = new ApiCredentials(apiKey, secretKey, passPhrase); });
        });
    }
    public bool CanHandle(string exchangeName) => exchangeName.ToLower() == "okx";
    public async Task<WalletDTO> GetMyWallet()
    {
        OKXAccountBalance response = (await client.UnifiedApi.Account.GetAccountBalanceAsync()).Data;

        var formattedCoins = new List<WalletCoinDTO>();
        foreach(OKXAccountBalanceDetail coin in response.Details) 
        {
            formattedCoins.Add(new WalletCoinDTO(coin.Asset, (decimal)coin.Equity, coin.UsdEquity));
        }

        return new WalletDTO(formattedCoins, "okx", response.TotalEquity);
    }
    
    public async Task< List<WalletActivityDTO>> GetWalletActivities()
    {
        List<TradeActivityDTO> trades = (await client.UnifiedApi.Trading.GetUserTradesAsync()).Data.ToList().
            Select( t => new TradeActivityDTO() { OrderSide = t.OrderSide.ToString(), Price = t.FillPrice ?? 0, Quantity = t.QuantityFilled ?? 0, Symbol = t.Symbol, Time = t.Time }).ToList();
        List<DepositActivityDTO> deposits = (await client.UnifiedApi.Account.GetDepositHistoryAsync()).Data.
            Select(d => new DepositActivityDTO() { Coin = d.Asset, Quantity = d.Quantity }).ToList();  
        List<WithdrawalActivityDTO> withdrawals = (await client.UnifiedApi.Account.GetWithdrawalHistoryAsync()).Data.ToList().
            Select(w => new WithdrawalActivityDTO() { Coin = w.Asset, Quantity = w.Quantity }).ToList();
        List<ConvertActivityDTO> converts = (await client.UnifiedApi.Account.GetEasyConvertDustHistoryAsync()).Data.ToList().
            Select(c => new ConvertActivityDTO() { FromCoin = c.FromAsset, ToCoin = c.ToAsset, FromAmount = c.FillFromQuantity, ToAmount = c.FillToQuantity }).ToList();

        List<WalletActivityDTO> activities = [..trades, ..deposits, ..withdrawals, ..converts];
        
        return activities;
    }
}