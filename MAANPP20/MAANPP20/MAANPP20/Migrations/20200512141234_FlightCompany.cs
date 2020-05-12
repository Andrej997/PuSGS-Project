using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FlightCompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FlightCompanyid",
                table: "FlightDestinations",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FlightCompanies",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true),
                    addressId = table.Column<int>(nullable: false),
                    promotionalDesc = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightCompanies", x => x.id);
                    table.ForeignKey(
                        name: "FK_FlightCompanies_Addresses_addressId",
                        column: x => x.addressId,
                        principalTable: "Addresses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightDestinations_FlightCompanyid",
                table: "FlightDestinations",
                column: "FlightCompanyid");

            migrationBuilder.CreateIndex(
                name: "IX_FlightCompanies_addressId",
                table: "FlightCompanies",
                column: "addressId");

            migrationBuilder.AddForeignKey(
                name: "FK_FlightDestinations_FlightCompanies_FlightCompanyid",
                table: "FlightDestinations",
                column: "FlightCompanyid",
                principalTable: "FlightCompanies",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightDestinations_FlightCompanies_FlightCompanyid",
                table: "FlightDestinations");

            migrationBuilder.DropTable(
                name: "FlightCompanies");

            migrationBuilder.DropIndex(
                name: "IX_FlightDestinations_FlightCompanyid",
                table: "FlightDestinations");

            migrationBuilder.DropColumn(
                name: "FlightCompanyid",
                table: "FlightDestinations");
        }
    }
}
