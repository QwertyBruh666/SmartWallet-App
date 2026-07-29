using Domain.Entities.Base;
using System;

namespace Domain.Entities
{
    public class Stats : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public string ExchangeName { get; set; }
        public double WalletUsdValue { get; set; }
        public long TimeStamp { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }
}