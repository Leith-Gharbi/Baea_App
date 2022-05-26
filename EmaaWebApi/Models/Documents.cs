using Microsoft.AspNetCore.Http;
using MySql.Data.EntityFrameworkCore.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmaaWebApi.Models
{
    public class Documents
    {
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity), Key()]
        public int DocumentId { get; set; }

        [MySqlCharset("utf8_unicode_ci")]
        [Column(TypeName = "varchar(50)")]
        public string fullName { get; set; }

        [MySqlCharset("utf8_unicode_ci")]
        [Column(TypeName = "text")]
        public string Contenu { get; set; }

        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }
        //public int BaseID { get; set; }
        //public Base Base { get; set; }
    }
}
