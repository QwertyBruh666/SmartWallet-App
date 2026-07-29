using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Domain.Entities.Base;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using System.Runtime.InteropServices;
using Application.DataBase;

namespace Infrastructure.Database.DbConnectionInfo
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<RefToken> RefTokens { get; set; }
        public DbSet<FavCoin> FavCoins { get; set; }
        public DbSet<OAuth> OAuths { get; set; }
        public DbSet<Stats> WalletsStats { get; set; }
        public DbSet<CryptoExchangeEntity> Exchanges { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RefToken>().Property(t => t.Jti).IsRequired(required: true);
            modelBuilder.Entity<RefToken>().Property(t => t.UserId).IsRequired(required: true);

            modelBuilder.Entity<User>().Property(u => u.UserName).IsRequired(required: true).HasMaxLength(50);
            modelBuilder.Entity<User>().HasIndex(u => u.UserName).IsUnique(true);
            modelBuilder.Entity<User>().Property(u => u.Password).IsRequired(required: false);

            modelBuilder.Entity<Wallet>().Property(w => w.SecretKey).IsRequired(required: true);
            modelBuilder.Entity<Wallet>().Property(w => w.ApiKey).IsRequired(required: true);
            modelBuilder.Entity<Wallet>().Property(w => w.ExchangeName).IsRequired(required: true);
            modelBuilder.Entity<Wallet>().Property(w => w.UserId).IsRequired(required: true);

            modelBuilder.Entity<FavCoin>().Property(wl => wl.UserId).IsRequired(required: true);

            //Отношения
            modelBuilder.Entity<User>().HasMany(u => u.Wallets).WithOne(w => w.User).HasForeignKey(w => w.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>().HasMany(u => u.RefTokens).WithOne(t => t.User).HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>().HasMany(u => u.FavCoins).WithOne(wl => wl.User).HasForeignKey(wl => wl.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>().HasMany(u => u.OAuths).WithOne(a => a.User).HasForeignKey(a => a.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>().HasMany(u => u.WalletsStats).WithOne(s => s.User).HasForeignKey(s => s.UserId).OnDelete(DeleteBehavior.Cascade);
        }
        public AppDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions) { }
    }
}