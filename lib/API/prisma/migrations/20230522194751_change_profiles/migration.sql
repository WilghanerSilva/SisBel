/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ServicesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "_ServicesToUser" DROP CONSTRAINT "_ServicesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServicesToUser" DROP CONSTRAINT "_ServicesToUser_B_fkey";

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "Services";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_ServicesToUser";

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "perfil" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "perfil" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "perfil" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agendamentos" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "clienteId" TEXT,

    CONSTRAINT "Agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servicos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FuncionarioToServicos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FuncionarioToServicos_AB_unique" ON "_FuncionarioToServicos"("A", "B");

-- CreateIndex
CREATE INDEX "_FuncionarioToServicos_B_index" ON "_FuncionarioToServicos"("B");

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FuncionarioToServicos" ADD CONSTRAINT "_FuncionarioToServicos_A_fkey" FOREIGN KEY ("A") REFERENCES "Funcionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FuncionarioToServicos" ADD CONSTRAINT "_FuncionarioToServicos_B_fkey" FOREIGN KEY ("B") REFERENCES "Servicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
