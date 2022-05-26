using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EmaaWebApi.Migrations
{
    public partial class first : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bases",
                columns: table => new
                {
                    BaseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    fullName = table.Column<string>(type: "varchar(50)", nullable: true),
                    shortName = table.Column<string>(type: "varchar(50)", nullable: true),
                    ImageName = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bases", x => x.BaseID);
                });

            migrationBuilder.CreateTable(
                name: "Documents",
                columns: table => new
                {
                    DocumentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    fullName = table.Column<string>(type: "varchar(50)", nullable: true),
                    Contenu = table.Column<string>(type: "text", nullable: true),
                    ImageName = table.Column<string>(type: "longtext CHARACTER SET utf8mb4", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documents", x => x.DocumentId);
                });

            migrationBuilder.CreateTable(
                name: "Corps",
                columns: table => new
                {
                    CorpsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    fullName = table.Column<string>(type: "varchar(50)", nullable: true),
                    shortName = table.Column<string>(type: "varchar(50)", nullable: true),
                    ImageName = table.Column<string>(type: "longtext CHARACTER SET utf8mb4", nullable: true),
                    BaseID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Corps", x => x.CorpsId);
                    table.ForeignKey(
                        name: "FK_Corps_Bases_BaseID",
                        column: x => x.BaseID,
                        principalTable: "Bases",
                        principalColumn: "BaseID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    ServiceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    fullName = table.Column<string>(type: "varchar(50)", nullable: true),
                    shortName = table.Column<string>(type: "varchar(50)", nullable: true),
                    Tel = table.Column<long>(type: "bigint", nullable: false),
                    CorpsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.ServiceId);
                    table.ForeignKey(
                        name: "FK_Services_Corps_CorpsId",
                        column: x => x.CorpsId,
                        principalTable: "Corps",
                        principalColumn: "CorpsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Corps_BaseID",
                table: "Corps",
                column: "BaseID");

            migrationBuilder.CreateIndex(
                name: "IX_Services_CorpsId",
                table: "Services",
                column: "CorpsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Documents");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Corps");

            migrationBuilder.DropTable(
                name: "Bases");
        }
    }
}
