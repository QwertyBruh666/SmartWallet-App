using Domain.Entities;
using Application.DTOs.UserDTOs;
using Application.DTOs.WalletDTOs;
using Application.DTOs.ExchangeDTOs;

namespace Application.Services.Interfaces {
    public interface IUsersService
    {
        Task ChangeUserPasswordAsync(int userId, ChangePasswordDTO newPassword);
        Task<AccountInfoDTO> GetAccountInfoAsync(int userId);
        Task SetFavCoinAsync(int userId, string coinId, string symbol);
        Task RemoveFavCoinAsync(string coinId);
        Task<List<CoinExchangeDTO>> GetFavCoinsAsync(int userId);
    }
}