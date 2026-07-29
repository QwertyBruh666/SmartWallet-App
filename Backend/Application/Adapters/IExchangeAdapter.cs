using Application.DTOs.WalletDTOs;

namespace Application.Adapters
{
    public interface IExchangeAdapter
    {
        bool CanHandle(string exchangeName);
        Task<WalletDTO> GetMyWallet();
        Task<List<WalletActivityDTO>> GetWalletActivities();
    }
}