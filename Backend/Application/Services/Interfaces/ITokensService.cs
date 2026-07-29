using Domain.Entities;

namespace Application.Services.Interfaces
{
    public interface ITokensService
    {
        Task CreateNewJwtTokensByRefreshTokenAsync();
        Task CreateJwtTokensForNewUserAsync(int userId);
        Task CreateJwtTokensForEnteredUserAsync(int userId);
        Task<List<RefToken>> GetAllValidRefTokensByUserId(int userId);
    }
}