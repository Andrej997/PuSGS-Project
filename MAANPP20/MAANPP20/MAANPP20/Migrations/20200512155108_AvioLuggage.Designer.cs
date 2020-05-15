﻿// <auto-generated />
using System;
using MAANPP20.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MAANPP20.Migrations
{
    [DbContext(typeof(MAANPP20Context))]
    [Migration("20200512155108_AvioLuggage")]
    partial class AvioLuggage
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MAANPP20.Models.Common.Address", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("city")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("streetAndNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.AvioLuggage", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("priceCarryOn")
                        .HasColumnType("float");

                    b.Property<double>("priceFullSizeSpinner")
                        .HasColumnType("float");

                    b.Property<double>("priceLargeDuffel")
                        .HasColumnType("float");

                    b.Property<double>("pricePersonalBag")
                        .HasColumnType("float");

                    b.HasKey("id");

                    b.ToTable("AvioLuggages");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.FlightCompany", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("addressId")
                        .HasColumnType("int");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("promotionalDesc")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("addressId");

                    b.ToTable("FlightCompanies");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.FlightDestination", b =>
                {
                    b.Property<int>("destinationid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FlightCompanyid")
                        .HasColumnType("int");

                    b.Property<int>("eId")
                        .HasColumnType("int");

                    b.Property<int>("sId")
                        .HasColumnType("int");

                    b.HasKey("destinationid");

                    b.HasIndex("FlightCompanyid");

                    b.HasIndex("eId");

                    b.HasIndex("sId");

                    b.ToTable("FlightDestinations");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.FlightCompany", b =>
                {
                    b.HasOne("MAANPP20.Models.Common.Address", "address")
                        .WithMany()
                        .HasForeignKey("addressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.FlightDestination", b =>
                {
                    b.HasOne("MAANPP20.Models.Flights.FlightCompany", null)
                        .WithMany("destinations")
                        .HasForeignKey("FlightCompanyid");

                    b.HasOne("MAANPP20.Models.Common.Address", "endAddress")
                        .WithMany()
                        .HasForeignKey("eId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MAANPP20.Models.Common.Address", "startAddress")
                        .WithMany()
                        .HasForeignKey("sId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
