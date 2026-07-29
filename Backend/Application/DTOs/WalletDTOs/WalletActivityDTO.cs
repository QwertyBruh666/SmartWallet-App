using System.Text.Json.Serialization;

namespace Application.DTOs.WalletDTOs
{
    [JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
    [JsonDerivedType(typeof(ConvertActivityDTO), "convert")]
    [JsonDerivedType(typeof(TradeActivityDTO), "trade")]
    [JsonDerivedType(typeof(DepositActivityDTO), "deposit")]
    [JsonDerivedType(typeof(WithdrawalActivityDTO), "withdrawal")]
    public abstract class WalletActivityDTO
    {
        public DateTime Time { get; init; }
        public string WalletName { get; init; }
    }
}
