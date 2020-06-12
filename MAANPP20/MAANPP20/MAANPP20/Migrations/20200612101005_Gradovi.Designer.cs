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
    [Migration("20200612101005_Gradovi")]
    partial class Gradovi
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MAANPP20.Models.Cars.Car", b =>
                {
                    b.Property<int>("idCar")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("BabySeat")
                        .HasColumnType("bit");

                    b.Property<int>("Brand")
                        .HasColumnType("int");

                    b.Property<string>("CarImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Cm3")
                        .HasColumnType("int");

                    b.Property<int>("Doors")
                        .HasColumnType("int");

                    b.Property<int>("FreeSeats")
                        .HasColumnType("int");

                    b.Property<int>("Fuel")
                        .HasColumnType("int");

                    b.Property<int>("Gear")
                        .HasColumnType("int");

                    b.Property<int>("Kw")
                        .HasColumnType("int");

                    b.Property<string>("Model")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Navigation")
                        .HasColumnType("bit");

                    b.Property<double>("PricePerDay")
                        .HasColumnType("float");

                    b.Property<int?>("RentACarServiceidRAC")
                        .HasColumnType("int");

                    b.Property<bool>("RoofRack")
                        .HasColumnType("bit");

                    b.Property<int>("Seats")
                        .HasColumnType("int");

                    b.Property<int>("Trunk")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<DateTime>("Year")
                        .HasColumnType("datetime2");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<int>("idService")
                        .HasColumnType("int");

                    b.HasKey("idCar");

                    b.HasIndex("RentACarServiceidRAC");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("MAANPP20.Models.Cars.Cenovnik", b =>
                {
                    b.Property<int>("idCenovnik")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.HasKey("idCenovnik");

                    b.ToTable("Cenovnik");
                });

            modelBuilder.Entity("MAANPP20.Models.Cars.Grad", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("city")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("images")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Gradovi");
                });

            modelBuilder.Entity("MAANPP20.Models.Cars.Ocena", b =>
                {
                    b.Property<int>("idOcena")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CaridCar")
                        .HasColumnType("int");

                    b.Property<int?>("RentACarServiceidRAC")
                        .HasColumnType("int");

                    b.Property<int>("broj")
                        .HasColumnType("int");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.HasKey("idOcena");

                    b.HasIndex("CaridCar");

                    b.HasIndex("RentACarServiceidRAC");

                    b.ToTable("OcenePojedinacnogAuta");
                });

            modelBuilder.Entity("MAANPP20.Models.Cars.RentACarService", b =>
                {
                    b.Property<int>("idRAC")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CenovnikidCenovnik")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LogoImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RACaddressId")
                        .HasColumnType("int");

                    b.Property<string>("RACidAdmin")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.HasKey("idRAC");

                    b.HasIndex("CenovnikidCenovnik");

                    b.HasIndex("RACaddressId");

                    b.HasIndex("RACidAdmin");

                    b.ToTable("RentACarServices");
                });

            modelBuilder.Entity("MAANPP20.Models.Cars.RezervacijaOdDo", b =>
                {
                    b.Property<int>("idRezervacijaOdDo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CaridCar")
                        .HasColumnType("int");

                    b.Property<DateTime>("Do")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Od")
                        .HasColumnType("datetime2");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.HasKey("idRezervacijaOdDo");

                    b.HasIndex("CaridCar");

                    b.ToTable("RezervacijeOdDo");
                });

            modelBuilder.Entity("MAANPP20.Models.Cars.StavkaCenovnika", b =>
                {
                    b.Property<int>("idStavkeCenovnika")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CenovnikidCenovnik")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Vrednost")
                        .HasColumnType("int");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.HasKey("idStavkeCenovnika");

                    b.HasIndex("CenovnikidCenovnik");

                    b.ToTable("StavkaCenovnika");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.Address", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("RentACarServiceidRAC")
                        .HasColumnType("int");

                    b.Property<string>("city")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<string>("streetAndNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("RentACarServiceidRAC");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.Comment", b =>
                {
                    b.Property<int>("idComment")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comm")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("RentACarServiceidRAC")
                        .HasColumnType("int");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<int>("idUser")
                        .HasColumnType("int");

                    b.HasKey("idComment");

                    b.HasIndex("RentACarServiceidRAC");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.DoubleForICollection", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("DoubleValue")
                        .HasColumnType("float");

                    b.Property<int?>("FlightCompanyid")
                        .HasColumnType("int");

                    b.Property<int?>("Flightid")
                        .HasColumnType("int");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.HasIndex("FlightCompanyid");

                    b.HasIndex("Flightid");

                    b.ToTable("DoubleForICollections");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.Friend", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<string>("hisId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("myId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("UserId");

                    b.ToTable("Friends");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.FriendRequest", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("hisId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isRequest")
                        .HasColumnType("bit");

                    b.Property<string>("myId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("UserId");

                    b.ToTable("FriendRequests");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.Message", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Friendid")
                        .HasColumnType("int");

                    b.Property<DateTime>("dateTime")
                        .HasColumnType("datetime2");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<string>("hisId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isUnread")
                        .HasColumnType("bit");

                    b.Property<string>("myId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("text")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("Friendid");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.StringForICollection", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("PlainString")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Presedanjeid")
                        .HasColumnType("int");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.HasIndex("Presedanjeid");

                    b.ToTable("StringForICollections");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("activationCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("addressid")
                        .HasColumnType("int");

                    b.Property<string>("authData")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("bonus")
                        .HasColumnType("int");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<string>("firstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(25)")
                        .HasMaxLength(25);

                    b.Property<string>("lastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(25)")
                        .HasMaxLength(25);

                    b.Property<string>("passportHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("profileImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("role")
                        .HasColumnType("int");

                    b.Property<int>("serviceId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("addressid");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.Aeroplane", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("numSeats")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.ToTable("Aeroplanes");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.AvioLuggage", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

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

            modelBuilder.Entity("MAANPP20.Models.Flights.AvioSediste", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Flightid")
                        .HasColumnType("int");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<bool>("isDisabled")
                        .HasColumnType("bit");

                    b.Property<bool>("isFastReservation")
                        .HasColumnType("bit");

                    b.Property<bool>("reserved")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.HasIndex("Flightid");

                    b.ToTable("AvioSedista");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.FastFlightReservation", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("UserIdForPOST")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<int>("flightId")
                        .HasColumnType("int");

                    b.Property<int>("ocenaKompanije")
                        .HasColumnType("int");

                    b.Property<int>("ocenaLeta")
                        .HasColumnType("int");

                    b.Property<double>("price")
                        .HasColumnType("float");

                    b.Property<int>("seatId")
                        .HasColumnType("int");

                    b.Property<int>("seatNumeration")
                        .HasColumnType("int");

                    b.Property<bool>("userBonus")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.HasIndex("UserId");

                    b.ToTable("FastFlightReservations");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.Flight", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FlightCompanyid")
                        .HasColumnType("int");

                    b.Property<int>("addressFromId")
                        .HasColumnType("int");

                    b.Property<int>("addressToId")
                        .HasColumnType("int");

                    b.Property<int>("aeroplaneId")
                        .HasColumnType("int");

                    b.Property<string>("company")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("datumPolaska")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("datumSletanja")
                        .HasColumnType("datetime2");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<string>("destImg")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("discountForFastReservation")
                        .HasColumnType("float");

                    b.Property<double>("duzinaPutovanja")
                        .HasColumnType("float");

                    b.Property<int>("idCompany")
                        .HasColumnType("int");

                    b.Property<string>("logo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("luggageId")
                        .HasColumnType("int");

                    b.Property<int>("numOfFastReseravtions")
                        .HasColumnType("int");

                    b.Property<int>("presedanjeId")
                        .HasColumnType("int");

                    b.Property<double>("priceTwoWay")
                        .HasColumnType("float");

                    b.Property<double>("prise")
                        .HasColumnType("float");

                    b.Property<string>("vremePutovanja")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("FlightCompanyid");

                    b.HasIndex("addressFromId");

                    b.HasIndex("addressToId");

                    b.HasIndex("aeroplaneId");

                    b.HasIndex("luggageId");

                    b.HasIndex("presedanjeId");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.FlightCompany", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("addressId")
                        .HasColumnType("int");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<string>("idAdmin")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("logo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(25)")
                        .HasMaxLength(25);

                    b.Property<string>("promotionalDesc")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("addressId");

                    b.HasIndex("idAdmin");

                    b.ToTable("FlightCompanies");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.FlightDestination", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FlightCompanyid")
                        .HasColumnType("int");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<int>("eId")
                        .HasColumnType("int");

                    b.Property<int>("sId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("FlightCompanyid");

                    b.HasIndex("eId");

                    b.HasIndex("sId");

                    b.ToTable("FlightDestinations");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.FlightReservation", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("UserIdForPOST")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<int>("flightId")
                        .HasColumnType("int");

                    b.Property<int>("ocenaKompanije")
                        .HasColumnType("int");

                    b.Property<int>("ocenaLeta")
                        .HasColumnType("int");

                    b.Property<double>("price")
                        .HasColumnType("float");

                    b.Property<int>("seatId")
                        .HasColumnType("int");

                    b.Property<int>("seatNumeration")
                        .HasColumnType("int");

                    b.Property<bool>("userBonus")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.HasIndex("UserId");

                    b.ToTable("FlightReservations");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.Presedanje", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("brojPresedanja")
                        .HasColumnType("int");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.ToTable("Presedanja");
                });

            modelBuilder.Entity("MAANPP20.Models.Cars.Car", b =>
                {
                    b.HasOne("MAANPP20.Models.Cars.RentACarService", null)
                        .WithMany("RACServiceCars")
                        .HasForeignKey("RentACarServiceidRAC");
                });

            modelBuilder.Entity("MAANPP20.Models.Cars.Ocena", b =>
                {
                    b.HasOne("MAANPP20.Models.Cars.Car", null)
                        .WithMany("OceneAuta")
                        .HasForeignKey("CaridCar");

                    b.HasOne("MAANPP20.Models.Cars.RentACarService", null)
                        .WithMany("RACOcene")
                        .HasForeignKey("RentACarServiceidRAC");
                });

            modelBuilder.Entity("MAANPP20.Models.Cars.RentACarService", b =>
                {
                    b.HasOne("MAANPP20.Models.Cars.Cenovnik", "Cenovnik")
                        .WithMany()
                        .HasForeignKey("CenovnikidCenovnik");

                    b.HasOne("MAANPP20.Models.Common.Address", "RACAddress")
                        .WithMany()
                        .HasForeignKey("RACaddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MAANPP20.Models.Common.User", "RACAdmin")
                        .WithMany()
                        .HasForeignKey("RACidAdmin");
                });

            modelBuilder.Entity("MAANPP20.Models.Cars.RezervacijaOdDo", b =>
                {
                    b.HasOne("MAANPP20.Models.Cars.Car", null)
                        .WithMany("RezervacijeAutaOdDo")
                        .HasForeignKey("CaridCar");
                });

            modelBuilder.Entity("MAANPP20.Models.Cars.StavkaCenovnika", b =>
                {
                    b.HasOne("MAANPP20.Models.Cars.Cenovnik", null)
                        .WithMany("StavkeCenovnika")
                        .HasForeignKey("CenovnikidCenovnik");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.Address", b =>
                {
                    b.HasOne("MAANPP20.Models.Cars.RentACarService", null)
                        .WithMany("RACBranches")
                        .HasForeignKey("RentACarServiceidRAC");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.Comment", b =>
                {
                    b.HasOne("MAANPP20.Models.Cars.RentACarService", null)
                        .WithMany("RACComments")
                        .HasForeignKey("RentACarServiceidRAC");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.DoubleForICollection", b =>
                {
                    b.HasOne("MAANPP20.Models.Flights.FlightCompany", null)
                        .WithMany("ocene")
                        .HasForeignKey("FlightCompanyid");

                    b.HasOne("MAANPP20.Models.Flights.Flight", null)
                        .WithMany("ocene")
                        .HasForeignKey("Flightid");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.Friend", b =>
                {
                    b.HasOne("MAANPP20.Models.Common.User", null)
                        .WithMany("friends")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.FriendRequest", b =>
                {
                    b.HasOne("MAANPP20.Models.Common.User", null)
                        .WithMany("friendRequests")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.Message", b =>
                {
                    b.HasOne("MAANPP20.Models.Common.Friend", null)
                        .WithMany("messages")
                        .HasForeignKey("Friendid");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.StringForICollection", b =>
                {
                    b.HasOne("MAANPP20.Models.Flights.Presedanje", null)
                        .WithMany("gradoviPresedanja")
                        .HasForeignKey("Presedanjeid");
                });

            modelBuilder.Entity("MAANPP20.Models.Common.User", b =>
                {
                    b.HasOne("MAANPP20.Models.Common.Address", "address")
                        .WithMany()
                        .HasForeignKey("addressid");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.AvioSediste", b =>
                {
                    b.HasOne("MAANPP20.Models.Flights.Flight", null)
                        .WithMany("allSeatsForThisFlight")
                        .HasForeignKey("Flightid");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.FastFlightReservation", b =>
                {
                    b.HasOne("MAANPP20.Models.Common.User", null)
                        .WithMany("fastFlightReservations")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.Flight", b =>
                {
                    b.HasOne("MAANPP20.Models.Flights.FlightCompany", null)
                        .WithMany("flights")
                        .HasForeignKey("FlightCompanyid");

                    b.HasOne("MAANPP20.Models.Common.Address", "from")
                        .WithMany()
                        .HasForeignKey("addressFromId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MAANPP20.Models.Common.Address", "to")
                        .WithMany()
                        .HasForeignKey("addressToId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MAANPP20.Models.Flights.Aeroplane", "aeroplane")
                        .WithMany()
                        .HasForeignKey("aeroplaneId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MAANPP20.Models.Flights.AvioLuggage", "luggage")
                        .WithMany()
                        .HasForeignKey("luggageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MAANPP20.Models.Flights.Presedanje", "presedanje")
                        .WithMany()
                        .HasForeignKey("presedanjeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MAANPP20.Models.Flights.FlightCompany", b =>
                {
                    b.HasOne("MAANPP20.Models.Common.Address", "address")
                        .WithMany()
                        .HasForeignKey("addressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MAANPP20.Models.Common.User", "admin")
                        .WithMany()
                        .HasForeignKey("idAdmin");
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

            modelBuilder.Entity("MAANPP20.Models.Flights.FlightReservation", b =>
                {
                    b.HasOne("MAANPP20.Models.Common.User", null)
                        .WithMany("flightReservations")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
