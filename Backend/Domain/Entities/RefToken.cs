using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities.Base;

namespace Domain.Entities
{
    public class RefToken : BaseEntity
    {
        public string Jti { get; set; }
        public int UserId { get; set; }
        public int? UsedAt { get; set; } = null;
        public User User { get; set; }
    }
}