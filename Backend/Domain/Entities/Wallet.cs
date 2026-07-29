using System.ComponentModel.DataAnnotations;
using System.Dynamic;
using Domain.Entities.Base;
using Domain.Entities;

namespace Domain.Entities 
{
    public class Wallet : BaseEntity
    {
        public string ExchangeName { get; set; }
        public string ApiKey { get; set; }
        public string SecretKey { get; set; }
        public string? PassPhrase { get; set; } = null;
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
