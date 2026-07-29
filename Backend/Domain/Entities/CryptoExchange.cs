using Domain.Entities.Base;

namespace Domain.Entities
{
    public class CryptoExchangeEntity : BaseEntity
    {
        public string ExchangeName { get; set; }
    }
}