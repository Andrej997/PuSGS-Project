using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class Flight_seats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Flightid",
                table: "AvioSedista",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AvioSedista_Flightid",
                table: "AvioSedista",
                column: "Flightid");

            migrationBuilder.AddForeignKey(
                name: "FK_AvioSedista_Flights_Flightid",
                table: "AvioSedista",
                column: "Flightid",
                principalTable: "Flights",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AvioSedista_Flights_Flightid",
                table: "AvioSedista");

            migrationBuilder.DropIndex(
                name: "IX_AvioSedista_Flightid",
                table: "AvioSedista");

            migrationBuilder.DropColumn(
                name: "Flightid",
                table: "AvioSedista");
        }
    }
}
