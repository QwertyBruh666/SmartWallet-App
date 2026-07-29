using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities.Base;

namespace Domain.Entities 
{
    public class User : BaseEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public List<Wallet> Wallets { get; set; }
        public List<RefToken> RefTokens { get; set; }
        public List<FavCoin> FavCoins { get; set; }
        public List<OAuth> OAuths { get; set; }
        public List<Stats> WalletsStats { get; set; }
    }
}