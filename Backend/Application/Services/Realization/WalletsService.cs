using Application.DataBase;
using Application.DTOs.ExchangeDTOs;
using Application.DTOs.WalletDTOs;
using Application.Factories;
using Application.Services.Interfaces;
using Domain.CustomExceptions;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Realization
{
    public class WalletsService(IAppDbContext dbContext, IExchangeAdapterFactory exchangeAdapterFactory, ICryptoMarketService cryptoMarketService, IEncryptionService encryptionService) : IWalletsService
    {
        private IAppDbContext AppDb { get; init; } = dbContext;
        private IExchangeAdapterFactory ExchangeAdapterFactory { get; init; } = exchangeAdapterFactory;
        private ICryptoMarketService CryptoMarketService { get; init; } = cryptoMarketService;
        private IEncryptionService EncryptionService { get; init; } = encryptionService;

        public async Task AddWalletAsync(int userId, WalletCredentialsDTO apiInfo)
        {
            try
            {
                Wallet newWallet = new Wallet()
                {
                    ExchangeName = apiInfo.ExchangeName,
                    ApiKey = apiInfo.ApiKey,
                    SecretKey = EncryptionService.Encrypt(apiInfo.SecretKey),
                    UserId = userId,
                    PassPhrase = EncryptionService.Encrypt(apiInfo.PassPhrase)
                };
                await AppDb.Wallets.AddAsync(newWallet);
                await AppDb.SaveChangesAsync();
            }
            catch (Exception _)
            {
                throw new ExchangeException(400, "EXCHANGE.NOT_SUPPOORTED", $"Биржа {apiInfo.ExchangeName} не поддерживается!");
            }
        }

        public async Task RemoveWalletAsync(int userId, string exchangeName)
        {
            var wallet = await AppDb.Wallets.FirstAsync(w => w.UserId == userId && w.ExchangeName == exchangeName);
            AppDb.Wallets.Remove(wallet);
            await AppDb.SaveChangesAsync();
        }

        public async Task<List<BalanceHistoryPointDTO>> GetAllWalletBalanceStatsAsync(int userId)
        {
            var stats = await AppDb.WalletsStats.Where(s => s.UserId == userId).ToListAsync();
            List<BalanceHistoryPointDTO> sums = [];
            for (int i = 0; i < stats.Count; i++)
            {
                var stat = stats[i];
                Stats nextStat = stats[i];
                double sum = 0;
                while (stat.TimeStamp == nextStat.TimeStamp || stat.TimeStamp + 10 >= nextStat.TimeStamp)
                {
                    sum += nextStat.WalletUsdValue;
                    i += 1;
                    if (i >= stats.Count)
                    {
                        break;
                    }
                    nextStat = stats[i];
                }
                i -= 1;
                sums.Add(new BalanceHistoryPointDTO(stat.TimeStamp, sum));
            }
            return sums;
        }

        public async Task<IEnumerable<WalletDTO>> GetAllWalletsAsync(int userId)
        {
            List<Wallet> wallets = await AppDb.Wallets.Where(w => w.UserId == userId).ToListAsync();
            var formattedWallets = new List<WalletDTO>();
            foreach (Wallet wallet in wallets)
            {
                formattedWallets.Add(await GetWalletByNameAsync(wallet.ExchangeName, userId));
            }
            return formattedWallets;
        }

        public async Task<List<BalanceHistoryPointDTO>> GetWalletBalanceStatsAsync(string exchangeName, int userId)
        {
            return await AppDb.WalletsStats.Where(s => s.UserId == userId && s.ExchangeName == exchangeName).Select(s => new BalanceHistoryPointDTO(s.TimeStamp, s.WalletUsdValue)).ToListAsync();
        }

        public async Task<WalletDTO> GetWalletByNameAsync(string exchangeName, int userId)
        {
            Wallet walletCredentials = await AppDb.Wallets.FirstAsync(w => w.UserId == userId && w.ExchangeName == exchangeName);
            var adapter = ExchangeAdapterFactory.GetAdapter(exchangeName, walletCredentials.ApiKey, EncryptionService.Decrypt(walletCredentials.SecretKey), EncryptionService.Decrypt(walletCredentials.PassPhrase));
            var wallet = await adapter.GetMyWallet();
            foreach (var walletCoin in wallet.Coins)
            {
                CoinExchangeDTO coin = await CryptoMarketService.GetCoinBySymbolAsync(walletCoin.Symbol);
                walletCoin.LogoPath = coin.Image;
                walletCoin.Id = coin.Id;
            }
            return wallet;
        }

        public async Task UpdateWalletsStatsAsync()
        {
            var users = await AppDb.Users.ToListAsync();
            foreach (User user in users)
            {
                var userWallets = (await GetAllWalletsAsync(user.Id)).ToList();
                List<Stats> result = [];
                foreach (var userWallet in userWallets)
                {
                    result.Add(new Stats() { ExchangeName = userWallet.ExchangeName, UserId = user.Id, WalletUsdValue = (double)userWallet.TotalWalletBalance });
                }
                await AppDb.WalletsStats.AddRangeAsync(result);
                await AppDb.SaveChangesAsync();
            }
        }

        public async Task<List<WalletActivityDTO>> GetWalletActivitiesAsync(string exchangeName, int userId)
        {
            Wallet walletCredentials = await AppDb.Wallets.FirstAsync(w => w.UserId == userId && w.ExchangeName == exchangeName);
            var adapter = ExchangeAdapterFactory.GetAdapter(exchangeName, walletCredentials.ApiKey, EncryptionService.Decrypt(walletCredentials.SecretKey), EncryptionService.Decrypt(walletCredentials.PassPhrase));

            return await adapter.GetWalletActivities();
        }
        
        public async Task<string> GetAllWalletsActivitiesAsync()
        {
            return "";
        }
    }
}