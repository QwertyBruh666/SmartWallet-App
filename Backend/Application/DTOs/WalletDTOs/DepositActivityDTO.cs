namespace Application.DTOs.WalletDTOs
{
    public class DepositActivityDTO : WalletActivityDTO
    {
        public decimal Quantity { get; init; }
        public string Coin { get; init; }
    }
}