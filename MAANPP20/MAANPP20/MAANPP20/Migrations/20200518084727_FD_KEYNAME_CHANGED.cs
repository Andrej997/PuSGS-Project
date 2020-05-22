using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FD_KEYNAME_CHANGED : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_FlightDestinations",
                table: "FlightDestinations");

            migrationBuilder.DropColumn(
                name: "destinationid",
                table: "FlightDestinations");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "FlightDestinations",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FlightDestinations",
                table: "FlightDestinations",
                column: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_FlightDestinations",
                table: "FlightDestinations");

            migrationBuilder.DropColumn(
                name: "id",
                table: "FlightDestinations");

            migrationBuilder.AddColumn<int>(
                name: "destinationid",
                table: "FlightDestinations",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FlightDestinations",
                table: "FlightDestinations",
                column: "destinationid");
        }
    }
}
