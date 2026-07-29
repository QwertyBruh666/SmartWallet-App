using Application.DTOs.WalletDTOs;

namespace Application.Services.Interfaces
{
    public interface IWalletsService
    {
        Task AddWalletAsync(int userId, WalletCredentialsDTO apiInfo);
        Task RemoveWalletAsync(int userId, string apiInfoType);
        Task UpdateWalletsStatsAsync();
        Task<List<BalanceHistoryPointDTO>> GetAllWalletBalanceStatsAsync(int userId);
        Task<List<BalanceHistoryPointDTO>> GetWalletBalanceStatsAsync(string exchangeName, int userId);
        Task<IEnumerable<WalletDTO>> GetAllWalletsAsync(int userId);
        Task<WalletDTO> GetWalletByNameAsync(string exchangeName, int userId);
        Task<List<WalletActivityDTO>> GetWalletActivitiesAsync(string exchangeName, int userId);
        Task<string> GetAllWalletsActivitiesAsync();
    }
}