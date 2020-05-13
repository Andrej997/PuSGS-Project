using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FlightDestination : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FlightDestinations",
                columns: table => new
                {
                    destinationid = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    sId = table.Column<int>(nullable: false),
                    eId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightDestinations", x => x.destinationid);
                    table.ForeignKey(
                        name: "FK_endId",
                        column: x => x.eId,
                        principalTable: "Addresses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade, // Restrict
                        onUpdate: ReferentialAction.Cascade); // nije
                    table.ForeignKey(
                        name: "FK_startId",
                        column: x => x.sId,
                        principalTable: "Addresses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.NoAction, // Restrict
                        onUpdate: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightDestinations_eId",
                table: "FlightDestinations",
                column: "eId");

            migrationBuilder.CreateIndex(
                name: "IX_FlightDestinations_sId",
                table: "FlightDestinations",
                column: "sId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightDestinations");
        }
    }
}
