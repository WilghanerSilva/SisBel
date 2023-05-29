/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Servicos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cateogira` to the `Servicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publico` to the `Servicos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servicos" ADD COLUMN     "cateogira" TEXT NOT NULL,
ADD COLUMN     "publico" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Servicos_nome_key" ON "Servicos"("nome");
