using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarMicroservice.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cenovnik",
                columns: table => new
                {
                    idCenovnik = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    deleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cenovnik", x => x.idCenovnik);
                });

            migrationBuilder.CreateTable(
                name: "Gradovi",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    city = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    images = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gradovi", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "StavkaCenovnika",
                columns: table => new
                {
                    idStavkeCenovnika = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(nullable: true),
                    Vrednost = table.Column<int>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    CenovnikidCenovnik = table.Column<int>(nullable: true)
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
                name: "RentACarServices",
                columns: table => new
                {
                    idRAC = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    LogoImage = table.Column<string>(nullable: true),
                    RACaddressId = table.Column<int>(nullable: false),
                    CenovnikidCenovnik = table.Column<int>(nullable: true),
                    RACidAdmin = table.Column<string>(nullable: true),
                    deleted = table.Column<bool>(nullable: false)
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
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    streetAndNumber = table.Column<string>(nullable: true),
                    city = table.Column<string>(nullable: true),
                    country = table.Column<string>(nullable: true),
                    deleted = table.Column<bool>(nullable: false),
                    RentACarServiceidRAC = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.id);
                    table.ForeignKey(
                        name: "FK_Addresses_RentACarServices_RentACarServiceidRAC",
                        column: x => x.RentACarServiceidRAC,
                        principalTable: "RentACarServices",
                        principalColumn: "idRAC",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    idCar = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idService = table.Column<int>(nullable: false),
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
                    deleted = table.Column<bool>(nullable: false),
                    RentACarServiceidRAC = table.Column<int>(nullable: true)
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
                    idComment = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idUser = table.Column<int>(nullable: false),
                    Comm = table.Column<string>(nullable: true),
                    deleted = table.Column<bool>(nullable: false),
                    RentACarServiceidRAC = table.Column<int>(nullable: true)
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
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    NormalizedUserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    NormalizedEmail = table.Column<string>(nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    firstName = table.Column<string>(maxLength: 25, nullable: false),
                    lastName = table.Column<string>(maxLength: 25, nullable: false),
                    profileImage = table.Column<string>(nullable: true),
                    addressid = table.Column<int>(nullable: true),
                    role = table.Column<int>(nullable: false),
                    passportHash = table.Column<string>(nullable: true),
                    authData = table.Column<string>(nullable: true),
                    serviceId = table.Column<int>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    activationCode = table.Column<string>(nullable: true),
                    bonus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Addresses_addressid",
                        column: x => x.addressid,
                        principalTable: "Addresses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OcenePojedinacnogAuta",
                columns: table => new
                {
                    idOcena = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    broj = table.Column<int>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    CaridCar = table.Column<int>(nullable: true),
                    RentACarServiceidRAC = table.Column<int>(nullable: true)
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

            migrationBuilder.CreateTable(
                name: "FastFlightReservation",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    flightId = table.Column<int>(nullable: false),
                    price = table.Column<double>(nullable: false),
                    seatNumeration = table.Column<int>(nullable: false),
                    seatId = table.Column<int>(nullable: false),
                    UserIdForPOST = table.Column<string>(nullable: true),
                    userBonus = table.Column<bool>(nullable: false),
                    ocenaLeta = table.Column<int>(nullable: false),
                    ocenaKompanije = table.Column<int>(nullable: false),
                    dateNow = table.Column<DateTime>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FastFlightReservation", x => x.id);
                    table.ForeignKey(
                        name: "FK_FastFlightReservation_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FlightReservation",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    flightId = table.Column<int>(nullable: false),
                    price = table.Column<double>(nullable: false),
                    seatNumeration = table.Column<int>(nullable: false),
                    seatId = table.Column<int>(nullable: false),
                    UserIdForPOST = table.Column<string>(nullable: true),
                    userBonus = table.Column<bool>(nullable: false),
                    ocenaLeta = table.Column<int>(nullable: false),
                    ocenaKompanije = table.Column<int>(nullable: false),
                    dateNow = table.Column<DateTime>(nullable: false),
                    rentACar = table.Column<bool>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightReservation", x => x.id);
                    table.ForeignKey(
                        name: "FK_FlightReservation_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Friend",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    myId = table.Column<string>(nullable: true),
                    hisId = table.Column<string>(nullable: true),
                    deleted = table.Column<bool>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friend", x => x.id);
                    table.ForeignKey(
                        name: "FK_Friend_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FriendRequest",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    myId = table.Column<string>(nullable: true),
                    hisId = table.Column<string>(nullable: true),
                    isRequest = table.Column<bool>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendRequest", x => x.id);
                    table.ForeignKey(
                        name: "FK_FriendRequest_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RezervacijeOdDo",
                columns: table => new
                {
                    idRezervacijaOdDo = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Od = table.Column<DateTime>(nullable: false),
                    Do = table.Column<DateTime>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    CaridCar = table.Column<int>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RezervacijeOdDo", x => x.idRezervacijaOdDo);
                    table.ForeignKey(
                        name: "FK_RezervacijeOdDo_Cars_CaridCar",
                        column: x => x.CaridCar,
                        principalTable: "Cars",
                        principalColumn: "idCar",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RezervacijeOdDo_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FriendForFlight",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(nullable: true),
                    ime = table.Column<string>(nullable: true),
                    prezime = table.Column<string>(nullable: true),
                    seatNumber = table.Column<int>(nullable: false),
                    seatId = table.Column<int>(nullable: false),
                    invitationString = table.Column<string>(nullable: true),
                    reservationDate = table.Column<DateTime>(nullable: false),
                    acceptedCall = table.Column<bool>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    FlightReservationid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendForFlight", x => x.id);
                    table.ForeignKey(
                        name: "FK_FriendForFlight_FlightReservation_FlightReservationid",
                        column: x => x.FlightReservationid,
                        principalTable: "FlightReservation",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    text = table.Column<string>(nullable: true),
                    dateTime = table.Column<DateTime>(nullable: false),
                    myId = table.Column<string>(nullable: true),
                    hisId = table.Column<string>(nullable: true),
                    isUnread = table.Column<bool>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    Friendid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.id);
                    table.ForeignKey(
                        name: "FK_Message_Friend_Friendid",
                        column: x => x.Friendid,
                        principalTable: "Friend",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_RentACarServiceidRAC",
                table: "Addresses",
                column: "RentACarServiceidRAC");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_RentACarServiceidRAC",
                table: "Cars",
                column: "RentACarServiceidRAC");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_RentACarServiceidRAC",
                table: "Comment",
                column: "RentACarServiceidRAC");

            migrationBuilder.CreateIndex(
                name: "IX_FastFlightReservation_UserId",
                table: "FastFlightReservation",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservation_UserId",
                table: "FlightReservation",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Friend_UserId",
                table: "Friend",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FriendForFlight_FlightReservationid",
                table: "FriendForFlight",
                column: "FlightReservationid");

            migrationBuilder.CreateIndex(
                name: "IX_FriendRequest_UserId",
                table: "FriendRequest",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Message_Friendid",
                table: "Message",
                column: "Friendid");

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
                name: "IX_RezervacijeOdDo_CaridCar",
                table: "RezervacijeOdDo",
                column: "CaridCar");

            migrationBuilder.CreateIndex(
                name: "IX_RezervacijeOdDo_UserId",
                table: "RezervacijeOdDo",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_StavkaCenovnika_CenovnikidCenovnik",
                table: "StavkaCenovnika",
                column: "CenovnikidCenovnik");

            migrationBuilder.CreateIndex(
                name: "IX_Users_addressid",
                table: "Users",
                column: "addressid");

            migrationBuilder.AddForeignKey(
                name: "FK_RentACarServices_Users_RACidAdmin",
                table: "RentACarServices",
                column: "RACidAdmin",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RentACarServices_Addresses_RACaddressId",
                table: "RentACarServices",
                column: "RACaddressId",
                principalTable: "Addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_RentACarServices_RentACarServiceidRAC",
                table: "Addresses");

            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "FastFlightReservation");

            migrationBuilder.DropTable(
                name: "FriendForFlight");

            migrationBuilder.DropTable(
                name: "FriendRequest");

            migrationBuilder.DropTable(
                name: "Gradovi");

            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "OcenePojedinacnogAuta");

            migrationBuilder.DropTable(
                name: "RezervacijeOdDo");

            migrationBuilder.DropTable(
                name: "StavkaCenovnika");

            migrationBuilder.DropTable(
                name: "FlightReservation");

            migrationBuilder.DropTable(
                name: "Friend");

            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropTable(
                name: "RentACarServices");

            migrationBuilder.DropTable(
                name: "Cenovnik");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Addresses");
        }
    }
}
