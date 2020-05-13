using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class Flight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Flightid",
                table: "DoubleForICollections",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Flights",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    company = table.Column<string>(nullable: true),
                    idCompany = table.Column<int>(nullable: false),
                    logo = table.Column<string>(nullable: true),
                    addressFromId = table.Column<int>(nullable: false),
                    addressToId = table.Column<int>(nullable: false),
                    destImg = table.Column<string>(nullable: true),
                    datumPolaska = table.Column<DateTime>(nullable: false),
                    datumSletanja = table.Column<DateTime>(nullable: false),
                    prise = table.Column<double>(nullable: false),
                    priceTwoWay = table.Column<double>(nullable: false),
                    vremePutovanja = table.Column<string>(nullable: true),
                    duzinaPutovanja = table.Column<double>(nullable: false),
                    presedanjeId = table.Column<int>(nullable: false),
                    aeroplaneId = table.Column<int>(nullable: false),
                    luggageId = table.Column<int>(nullable: false),
                    numOfFastReseravtions = table.Column<int>(nullable: false),
                    discountForFastReservation = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flights", x => x.id);
                    table.ForeignKey(
                        name: "FK_Flights_Addresses_addressFromId",
                        column: x => x.addressFromId,
                        principalTable: "Addresses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.NoAction); 
                    table.ForeignKey(
                        name: "FK_Flights_Addresses_addressToId",
                        column: x => x.addressToId,
                        principalTable: "Addresses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Flights_Aeroplanes_aeroplaneId",
                        column: x => x.aeroplaneId,
                        principalTable: "Aeroplanes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Flights_AvioLuggages_luggageId",
                        column: x => x.luggageId,
                        principalTable: "AvioLuggages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Flights_Presedanja_presedanjeId",
                        column: x => x.presedanjeId,
                        principalTable: "Presedanja",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DoubleForICollections_Flightid",
                table: "DoubleForICollections",
                column: "Flightid");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_addressFromId",
                table: "Flights",
                column: "addressFromId");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_addressToId",
                table: "Flights",
                column: "addressToId");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_aeroplaneId",
                table: "Flights",
                column: "aeroplaneId");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_luggageId",
                table: "Flights",
                column: "luggageId");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_presedanjeId",
                table: "Flights",
                column: "presedanjeId");

            migrationBuilder.AddForeignKey(
                name: "FK_DoubleForICollections_Flights_Flightid",
                table: "DoubleForICollections",
                column: "Flightid",
                principalTable: "Flights",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DoubleForICollections_Flights_Flightid",
                table: "DoubleForICollections");

            migrationBuilder.DropTable(
                name: "Flights");

            migrationBuilder.DropIndex(
                name: "IX_DoubleForICollections_Flightid",
                table: "DoubleForICollections");

            migrationBuilder.DropColumn(
                name: "Flightid",
                table: "DoubleForICollections");
        }
    }
}
