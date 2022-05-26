﻿// <auto-generated />
using AuthWebApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AuthWebApi.Migrations
{
    [DbContext(typeof(UserContext))]
    [Migration("20220524224536_first")]
    partial class first
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("AuthWebApi.Models.User", b =>
                {
                    b.Property<string>("CIN")
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Code_Grade")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Matricule")
                        .HasColumnType("text");

                    b.Property<string>("Nom")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("Prenom")
                        .HasColumnType("text");

                    b.Property<string>("Tel")
                        .HasColumnType("text");

                    b.Property<string>("Unite")
                        .HasColumnType("text");

                    b.HasKey("CIN");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
