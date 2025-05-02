using System.ComponentModel.DataAnnotations;

namespace ContactApi.Models
{
    public class Contact
    {
        public int ID { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Phone { get; set; }

        public bool IsFavorite { get; set; }
    }
}
