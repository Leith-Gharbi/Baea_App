// <auto-generated />
using EmaaWebApi.Models.DBContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EmaaWebApi.Migrations
{
    [DbContext(typeof(MyDBContext))]
    partial class MyDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.10");

            modelBuilder.Entity("EmaaWebApi.Models.Base", b =>
                {
                    b.Property<int>("BaseID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ImageName")
                        .HasColumnType("varchar(50)");

                    b.Property<string>("fullName")
                        .HasColumnType("varchar(50)")
                        .HasAnnotation("MySQL:Charset", "utf8_unicode_ci");

                    b.Property<string>("shortName")
                        .HasColumnType("varchar(50)")
                        .HasAnnotation("MySQL:Charset", "utf8_unicode_ci")
                        .HasAnnotation("MySQL:Collation", "utf8_unicode_ci");

                    b.HasKey("BaseID");

                    b.ToTable("Bases");

                    b
                        .HasAnnotation("MySQL:Collation", "utf8_unicode_ci");
                });

            modelBuilder.Entity("EmaaWebApi.Models.Corps", b =>
                {
                    b.Property<int>("CorpsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("BaseID")
                        .HasColumnType("int");

                    b.Property<string>("ImageName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("fullName")
                        .HasColumnType("varchar(50)");

                    b.Property<string>("shortName")
                        .HasColumnType("varchar(50)");

                    b.HasKey("CorpsId");

                    b.HasIndex("BaseID");

                    b.ToTable("Corps");
                });

            modelBuilder.Entity("EmaaWebApi.Models.Documents", b =>
                {
                    b.Property<int>("DocumentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Contenu")
                        .HasColumnType("text");

                    b.Property<string>("ImageName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("fullName")
                        .HasColumnType("varchar(50)");

                    b.HasKey("DocumentId");

                    b.ToTable("Documents");
                });

            modelBuilder.Entity("EmaaWebApi.Models.Service", b =>
                {
                    b.Property<int>("ServiceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CorpsId")
                        .HasColumnType("int");

                    b.Property<long>("Tel")
                        .HasColumnType("bigint");

                    b.Property<string>("fullName")
                        .HasColumnType("varchar(50)");

                    b.Property<string>("shortName")
                        .HasColumnType("varchar(50)");

                    b.HasKey("ServiceId");

                    b.HasIndex("CorpsId");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("EmaaWebApi.Models.Corps", b =>
                {
                    b.HasOne("EmaaWebApi.Models.Base", "Base")
                        .WithMany()
                        .HasForeignKey("BaseID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Base");
                });

            modelBuilder.Entity("EmaaWebApi.Models.Service", b =>
                {
                    b.HasOne("EmaaWebApi.Models.Corps", "Corps")
                        .WithMany()
                        .HasForeignKey("CorpsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Corps");
                });
#pragma warning restore 612, 618
        }
    }
}
