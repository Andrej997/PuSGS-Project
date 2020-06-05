using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FastFlightReservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FastFlightReservations",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    flightid = table.Column<int>(nullable: true),
                    price = table.Column<double>(nullable: false),
                    seatNumeration = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FastFlightReservations", x => x.id);
                    table.ForeignKey(
                        name: "FK_FastFlightReservations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FastFlightReservations_Flights_flightid",
                        column: x => x.flightid,
                        principalTable: "Flights",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FastFlightReservations_UserId",
                table: "FastFlightReservations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FastFlightReservations_flightid",
                table: "FastFlightReservations",
                column: "flightid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FastFlightReservations");
        }
    }
}
