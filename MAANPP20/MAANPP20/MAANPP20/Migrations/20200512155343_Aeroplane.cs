using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class Aeroplane : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Aeroplaneid",
                table: "AvioSedista",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Aeroplanes",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true),
                    numSeats = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aeroplanes", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AvioSedista_Aeroplaneid",
                table: "AvioSedista",
                column: "Aeroplaneid");

            migrationBuilder.AddForeignKey(
                name: "FK_AvioSedista_Aeroplanes_Aeroplaneid",
                table: "AvioSedista",
                column: "Aeroplaneid",
                principalTable: "Aeroplanes",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade,
                onUpdate: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AvioSedista_Aeroplanes_Aeroplaneid",
                table: "AvioSedista");

            migrationBuilder.DropTable(
                name: "Aeroplanes");

            migrationBuilder.DropIndex(
                name: "IX_AvioSedista_Aeroplaneid",
                table: "AvioSedista");

            migrationBuilder.DropColumn(
                name: "Aeroplaneid",
                table: "AvioSedista");
        }
    }
}
