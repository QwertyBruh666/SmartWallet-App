namespace Application.DTOs.ExchangeDTOs
{ 
    public record CoinChartPointDTO(long TimeStamp, double Open, double High, double Low, double Close);
}