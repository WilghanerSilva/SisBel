/*
  Warnings:

  - You are about to drop the column `cateogira` on the `Servicos` table. All the data in the column will be lost.
  - Added the required column `categoria` to the `Servicos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servicos" DROP COLUMN "cateogira",
ADD COLUMN     "categoria" TEXT NOT NULL;
