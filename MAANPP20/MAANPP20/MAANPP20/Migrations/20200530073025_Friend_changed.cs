using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class Friend_changed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friends_Users_userId",
                table: "Friends");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Friends",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Friends_userId",
                table: "Friends",
                newName: "IX_Friends_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Friends",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "hisId",
                table: "Friends",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "myId",
                table: "Friends",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_Users_UserId",
                table: "Friends",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friends_Users_UserId",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "hisId",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "myId",
                table: "Friends");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Friends",
                newName: "userId");

            migrationBuilder.RenameIndex(
                name: "IX_Friends_UserId",
                table: "Friends",
                newName: "IX_Friends_userId");

            migrationBuilder.AlterColumn<string>(
                name: "userId",
                table: "Friends",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_Users_userId",
                table: "Friends",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
