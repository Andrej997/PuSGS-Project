using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FlightCompany_added_last3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FlightCompanyid",
                table: "Flights",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "logo",
                table: "FlightCompanies",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FlightCompanyid",
                table: "DoubleForICollections",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flights_FlightCompanyid",
                table: "Flights",
                column: "FlightCompanyid");

            migrationBuilder.CreateIndex(
                name: "IX_DoubleForICollections_FlightCompanyid",
                table: "DoubleForICollections",
                column: "FlightCompanyid");

            migrationBuilder.AddForeignKey(
                name: "FK_DoubleForICollections_FlightCompanies_FlightCompanyid",
                table: "DoubleForICollections",
                column: "FlightCompanyid",
                principalTable: "FlightCompanies",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade, // Restrict
                onUpdate: ReferentialAction.Cascade); // nije

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_FlightCompanies_FlightCompanyid",
                table: "Flights",
                column: "FlightCompanyid",
                principalTable: "FlightCompanies",
                principalColumn: "id",
                onDelete: ReferentialAction.NoAction,  // Restrict
                onUpdate: ReferentialAction.NoAction); // nije
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DoubleForICollections_FlightCompanies_FlightCompanyid",
                table: "DoubleForICollections");

            migrationBuilder.DropForeignKey(
                name: "FK_Flights_FlightCompanies_FlightCompanyid",
                table: "Flights");

            migrationBuilder.DropIndex(
                name: "IX_Flights_FlightCompanyid",
                table: "Flights");

            migrationBuilder.DropIndex(
                name: "IX_DoubleForICollections_FlightCompanyid",
                table: "DoubleForICollections");

            migrationBuilder.DropColumn(
                name: "FlightCompanyid",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "logo",
                table: "FlightCompanies");

            migrationBuilder.DropColumn(
                name: "FlightCompanyid",
                table: "DoubleForICollections");
        }
    }
}
