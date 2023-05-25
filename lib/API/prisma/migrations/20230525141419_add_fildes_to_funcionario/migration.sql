/*
  Warnings:

  - Added the required column `dataNascimento` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Funcionario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Funcionario" ADD COLUMN     "dataNascimento" TEXT NOT NULL,
ADD COLUMN     "endereco" TEXT NOT NULL;
