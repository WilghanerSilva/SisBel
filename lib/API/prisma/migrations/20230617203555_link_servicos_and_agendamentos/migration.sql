/*
  Warnings:

  - Added the required column `servicoId` to the `Agendamentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamentos" ADD COLUMN     "servicoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
