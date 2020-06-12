using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class RentACarService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RentACarServiceidRAC",
                table: "OcenePojedinacnogAuta",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RentACarServiceidRAC",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RentACarServiceidRAC",
                table: "Addresses",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_OcenePojedinacnogAuta_RentACarServiceidRAC",
                table: "OcenePojedinacnogAuta",
                column: "RentACarServiceidRAC");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_RentACarServiceidRAC",
                table: "Cars",
                column: "RentACarServiceidRAC");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_RentACarServiceidRAC",
                table: "Addresses",
                column: "RentACarServiceidRAC");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_RentACarServiceidRAC",
                table: "Comment",
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
                name: "FK_Cars_RentACarServices_RentACarServiceidRAC",
                table: "Cars",
                column: "RentACarServiceidRAC",
                principalTable: "RentACarServices",
                principalColumn: "idRAC",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OcenePojedinacnogAuta_RentACarServices_RentACarServiceidRAC",
                table: "OcenePojedinacnogAuta",
                column: "RentACarServiceidRAC",
                principalTable: "RentACarServices",
                principalColumn: "idRAC",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_RentACarServices_RentACarServiceidRAC",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_RentACarServices_RentACarServiceidRAC",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_OcenePojedinacnogAuta_RentACarServices_RentACarServiceidRAC",
                table: "OcenePojedinacnogAuta");

            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "StavkaCenovnika");

            migrationBuilder.DropTable(
                name: "RentACarServices");

            migrationBuilder.DropTable(
                name: "Cenovnik");

            migrationBuilder.DropIndex(
                name: "IX_OcenePojedinacnogAuta_RentACarServiceidRAC",
                table: "OcenePojedinacnogAuta");

            migrationBuilder.DropIndex(
                name: "IX_Cars_RentACarServiceidRAC",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_RentACarServiceidRAC",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "RentACarServiceidRAC",
                table: "OcenePojedinacnogAuta");

            migrationBuilder.DropColumn(
                name: "RentACarServiceidRAC",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "RentACarServiceidRAC",
                table: "Addresses");
        }
    }
}
