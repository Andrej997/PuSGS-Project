using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FastFlightReservation_ocene : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ocenaKompanije",
                table: "FastFlightReservations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ocenaLeta",
                table: "FastFlightReservations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ocenaKompanije",
                table: "FastFlightReservations");

            migrationBuilder.DropColumn(
                name: "ocenaLeta",
                table: "FastFlightReservations");
        }
    }
}
