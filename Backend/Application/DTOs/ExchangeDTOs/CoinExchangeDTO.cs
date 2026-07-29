namespace Application.DTOs.ExchangeDTOs
{
    public record CoinExchangeDTO(double? Current_price, double? Market_cap, double? Price_change_percentage_24h, double? Price_change_24h, double? Price_change_percentage_7d_in_currency, double? Price_change_percentage_30d_in_currency, double? Price_change_percentage_1y_in_currency, double? Circulating_supply, int? Market_cap_rank, double? Ath, double? Atl, double? Total_volume, double? High_24h, double? Low_24h, double? Fully_diluted_valuation)
    {
        public string Id { get; init; }
        public string Symbol { get; init; }
        public string Image { get; init; }
    }
}