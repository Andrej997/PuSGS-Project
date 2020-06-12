using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class Cars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CaridCar",
                table: "RezervacijeOdDo",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CaridCar",
                table: "OcenePojedinacnogAuta",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    idCar = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Brand = table.Column<int>(nullable: false),
                    Model = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false),
                    Gear = table.Column<int>(nullable: false),
                    Fuel = table.Column<int>(nullable: false),
                    Year = table.Column<DateTime>(nullable: false),
                    Cm3 = table.Column<int>(nullable: false),
                    Kw = table.Column<int>(nullable: false),
                    Doors = table.Column<int>(nullable: false),
                    Seats = table.Column<int>(nullable: false),
                    FreeSeats = table.Column<int>(nullable: false),
                    Trunk = table.Column<int>(nullable: false),
                    PricePerDay = table.Column<double>(nullable: false),
                    CarImage = table.Column<string>(nullable: true),
                    BabySeat = table.Column<bool>(nullable: false),
                    Navigation = table.Column<bool>(nullable: false),
                    RoofRack = table.Column<bool>(nullable: false),
                    deleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.idCar);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RezervacijeOdDo_CaridCar",
                table: "RezervacijeOdDo",
                column: "CaridCar");

            migrationBuilder.CreateIndex(
                name: "IX_OcenePojedinacnogAuta_CaridCar",
                table: "OcenePojedinacnogAuta",
                column: "CaridCar");

            migrationBuilder.AddForeignKey(
                name: "FK_OcenePojedinacnogAuta_Cars_CaridCar",
                table: "OcenePojedinacnogAuta",
                column: "CaridCar",
                principalTable: "Cars",
                principalColumn: "idCar",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RezervacijeOdDo_Cars_CaridCar",
                table: "RezervacijeOdDo",
                column: "CaridCar",
                principalTable: "Cars",
                principalColumn: "idCar",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OcenePojedinacnogAuta_Cars_CaridCar",
                table: "OcenePojedinacnogAuta");

            migrationBuilder.DropForeignKey(
                name: "FK_RezervacijeOdDo_Cars_CaridCar",
                table: "RezervacijeOdDo");

            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_RezervacijeOdDo_CaridCar",
                table: "RezervacijeOdDo");

            migrationBuilder.DropIndex(
                name: "IX_OcenePojedinacnogAuta_CaridCar",
                table: "OcenePojedinacnogAuta");

            migrationBuilder.DropColumn(
                name: "CaridCar",
                table: "RezervacijeOdDo");

            migrationBuilder.DropColumn(
                name: "CaridCar",
                table: "OcenePojedinacnogAuta");
        }
    }
}
