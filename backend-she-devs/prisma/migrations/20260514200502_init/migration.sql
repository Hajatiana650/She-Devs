-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "admins" (
    "id_admin" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "rolee" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id_driver" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "permit_number" TEXT NOT NULL,
    "user_id" INTEGER,
    "bus_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id_driver")
);

-- CreateTable
CREATE TABLE "buses" (
    "id_bus" SERIAL NOT NULL,
    "bus_number" TEXT NOT NULL,
    "line_id" INTEGER NOT NULL,
    "localisation_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buses_pkey" PRIMARY KEY ("id_bus")
);

-- CreateTable
CREATE TABLE "lines" (
    "id_line" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lines_pkey" PRIMARY KEY ("id_line")
);

-- CreateTable
CREATE TABLE "localisations" (
    "id_localisation" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "localisations_pkey" PRIMARY KEY ("id_localisation")
);

-- CreateTable
CREATE TABLE "stops" (
    "id_stop" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "line_id" INTEGER NOT NULL,
    "localisation_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stops_pkey" PRIMARY KEY ("id_stop")
);

-- CreateTable
CREATE TABLE "quarters" (
    "id_quarter" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "localisation_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quarters_pkey" PRIMARY KEY ("id_quarter")
);

-- CreateTable
CREATE TABLE "populations" (
    "id_population" SERIAL NOT NULL,
    "quarter_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "populations_pkey" PRIMARY KEY ("id_population")
);

-- CreateTable
CREATE TABLE "signals" (
    "id_signal" SERIAL NOT NULL,
    "signal_status" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "location" TEXT,
    "quarter_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "signals_pkey" PRIMARY KEY ("id_signal")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id_campaign" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id_campaign")
);

-- CreateTable
CREATE TABLE "collects" (
    "id_collect" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collects_pkey" PRIMARY KEY ("id_collect")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_id_user_key" ON "admins"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_permit_number_key" ON "drivers"("permit_number");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_user_id_key" ON "drivers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_bus_id_key" ON "drivers"("bus_id");

-- CreateIndex
CREATE UNIQUE INDEX "buses_bus_number_key" ON "buses"("bus_number");

-- CreateIndex
CREATE UNIQUE INDEX "lines_name_key" ON "lines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "quarters_name_key" ON "quarters"("name");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "buses"("id_bus") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buses" ADD CONSTRAINT "buses_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "lines"("id_line") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buses" ADD CONSTRAINT "buses_localisation_id_fkey" FOREIGN KEY ("localisation_id") REFERENCES "localisations"("id_localisation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stops" ADD CONSTRAINT "stops_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "lines"("id_line") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stops" ADD CONSTRAINT "stops_localisation_id_fkey" FOREIGN KEY ("localisation_id") REFERENCES "localisations"("id_localisation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quarters" ADD CONSTRAINT "quarters_localisation_id_fkey" FOREIGN KEY ("localisation_id") REFERENCES "localisations"("id_localisation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "populations" ADD CONSTRAINT "populations_quarter_id_fkey" FOREIGN KEY ("quarter_id") REFERENCES "quarters"("id_quarter") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signals" ADD CONSTRAINT "signals_quarter_id_fkey" FOREIGN KEY ("quarter_id") REFERENCES "quarters"("id_quarter") ON DELETE SET NULL ON UPDATE CASCADE;
