namespace Application.DTOs.WalletDTOs
{
    public record WalletCoinDTO(string Symbol, decimal CoinsNumber, decimal? CoinUsdPrice = null)
    {
        public string Id { get; set; }
        public string LogoPath { get; set; } = "";
        public decimal? CoinUsdPrice { get; set; } = CoinUsdPrice;
    }
}