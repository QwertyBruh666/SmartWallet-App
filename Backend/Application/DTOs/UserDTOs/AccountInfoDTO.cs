using Domain.Entities;

namespace Application.DTOs.UserDTOs
{
    public record AccountInfoDTO(string UserName, List<Wallet> Wallets);
}