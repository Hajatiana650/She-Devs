-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('ALLER', 'RETOUR');

-- AlterTable
ALTER TABLE "Stop" ADD COLUMN     "direction" "Direction" NOT NULL DEFAULT 'ALLER';
