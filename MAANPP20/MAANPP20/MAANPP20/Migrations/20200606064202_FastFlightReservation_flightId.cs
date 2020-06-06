using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FastFlightReservation_flightId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FastFlightReservations_Flights_flightid",
                table: "FastFlightReservations");

            migrationBuilder.DropIndex(
                name: "IX_FastFlightReservations_flightid",
                table: "FastFlightReservations");

            migrationBuilder.RenameColumn(
                name: "flightid",
                table: "FastFlightReservations",
                newName: "flightId");

            migrationBuilder.AlterColumn<int>(
                name: "flightId",
                table: "FastFlightReservations",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "flightId",
                table: "FastFlightReservations",
                newName: "flightid");

            migrationBuilder.AlterColumn<int>(
                name: "flightid",
                table: "FastFlightReservations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_FastFlightReservations_flightid",
                table: "FastFlightReservations",
                column: "flightid");

            migrationBuilder.AddForeignKey(
                name: "FK_FastFlightReservations_Flights_flightid",
                table: "FastFlightReservations",
                column: "flightid",
                principalTable: "Flights",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
