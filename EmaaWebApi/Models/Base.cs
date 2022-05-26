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
    [MySqlCharset("utf8_unicode_ci")]

    public class Base
    {
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity), Key()]
        public int BaseID { get; set; }

        [MySqlCharset("utf8_unicode_ci")]
        [Column(TypeName="varchar(50)")]
        public string fullName { get; set; }

        [MySqlCharset("utf8_unicode_ci")]
        [Column(TypeName = "varchar(50)")]
        public string shortName { get; set; }

        [MySqlCharset("utf8_unicode_ci")]
        [Column(TypeName = "varchar(50)")]
        public string ImageName { get; set; } 

        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }


    }
}
