using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class Removed_aeroplane_seats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AvioSedista_Aeroplanes_Aeroplaneid",
                table: "AvioSedista");

            migrationBuilder.DropIndex(
                name: "IX_AvioSedista_Aeroplaneid",
                table: "AvioSedista");

            migrationBuilder.DropColumn(
                name: "Aeroplaneid",
                table: "AvioSedista");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Aeroplaneid",
                table: "AvioSedista",
                type: "int",
                nullable: true);

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
                onDelete: ReferentialAction.Restrict);
        }
    }
}
