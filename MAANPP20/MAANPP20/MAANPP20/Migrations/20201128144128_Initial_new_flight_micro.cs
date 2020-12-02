using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class Initial_new_flight_micro : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_RentACarServices_RentACarServiceidRAC",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_RezervacijeOdDo_Cars_CaridCar",
                table: "RezervacijeOdDo");

            migrationBuilder.DropForeignKey(
                name: "FK_RezervacijeOdDo_Users_UserId",
                table: "RezervacijeOdDo");

            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "Gradovi");

            migrationBuilder.DropTable(
                name: "OcenePojedinacnogAuta");

            migrationBuilder.DropTable(
                name: "StavkaCenovnika");

            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropTable(
                name: "RentACarServices");

            migrationBuilder.DropTable(
                name: "Cenovnik");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_RentACarServiceidRAC",
                table: "Addresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RezervacijeOdDo",
                table: "RezervacijeOdDo");

            migrationBuilder.DropIndex(
                name: "IX_RezervacijeOdDo_CaridCar",
                table: "RezervacijeOdDo");

            migrationBuilder.DropColumn(
                name: "RentACarServiceidRAC",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "CaridCar",
                table: "RezervacijeOdDo");

            migrationBuilder.RenameTable(
                name: "RezervacijeOdDo",
                newName: "RezervacijaOdDo");

            migrationBuilder.RenameIndex(
                name: "IX_RezervacijeOdDo_UserId",
                table: "RezervacijaOdDo",
                newName: "IX_RezervacijaOdDo_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RezervacijaOdDo",
                table: "RezervacijaOdDo",
                column: "idRezervacijaOdDo");

            migrationBuilder.AddForeignKey(
                name: "FK_RezervacijaOdDo_Users_UserId",
                table: "RezervacijaOdDo",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RezervacijaOdDo_Users_UserId",
                table: "RezervacijaOdDo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RezervacijaOdDo",
                table: "RezervacijaOdDo");

            migrationBuilder.RenameTable(
                name: "RezervacijaOdDo",
                newName: "RezervacijeOdDo");

            migrationBuilder.RenameIndex(
                name: "IX_RezervacijaOdDo_UserId",
                table: "RezervacijeOdDo",
                newName: "IX_RezervacijeOdDo_UserId");

            migrationBuilder.AddColumn<int>(
                name: "RentACarServiceidRAC",
                table: "Addresses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CaridCar",
                table: "RezervacijeOdDo",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_RezervacijeOdDo",
                table: "RezervacijeOdDo",
                column: "idRezervacijaOdDo");

            migrationBuilder.CreateTable(
                name: "Cenovnik",
                columns: table => new
                {
                    idCenovnik = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cenovnik", x => x.idCenovnik);
                });

            migrationBuilder.CreateTable(
                name: "Gradovi",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    city = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    images = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gradovi", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "RentACarServices",
                columns: table => new
                {
                    idRAC = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CenovnikidCenovnik = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LogoImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RACaddressId = table.Column<int>(type: "int", nullable: false),
                    RACidAdmin = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentACarServices", x => x.idRAC);
                    table.ForeignKey(
                        name: "FK_RentACarServices_Cenovnik_CenovnikidCenovnik",
                        column: x => x.CenovnikidCenovnik,
                        principalTable: "Cenovnik",
                        principalColumn: "idCenovnik",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RentACarServices_Addresses_RACaddressId",
                        column: x => x.RACaddressId,
                        principalTable: "Addresses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RentACarServices_Users_RACidAdmin",
                        column: x => x.RACidAdmin,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StavkaCenovnika",
                columns: table => new
                {
                    idStavkeCenovnika = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CenovnikidCenovnik = table.Column<int>(type: "int", nullable: true),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Vrednost = table.Column<int>(type: "int", nullable: false),
                    deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StavkaCenovnika", x => x.idStavkeCenovnika);
                    table.ForeignKey(
                        name: "FK_StavkaCenovnika_Cenovnik_CenovnikidCenovnik",
                        column: x => x.CenovnikidCenovnik,
                        principalTable: "Cenovnik",
                        principalColumn: "idCenovnik",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    idCar = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BabySeat = table.Column<bool>(type: "bit", nullable: false),
                    Brand = table.Column<int>(type: "int", nullable: false),
                    CarImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cm3 = table.Column<int>(type: "int", nullable: false),
                    Doors = table.Column<int>(type: "int", nullable: false),
                    FreeSeats = table.Column<int>(type: "int", nullable: false),
                    Fuel = table.Column<int>(type: "int", nullable: false),
                    Gear = table.Column<int>(type: "int", nullable: false),
                    Kw = table.Column<int>(type: "int", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Navigation = table.Column<bool>(type: "bit", nullable: false),
                    PricePerDay = table.Column<double>(type: "float", nullable: false),
                    RentACarServiceidRAC = table.Column<int>(type: "int", nullable: true),
                    RoofRack = table.Column<bool>(type: "bit", nullable: false),
                    Seats = table.Column<int>(type: "int", nullable: false),
                    Trunk = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<DateTime>(type: "datetime2", nullable: false),
                    deleted = table.Column<bool>(type: "bit", nullable: false),
                    idService = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.idCar);
                    table.ForeignKey(
                        name: "FK_Cars_RentACarServices_RentACarServiceidRAC",
                        column: x => x.RentACarServiceidRAC,
                        principalTable: "RentACarServices",
                        principalColumn: "idRAC",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    idComment = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comm = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RentACarServiceidRAC = table.Column<int>(type: "int", nullable: true),
                    deleted = table.Column<bool>(type: "bit", nullable: false),
                    idUser = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.idComment);
                    table.ForeignKey(
                        name: "FK_Comment_RentACarServices_RentACarServiceidRAC",
                        column: x => x.RentACarServiceidRAC,
                        principalTable: "RentACarServices",
                        principalColumn: "idRAC",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OcenePojedinacnogAuta",
                columns: table => new
                {
                    idOcena = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CaridCar = table.Column<int>(type: "int", nullable: true),
                    RentACarServiceidRAC = table.Column<int>(type: "int", nullable: true),
                    broj = table.Column<int>(type: "int", nullable: false),
                    deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OcenePojedinacnogAuta", x => x.idOcena);
                    table.ForeignKey(
                        name: "FK_OcenePojedinacnogAuta_Cars_CaridCar",
                        column: x => x.CaridCar,
                        principalTable: "Cars",
                        principalColumn: "idCar",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OcenePojedinacnogAuta_RentACarServices_RentACarServiceidRAC",
                        column: x => x.RentACarServiceidRAC,
                        principalTable: "RentACarServices",
                        principalColumn: "idRAC",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_RentACarServiceidRAC",
                table: "Addresses",
                column: "RentACarServiceidRAC");

            migrationBuilder.CreateIndex(
                name: "IX_RezervacijeOdDo_CaridCar",
                table: "RezervacijeOdDo",
                column: "CaridCar");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_RentACarServiceidRAC",
                table: "Cars",
                column: "RentACarServiceidRAC");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_RentACarServiceidRAC",
                table: "Comment",
                column: "RentACarServiceidRAC");

            migrationBuilder.CreateIndex(
                name: "IX_OcenePojedinacnogAuta_CaridCar",
                table: "OcenePojedinacnogAuta",
                column: "CaridCar");

            migrationBuilder.CreateIndex(
                name: "IX_OcenePojedinacnogAuta_RentACarServiceidRAC",
                table: "OcenePojedinacnogAuta",
                column: "RentACarServiceidRAC");

            migrationBuilder.CreateIndex(
                name: "IX_RentACarServices_CenovnikidCenovnik",
                table: "RentACarServices",
                column: "CenovnikidCenovnik");

            migrationBuilder.CreateIndex(
                name: "IX_RentACarServices_RACaddressId",
                table: "RentACarServices",
                column: "RACaddressId");

            migrationBuilder.CreateIndex(
                name: "IX_RentACarServices_RACidAdmin",
                table: "RentACarServices",
                column: "RACidAdmin");

            migrationBuilder.CreateIndex(
                name: "IX_StavkaCenovnika_CenovnikidCenovnik",
                table: "StavkaCenovnika",
                column: "CenovnikidCenovnik");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_RentACarServices_RentACarServiceidRAC",
                table: "Addresses",
                column: "RentACarServiceidRAC",
                principalTable: "RentACarServices",
                principalColumn: "idRAC",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RezervacijeOdDo_Cars_CaridCar",
                table: "RezervacijeOdDo",
                column: "CaridCar",
                principalTable: "Cars",
                principalColumn: "idCar",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RezervacijeOdDo_Users_UserId",
                table: "RezervacijeOdDo",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
