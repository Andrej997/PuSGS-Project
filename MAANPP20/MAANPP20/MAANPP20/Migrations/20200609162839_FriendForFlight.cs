using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FriendForFlight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FriendForFlights",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(nullable: true),
                    ime = table.Column<string>(nullable: true),
                    prezime = table.Column<string>(nullable: true),
                    seatNumber = table.Column<int>(nullable: false),
                    seatId = table.Column<int>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    FlightReservationid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendForFlights", x => x.id);
                    table.ForeignKey(
                        name: "FK_FriendForFlights_FlightReservations_FlightReservationid",
                        column: x => x.FlightReservationid,
                        principalTable: "FlightReservations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FriendForFlights_FlightReservationid",
                table: "FriendForFlights",
                column: "FlightReservationid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FriendForFlights");
        }
    }
}
