using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    StuId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StuName = table.Column<string>(type: "VARCHAR", maxLength: 50, nullable: false),
                    StuGender = table.Column<string>(type: "VARCHAR", maxLength: 1, nullable: false),
                    StuAddress = table.Column<string>(type: "VARCHAR", maxLength: 100, nullable: false),
                    StuContactNumber = table.Column<string>(type: "VARCHAR", maxLength: 20, nullable: false),
                    StuDOB = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.StuId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Students");
        }
    }
}
