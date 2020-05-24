using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class FriendRequests_myId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "myId",
                table: "FriendRequests",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "myId",
                table: "FriendRequests");
        }
    }
}
