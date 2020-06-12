using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class Ocene_auta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OcenePojedinacnogAuta",
                columns: table => new
                {
                    idOcena = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    broj = table.Column<int>(nullable: false),
                    deleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OcenePojedinacnogAuta", x => x.idOcena);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OcenePojedinacnogAuta");
        }
    }
}
