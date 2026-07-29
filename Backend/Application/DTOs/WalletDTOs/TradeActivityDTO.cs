namespace Application.DTOs.WalletDTOs
{
    public class TradeActivityDTO : WalletActivityDTO
    {
        public string OrderSide { get; init; }
        public string Symbol { get; init; }
        public decimal Quantity { get; init; }
        public decimal Price { get; init; }
    }
}