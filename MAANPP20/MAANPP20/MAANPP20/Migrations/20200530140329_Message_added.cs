using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class Message_added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "hisId",
                table: "Messages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "myId",
                table: "Messages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "hisId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "myId",
                table: "Messages");
        }
    }
}
