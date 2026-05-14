-- CreateEnum
CREATE TYPE "RoleeEnum" AS ENUM ('BUS', 'TRASH', 'OTHERS');

-- CreateTable
CREATE TABLE "Localisation" (
    "id_localisation" SERIAL NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Localisation_pkey" PRIMARY KEY ("id_localisation")
);

-- CreateTable
CREATE TABLE "Quarter" (
    "id_quarter" SERIAL NOT NULL,
    "quarter_name" TEXT NOT NULL,
    "id_localisation" INTEGER NOT NULL,

    CONSTRAINT "Quarter_pkey" PRIMARY KEY ("id_quarter")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id_admin" SERIAL NOT NULL,
    "rolee" "RoleeEnum" NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "Population" (
    "id_population" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_quarter" INTEGER NOT NULL,
    "id_localisation" INTEGER NOT NULL,

    CONSTRAINT "Population_pkey" PRIMARY KEY ("id_population")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id_driver" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_bus" INTEGER NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id_driver")
);

-- CreateTable
CREATE TABLE "Line" (
    "id_line" SERIAL NOT NULL,
    "nb_line" TEXT NOT NULL,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id_line")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id_bus" SERIAL NOT NULL,
    "matricule" TEXT NOT NULL,
    "bus_status" BOOLEAN NOT NULL,
    "id_line" INTEGER NOT NULL,
    "id_localisation" INTEGER NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id_bus")
);

-- CreateTable
CREATE TABLE "Stop" (
    "id_stop" SERIAL NOT NULL,
    "order_stop" INTEGER NOT NULL,
    "name_stop" TEXT NOT NULL,
    "id_line" INTEGER NOT NULL,
    "id_localisation" INTEGER NOT NULL,

    CONSTRAINT "Stop_pkey" PRIMARY KEY ("id_stop")
);

-- CreateTable
CREATE TABLE "Signal" (
    "id_signal" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "signal_status" BOOLEAN NOT NULL,
    "id_population" INTEGER NOT NULL,
    "id_quarter" INTEGER NOT NULL,

    CONSTRAINT "Signal_pkey" PRIMARY KEY ("id_signal")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id_notice" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date_notice" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_quarter" INTEGER NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id_notice")
);

-- CreateTable
CREATE TABLE "Collect" (
    "id_collect" SERIAL NOT NULL,
    "date_collect" TIMESTAMP(3) NOT NULL,
    "id_quarter" INTEGER NOT NULL,

    CONSTRAINT "Collect_pkey" PRIMARY KEY ("id_collect")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_user_key" ON "Admin"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Population_id_user_key" ON "Population"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_id_user_key" ON "Driver"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_id_bus_key" ON "Driver"("id_bus");

-- CreateIndex
CREATE UNIQUE INDEX "Line_nb_line_key" ON "Line"("nb_line");

-- CreateIndex
CREATE UNIQUE INDEX "Bus_matricule_key" ON "Bus"("matricule");

-- AddForeignKey
ALTER TABLE "Quarter" ADD CONSTRAINT "Quarter_id_localisation_fkey" FOREIGN KEY ("id_localisation") REFERENCES "Localisation"("id_localisation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Population" ADD CONSTRAINT "Population_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Population" ADD CONSTRAINT "Population_id_quarter_fkey" FOREIGN KEY ("id_quarter") REFERENCES "Quarter"("id_quarter") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Population" ADD CONSTRAINT "Population_id_localisation_fkey" FOREIGN KEY ("id_localisation") REFERENCES "Localisation"("id_localisation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_id_bus_fkey" FOREIGN KEY ("id_bus") REFERENCES "Bus"("id_bus") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_id_line_fkey" FOREIGN KEY ("id_line") REFERENCES "Line"("id_line") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_id_localisation_fkey" FOREIGN KEY ("id_localisation") REFERENCES "Localisation"("id_localisation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stop" ADD CONSTRAINT "Stop_id_line_fkey" FOREIGN KEY ("id_line") REFERENCES "Line"("id_line") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stop" ADD CONSTRAINT "Stop_id_localisation_fkey" FOREIGN KEY ("id_localisation") REFERENCES "Localisation"("id_localisation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signal" ADD CONSTRAINT "Signal_id_population_fkey" FOREIGN KEY ("id_population") REFERENCES "Population"("id_population") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signal" ADD CONSTRAINT "Signal_id_quarter_fkey" FOREIGN KEY ("id_quarter") REFERENCES "Quarter"("id_quarter") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_id_quarter_fkey" FOREIGN KEY ("id_quarter") REFERENCES "Quarter"("id_quarter") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_id_quarter_fkey" FOREIGN KEY ("id_quarter") REFERENCES "Quarter"("id_quarter") ON DELETE RESTRICT ON UPDATE CASCADE;
