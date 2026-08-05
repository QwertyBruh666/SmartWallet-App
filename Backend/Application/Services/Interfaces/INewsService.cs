using Application.DTOs.NewsDTOs;
using Application.DTOs.UserDTOs;

namespace Application.Services.Interfaces
{
    public interface INewsService
    {
        Task<IEnumerable<NewsContentDTO>> GetPortfolioNewsAsync(int userId);
        Task<IEnumerable<NewsContentDTO>> GetTrendingNews();
        Task<IEnumerable<NewsContentDTO>> GetCoinNewsAsync(string currName);
    }
}
