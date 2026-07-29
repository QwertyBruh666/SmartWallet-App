namespace Application.DTOs.WalletDTOs
{
    public class ConvertActivityDTO : WalletActivityDTO
    {
        public string FromCoin { get; init; }
        public string ToCoin { get; init; }
        public decimal FromAmount { get; init; }
        public decimal ToAmount { get; init; }
    }
}