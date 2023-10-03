-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('ADMINISTRADOR', 'USUARIO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailConfirmado" BOOLEAN NOT NULL DEFAULT false,
    "senha" TEXT,
    "assasId" TEXT,
    "cargo" "Cargo" NOT NULL DEFAULT 'USUARIO',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area_CasoClinico" (
    "id" SERIAL NOT NULL,
    "areaId" INTEGER NOT NULL,
    "casoClinicoId" INTEGER NOT NULL,

    CONSTRAINT "Area_CasoClinico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasoClinico" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "CasoClinico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestaoObjetiva" (
    "id" SERIAL NOT NULL,
    "enunciado" TEXT NOT NULL,
    "casoClinicoId" INTEGER NOT NULL,

    CONSTRAINT "QuestaoObjetiva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alternativa" (
    "id" SERIAL NOT NULL,
    "enunciado" TEXT NOT NULL,
    "correta" BOOLEAN NOT NULL DEFAULT false,
    "questaoId" INTEGER NOT NULL,

    CONSTRAINT "Alternativa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RespostaObjetiva" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "questaoId" INTEGER NOT NULL,
    "alternativaId" INTEGER NOT NULL,
    "correto" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RespostaObjetiva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "questaoId" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Area_CasoClinico" ADD CONSTRAINT "Area_CasoClinico_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area_CasoClinico" ADD CONSTRAINT "Area_CasoClinico_casoClinicoId_fkey" FOREIGN KEY ("casoClinicoId") REFERENCES "CasoClinico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestaoObjetiva" ADD CONSTRAINT "QuestaoObjetiva_casoClinicoId_fkey" FOREIGN KEY ("casoClinicoId") REFERENCES "CasoClinico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alternativa" ADD CONSTRAINT "Alternativa_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "QuestaoObjetiva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespostaObjetiva" ADD CONSTRAINT "RespostaObjetiva_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespostaObjetiva" ADD CONSTRAINT "RespostaObjetiva_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "QuestaoObjetiva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespostaObjetiva" ADD CONSTRAINT "RespostaObjetiva_alternativaId_fkey" FOREIGN KEY ("alternativaId") REFERENCES "Alternativa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "QuestaoObjetiva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
