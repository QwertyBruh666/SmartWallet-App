using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Domain.Entities;

namespace Application.DataBase
{
    public interface IAppDbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<RefToken> RefTokens { get; set; }
        public DbSet<FavCoin> FavCoins { get; set; }
        public DbSet<OAuth> OAuths { get; set; }
        public DbSet<Stats> WalletsStats { get; set; }
        public DbSet<CryptoExchangeEntity> Exchanges { get; set; }
        public EntityEntry Entry(object entity);
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        
    }
}