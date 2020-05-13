using Microsoft.EntityFrameworkCore.Migrations;

namespace MAANPP20.Migrations
{
    public partial class Presedanje : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Presedanjeid",
                table: "StringForICollections",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Presedanja",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    brojPresedanja = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Presedanja", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StringForICollections_Presedanjeid",
                table: "StringForICollections",
                column: "Presedanjeid");

            migrationBuilder.AddForeignKey(
                name: "FK_StringForICollections_Presedanja_Presedanjeid",
                table: "StringForICollections",
                column: "Presedanjeid",
                principalTable: "Presedanja",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade, // Restrict
                onUpdate: ReferentialAction.Cascade); // nije postojao
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StringForICollections_Presedanja_Presedanjeid",
                table: "StringForICollections");

            migrationBuilder.DropTable(
                name: "Presedanja");

            migrationBuilder.DropIndex(
                name: "IX_StringForICollections_Presedanjeid",
                table: "StringForICollections");

            migrationBuilder.DropColumn(
                name: "Presedanjeid",
                table: "StringForICollections");
        }
    }
}
