using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class User_flightReservations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "FlightReservations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservations_UserId",
                table: "FlightReservations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FlightReservations_Users_UserId",
                table: "FlightReservations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightReservations_Users_UserId",
                table: "FlightReservations");

            migrationBuilder.DropIndex(
                name: "IX_FlightReservations_UserId",
                table: "FlightReservations");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "FlightReservations");
        }
    }
}
