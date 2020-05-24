using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FlightCompany_admin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "idAdmin",
                table: "FlightCompanies",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightCompanies_idAdmin",
                table: "FlightCompanies",
                column: "idAdmin");

            migrationBuilder.AddForeignKey(
                name: "FK_FlightCompanies_Users_idAdmin",
                table: "FlightCompanies",
                column: "idAdmin",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightCompanies_Users_idAdmin",
                table: "FlightCompanies");

            migrationBuilder.DropIndex(
                name: "IX_FlightCompanies_idAdmin",
                table: "FlightCompanies");

            migrationBuilder.DropColumn(
                name: "idAdmin",
                table: "FlightCompanies");

            migrationBuilder.AddColumn<int>(
                name: "FlightCompanyid",
                table: "Users",
                type: "int",
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
    }
}
