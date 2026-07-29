namespace Application.DTOs.NewsDTOs
{
    public record NewsContentDTO(string Author, string PublishedAt, string Url, string UrlToImage, string Title, string Content);
    public record NewsResponseDTO(string Status, int TotalResults, IEnumerable<NewsContentDTO> Articles);
}