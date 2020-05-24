using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class User_friendRequests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FriendRequests",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<string>(nullable: true),
                    isRequest = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendRequests", x => x.id);
                    table.ForeignKey(
                        name: "FK_FriendRequests_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FriendRequests_userId",
                table: "FriendRequests",
                column: "userId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FriendRequests");
        }
    }
}
