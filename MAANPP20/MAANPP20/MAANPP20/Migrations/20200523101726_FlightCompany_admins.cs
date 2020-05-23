using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FlightCompany_admins : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FlightCompanyid",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_FlightCompanyid",
                table: "Users",
                column: "FlightCompanyid");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_FlightCompanies_FlightCompanyid",
                table: "Users",
                column: "FlightCompanyid",
                principalTable: "FlightCompanies",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_FlightCompanies_FlightCompanyid",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_FlightCompanyid",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FlightCompanyid",
                table: "Users");
        }
    }
}
