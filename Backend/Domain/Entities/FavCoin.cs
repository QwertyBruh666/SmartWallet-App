using Domain.Entities.Base;

namespace Domain.Entities
{
    public class FavCoin : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public string Symbol { get; set; }
        public string CoinId { get; set; }
    }
}

