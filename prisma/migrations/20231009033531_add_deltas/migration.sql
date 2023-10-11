/*
  Warnings:

  - Added the required column `enunciadoDelta` to the `Alternativa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enunciadoDelta` to the `CasoClinico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enunciadoDelta` to the `Questao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alternativa" ADD COLUMN     "enunciadoDelta" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CasoClinico" ADD COLUMN     "enunciadoDelta" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Questao" ADD COLUMN     "enunciadoDelta" TEXT NOT NULL;
