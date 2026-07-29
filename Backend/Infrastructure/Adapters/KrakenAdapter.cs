using Application.Adapters;
using Infrastructure.Adapters.Base;
using CryptoExchange.Net.Authentication;
using Kraken.Net.Clients;
using Application.DTOs.UserDTOs;
using Application.DTOs.WalletDTOs;

namespace Infrastructure.Adapters;
public class KrakenAdapter : BaseAdapter<KrakenRestClient>, IExchangeAdapter
{
    public KrakenAdapter(string apiKey, string secretKey)
    {
        ConfigureClient(() =>
        {
            return new KrakenRestClient(opt => { opt.ApiCredentials = new ApiCredentials(apiKey, secretKey); });
        });
    }
    public bool CanHandle(string exchangeName) => exchangeName.ToLower() == "kraken";
    public async Task<WalletDTO> GetMyWallet()
    {
        var response = (await client.SpotApi.Account.GetBalancesAsync()).Data;

        var formattedCoins = new List<WalletCoinDTO>();
        foreach(KeyValuePair<string, decimal> coin in response) {
            formattedCoins.Add(new WalletCoinDTO(coin.Key, coin.Value));
        }

        return new WalletDTO(new List<WalletCoinDTO>(), "kraken", 78);
    }
    
    public async Task<List<WalletActivityDTO>> GetWalletActivities()
    {
        List<TradeActivityDTO> trades = (await client.SpotApi.Trading.GetUserTradesAsync()).Data.Trades.Values.
            Select( t => new TradeActivityDTO() { OrderSide = t.Side.ToString(), Price = t.Price, Quantity = t.Quantity, Symbol = t.Symbol, Time = t.Timestamp }).ToList();
        List<DepositActivityDTO> deposits = (await client.SpotApi.Account.GetDepositHistoryAsync()).Data.Items.
            Select(d => new DepositActivityDTO() { Coin = d.Asset, Quantity = d.Quantity }).ToList();  
        List<WithdrawalActivityDTO> withdrawals = (await client.SpotApi.Account.GetWithdrawalHistoryAsync()).Data.Items.
            Select(w => new WithdrawalActivityDTO() { Coin = w.Asset, Quantity = w.Quantity }).ToList();

        List<WalletActivityDTO> activities = [..trades, ..deposits, ..withdrawals];
        
        return activities;
    }
}