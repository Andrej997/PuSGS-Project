using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class User_add_rentACarReservations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "RezervacijeOdDo",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RezervacijeOdDo_UserId",
                table: "RezervacijeOdDo",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RezervacijeOdDo_Users_UserId",
                table: "RezervacijeOdDo",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RezervacijeOdDo_Users_UserId",
                table: "RezervacijeOdDo");

            migrationBuilder.DropIndex(
                name: "IX_RezervacijeOdDo_UserId",
                table: "RezervacijeOdDo");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "RezervacijeOdDo");
        }
    }
}
