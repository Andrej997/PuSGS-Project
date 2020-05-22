using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class Added_logical_deletion_to_all : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "StringForICollections",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "Presedanja",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "Flights",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "FlightDestinations",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "FlightCompanies",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "DoubleForICollections",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "AvioSedista",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "AvioLuggages",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "Aeroplanes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "Addresses",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "deleted",
                table: "StringForICollections");

            migrationBuilder.DropColumn(
                name: "deleted",
                table: "Presedanja");

            migrationBuilder.DropColumn(
                name: "deleted",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "deleted",
                table: "FlightDestinations");

            migrationBuilder.DropColumn(
                name: "deleted",
                table: "FlightCompanies");

            migrationBuilder.DropColumn(
                name: "deleted",
                table: "DoubleForICollections");

            migrationBuilder.DropColumn(
                name: "deleted",
                table: "AvioSedista");

            migrationBuilder.DropColumn(
                name: "deleted",
                table: "AvioLuggages");

            migrationBuilder.DropColumn(
                name: "deleted",
                table: "Aeroplanes");

            migrationBuilder.DropColumn(
                name: "deleted",
                table: "Addresses");
        }
    }
}
