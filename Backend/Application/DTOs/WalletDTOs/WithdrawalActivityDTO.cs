namespace Application.DTOs.WalletDTOs
{
    public class WithdrawalActivityDTO : WalletActivityDTO
    {
        public decimal Quantity { get; init; }
        public string Coin { get; init; }
    }
}