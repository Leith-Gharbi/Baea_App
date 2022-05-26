using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmaaWebApi.Models;
using MySql.Data.EntityFrameworkCore.Extensions;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace EmaaWebApi.Models.DBContexts
{

    public class MyDBContext : DbContext
    {
        public DbSet<Base> Bases { get; set; }
        public DbSet<Corps> Corps { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Documents> Documents { get; set; }

        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Base>(e =>
            {
                e.HasKey(p => new { p.BaseID});
                e.ForMySQLHasCollation("utf8_unicode_ci"); // defining collation at Entity level
                e.Property(p => p.fullName).ForMySQLHasCharset("utf8_unicode_ci"); // defining charset in a property
                e.Property(p => p.shortName).ForMySQLHasCharset("utf8_unicode_ci"); // defining charset in a property
                e.Property(p => p.shortName).ForMySQLHasCollation("utf8_unicode_ci"); // defining collation in a property
            });
        }



    }


}
