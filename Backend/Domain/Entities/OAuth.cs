using Domain.Entities.Base;

namespace Domain.Entities
{
    public class OAuth : BaseEntity
    {
        public string ServiceName { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}