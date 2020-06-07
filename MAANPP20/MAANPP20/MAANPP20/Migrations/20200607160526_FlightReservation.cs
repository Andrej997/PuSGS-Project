using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FlightReservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FlightReservations",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    flightId = table.Column<int>(nullable: false),
                    price = table.Column<double>(nullable: false),
                    seatNumeration = table.Column<int>(nullable: false),
                    seatId = table.Column<int>(nullable: false),
                    UserIdForPOST = table.Column<string>(nullable: true),
                    userBonus = table.Column<bool>(nullable: false),
                    ocenaLeta = table.Column<int>(nullable: false),
                    ocenaKompanije = table.Column<int>(nullable: false),
                    deleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightReservations", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightReservations");
        }
    }
}
