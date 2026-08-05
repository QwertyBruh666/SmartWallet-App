using Application.DTOs.WalletDTOs;

namespace Application.Services.Interfaces
{
    public interface IWalletsService
    {
        Task AddWalletAsync(int userId, WalletCredentialsDTO apiInfo);
        Task RemoveWalletAsync(int userId, string apiInfoType);
        Task UpdateBalanceHistoryAsync();
        Task<List<BalanceHistoryPointDTO>> GetBalanceHistoryAsync(int userId);
        Task<List<BalanceHistoryPointDTO>> GetBalanceHistoryByWalletAsync(string exchangeName, int userId);
        Task<IEnumerable<WalletDTO>> GetWalletsAsync(int userId);
        Task<WalletDTO> GetWalletByNameAsync(string exchangeName, int userId);
        Task<List<WalletActivityDTO>> GetActivitiesByWalletAsync(string exchangeName, int userId);
        Task<string> GetActivitiesAsync();
    }
}