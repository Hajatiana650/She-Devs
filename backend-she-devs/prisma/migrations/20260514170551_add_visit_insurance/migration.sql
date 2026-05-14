-- CreateEnum
CREATE TYPE "VisitType" AS ENUM ('TECHNICAL_VISIT', 'INSURANCE');

-- CreateEnum
CREATE TYPE "VisitResult" AS ENUM ('APTE', 'INAPTE');

-- CreateTable
CREATE TABLE "VisitInsurance" (
    "id" SERIAL NOT NULL,
    "busId" INTEGER NOT NULL,
    "visitType" "VisitType" NOT NULL,
    "result" "VisitResult" NOT NULL,
    "dateVisit" TIMESTAMP(3) NOT NULL,
    "dateLimit" TIMESTAMP(3) NOT NULL,
    "observation" TEXT,
    "attachment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisitInsurance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisitInsurance" ADD CONSTRAINT "VisitInsurance_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id_bus") ON DELETE RESTRICT ON UPDATE CASCADE;
