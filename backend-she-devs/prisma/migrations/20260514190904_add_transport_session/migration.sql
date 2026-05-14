-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('WAITING', 'ACTIVE', 'FINISHED', 'CANCELLED');

-- CreateTable
CREATE TABLE "TransportSession" (
    "id_session" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3),
    "direction" "Direction" NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'WAITING',
    "id_bus" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransportSession_pkey" PRIMARY KEY ("id_session")
);

-- AddForeignKey
ALTER TABLE "TransportSession" ADD CONSTRAINT "TransportSession_id_bus_fkey" FOREIGN KEY ("id_bus") REFERENCES "Bus"("id_bus") ON DELETE RESTRICT ON UPDATE CASCADE;
