using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class User_serviceId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "serviceId",
                table: "Users",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "serviceId",
                table: "Users");
        }
    }
}
