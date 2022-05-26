using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AuthWebApi.Models
{
    public class User
    {
        [Key]
        [Column(TypeName = "varchar(50)")]

        public string CIN { get; set; }
        public string Matricule { get; set; }
        public string Code_Grade { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }
        public string Unite { get; set; }
        [Column(TypeName = "varchar(100)")]

        public string Email { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string Tel { get; set; }
    }
}
