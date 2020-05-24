using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FriendRequest_user_removed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FriendRequests_Users_userId",
                table: "FriendRequests");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "FriendRequests",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_FriendRequests_userId",
                table: "FriendRequests",
                newName: "IX_FriendRequests_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FriendRequests_Users_UserId",
                table: "FriendRequests",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FriendRequests_Users_UserId",
                table: "FriendRequests");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "FriendRequests",
                newName: "userId");

            migrationBuilder.RenameIndex(
                name: "IX_FriendRequests_UserId",
                table: "FriendRequests",
                newName: "IX_FriendRequests_userId");

            migrationBuilder.AddForeignKey(
                name: "FK_FriendRequests_Users_userId",
                table: "FriendRequests",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
