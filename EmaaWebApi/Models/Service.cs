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
    public class Service
    {
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity), Key()]
        public int ServiceId { get; set; }

        [MySqlCharset("utf8_unicode_ci")]
        [Column(TypeName = "varchar(50)")]
        public string fullName { get; set; }

        [MySqlCharset("utf8_unicode_ci")]
        [Column(TypeName = "varchar(50)")]
        public string shortName { get; set; }
        [Column(TypeName = "bigint")]
        public int Tel { get; set; }

        public int CorpsId { get; set; }
        public Corps Corps { get; set; }
    }
}
