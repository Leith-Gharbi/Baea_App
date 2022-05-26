using Microsoft.EntityFrameworkCore.Migrations;

namespace AuthWebApi.Migrations
{
    public partial class first : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    CIN = table.Column<string>(type: "varchar(50)", nullable: false),
                    Matricule = table.Column<string>(nullable: true),
                    Code_Grade = table.Column<string>(nullable: true),
                    Prenom = table.Column<string>(nullable: true),
                    Nom = table.Column<string>(nullable: true),
                    Unite = table.Column<string>(nullable: true),
                    Email = table.Column<string>(type: "varchar(100)", nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Tel = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.CIN);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
