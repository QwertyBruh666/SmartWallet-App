namespace Application.DTOs.WalletDTOs
{
    public record WalletDTO(IEnumerable<WalletCoinDTO> Coins, string ExchangeName, decimal? TotalWalletBalance = null)
    {
        public decimal? TotalWalletBalance { get; set; } = TotalWalletBalance;
    }
}