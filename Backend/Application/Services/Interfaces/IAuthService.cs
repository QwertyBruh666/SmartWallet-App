using Application.DTOs.UserDTOs;

namespace Application.Services.Interfaces
{
    public interface IAuthService
    {
        Task<int> AddAccountAsync(LoginInfoDTO lInfo);
        Task<int> GoogleAuth(string code);
        Task<int> PasswordAuth(LoginInfoDTO user);
        Task LogOut(int userId);
    }
}