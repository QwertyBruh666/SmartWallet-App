namespace Application.DTOs.ExchangeDTOs
{
    public record ChartDTO(string Category, string Symbol, List<List<string>> List);
    public record ChartRespDTO(int RetCode, string RetMsg, ChartDTO Result);
} 