using Application.Services.Interfaces;
using Domain.CustomExceptions;
using Domain.Entities;
using Application.DTOs.UserDTOs;
using Application.DTOs.WalletDTOs;
using Application.DataBase;
using Microsoft.EntityFrameworkCore;
using Application.DTOs.ExchangeDTOs;

namespace Application.Services.Realization
{
    public class UsersService(IAppDbContext dbContext, ICacheService cacheService, ICryptoMarketService cryptoMarketService) : IUsersService
    {
        private ICacheService CacheService = cacheService;
        private IAppDbContext DbContext = dbContext;
        private ICryptoMarketService CryptoMarketService = cryptoMarketService;

        public async Task ChangeUserPasswordAsync(int userId, ChangePasswordDTO newPassword)
        {
            if (newPassword.NewPassword == null)
                throw new UserException(400, "USER.EMPTY_PASSWORD", "Пустой пароль");
            try
            {
                await DbContext.Users.Where(u => u.Id == userId).ExecuteUpdateAsync(f => f.SetProperty(u => u.Password, newPassword.NewPassword));
            }
            catch (Exception _)
            {
                throw new UserException(401, "USER.NOT_FOUND", "Пользователя не существует");
            }
        }
        public async Task<AccountInfoDTO> GetAccountInfoAsync(int userId)
        {
            User user = await DbContext.Users.FirstOrDefaultAsync(u => u.Id == userId) ?? throw new UserException(401, "USER.NOT_FOUND", "Пользователя не существует");
            var res = await DbContext.Wallets.Where(w => w.UserId == userId).AsNoTracking().ToListAsync();
            return new AccountInfoDTO(user.UserName, res);
        }
        public async Task SetFavCoinAsync(int userId, string coinId, string symbol)
        {
            await DbContext.FavCoins.AddAsync(new FavCoin() { UserId = userId, CoinId = coinId, Symbol = symbol });
            await DbContext.SaveChangesAsync();
        }
        public async Task RemoveFavCoinAsync(string coinId)
        {
            DbContext.FavCoins.Remove(await DbContext.FavCoins.FirstAsync(fc => fc.CoinId == coinId));
            await DbContext.SaveChangesAsync();
        }
        public async Task<List<CoinExchangeDTO>> GetFavCoinsAsync(int userId)
        {
            List<FavCoin> coins = await DbContext.FavCoins.Where(fc => fc.UserId == userId).ToListAsync();
            List<CoinExchangeDTO> coinsInfo = new List<CoinExchangeDTO>();
            foreach (var coin in coins)
            {
                CoinExchangeDTO coinExchangeInfo = await CryptoMarketService.GetCoinByIdAsync(coin.CoinId);
                coinsInfo.Add(coinExchangeInfo);
            }
            return coinsInfo;
        }
    }
}