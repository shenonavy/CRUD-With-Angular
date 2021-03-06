// <auto-generated />
using System;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210627065437_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113");

            modelBuilder.Entity("API.Models.Student", b =>
                {
                    b.Property<int>("StuId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("StuAddress")
                        .IsRequired()
                        .HasColumnType("VARCHAR")
                        .HasMaxLength(100);

                    b.Property<string>("StuContactNumber")
                        .IsRequired()
                        .HasColumnType("VARCHAR")
                        .HasMaxLength(20);

                    b.Property<DateTime>("StuDOB");

                    b.Property<string>("StuGender")
                        .IsRequired()
                        .HasColumnType("VARCHAR")
                        .HasMaxLength(1);

                    b.Property<string>("StuName")
                        .IsRequired()
                        .HasColumnType("VARCHAR")
                        .HasMaxLength(50);

                    b.HasKey("StuId");

                    b.ToTable("Students");
                });
#pragma warning restore 612, 618
        }
    }
}
