using Application.DTOs.NewsDTOs;

namespace Application.Providers
{
    public interface INewsProvider
    {
        Task<IEnumerable<NewsContentDTO>> GetNewsAsync(string parameter, int pages, int pageSize);
        Task<IEnumerable<NewsContentDTO>> GetNewsAsync(IEnumerable<string> parameters, int pages, int pageSize);
    }
}