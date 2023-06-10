/*
  Warnings:

  - You are about to drop the column `date` on the `Agendamentos` table. All the data in the column will be lost.
  - Added the required column `data` to the `Agendamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detalhes` to the `Agendamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `Agendamentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamentos" DROP COLUMN "date",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "detalhes" TEXT NOT NULL,
ADD COLUMN     "horario" TEXT NOT NULL;
