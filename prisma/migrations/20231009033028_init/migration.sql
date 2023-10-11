-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('ADMINISTRADOR_MESTRE', 'ADMINISTRADOR', 'MODERADOR', 'USUARIO');

-- CreateEnum
CREATE TYPE "TipoTicket" AS ENUM ('DUVIDA', 'ERRO', 'SUGESTAO');

-- CreateEnum
CREATE TYPE "TipoQuestao" AS ENUM ('OBJETIVA', 'DISCURSIVA');

-- CreateEnum
CREATE TYPE "TipoVoto" AS ENUM ('POSITIVO', 'NEGATIVO');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "imagem" TEXT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailConfirmado" BOOLEAN NOT NULL DEFAULT false,
    "senha" TEXT,
    "assasId" TEXT,
    "cargo" "Cargo" NOT NULL DEFAULT 'USUARIO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubArea" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "areaId" INTEGER NOT NULL,

    CONSTRAINT "SubArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area_CasoClinico" (
    "id" SERIAL NOT NULL,
    "areaId" INTEGER NOT NULL,
    "casoClinicoId" INTEGER NOT NULL,

    CONSTRAINT "Area_CasoClinico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasoClinico_SubArea" (
    "id" SERIAL NOT NULL,
    "casoClinicoId" INTEGER NOT NULL,
    "subAreaId" INTEGER NOT NULL,

    CONSTRAINT "CasoClinico_SubArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasoClinico" (
    "id" SERIAL NOT NULL,
    "enunciado" TEXT NOT NULL,

    CONSTRAINT "CasoClinico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questao" (
    "id" SERIAL NOT NULL,
    "enunciado" TEXT NOT NULL,
    "casoClinicoId" INTEGER NOT NULL,
    "tipo" "TipoQuestao" NOT NULL,

    CONSTRAINT "Questao_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Resposta" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "questaoId" INTEGER,
    "alternativaId" INTEGER NOT NULL,
    "correto" BOOLEAN NOT NULL DEFAULT false,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" "TipoQuestao" NOT NULL,
    "resposta" TEXT,

    CONSTRAINT "Resposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostagemForum" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "questaoId" INTEGER,
    "comentario" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizao" TIMESTAMP(3) NOT NULL,
    "respostaParaId" INTEGER,

    CONSTRAINT "PostagemForum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VotoPostagem" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "postagemId" INTEGER NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizao" TIMESTAMP(3) NOT NULL,
    "tipo" "TipoVoto" NOT NULL,

    CONSTRAINT "VotoPostagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "questaoId" INTEGER,
    "comentario" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Denucia" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "usuarioDenuciadoId" INTEGER NOT NULL,
    "postagemId" INTEGER,
    "comentario" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Denucia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questao_Simulado" (
    "id" SERIAL NOT NULL,
    "questaoId" INTEGER NOT NULL,
    "simuladoId" INTEGER NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questao_Simulado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Simulado" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Simulado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questao_CadernoQuestoes" (
    "id" SERIAL NOT NULL,
    "questaoId" INTEGER NOT NULL,
    "cadernoQuestoesId" INTEGER NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questao_CadernoQuestoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CadernoQuestoes" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CadernoQuestoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recorrecao" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "questaoId" INTEGER,
    "comentario" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recorrecao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON "Account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_token_key" ON "VerificationRequest"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON "VerificationRequest"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubArea" ADD CONSTRAINT "SubArea_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area_CasoClinico" ADD CONSTRAINT "Area_CasoClinico_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area_CasoClinico" ADD CONSTRAINT "Area_CasoClinico_casoClinicoId_fkey" FOREIGN KEY ("casoClinicoId") REFERENCES "CasoClinico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasoClinico_SubArea" ADD CONSTRAINT "CasoClinico_SubArea_casoClinicoId_fkey" FOREIGN KEY ("casoClinicoId") REFERENCES "CasoClinico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasoClinico_SubArea" ADD CONSTRAINT "CasoClinico_SubArea_subAreaId_fkey" FOREIGN KEY ("subAreaId") REFERENCES "SubArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questao" ADD CONSTRAINT "Questao_casoClinicoId_fkey" FOREIGN KEY ("casoClinicoId") REFERENCES "CasoClinico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alternativa" ADD CONSTRAINT "Alternativa_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_alternativaId_fkey" FOREIGN KEY ("alternativaId") REFERENCES "Alternativa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostagemForum" ADD CONSTRAINT "PostagemForum_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostagemForum" ADD CONSTRAINT "PostagemForum_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostagemForum" ADD CONSTRAINT "PostagemForum_respostaParaId_fkey" FOREIGN KEY ("respostaParaId") REFERENCES "PostagemForum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VotoPostagem" ADD CONSTRAINT "VotoPostagem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VotoPostagem" ADD CONSTRAINT "VotoPostagem_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "PostagemForum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denucia" ADD CONSTRAINT "Denucia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denucia" ADD CONSTRAINT "Denucia_usuarioDenuciadoId_fkey" FOREIGN KEY ("usuarioDenuciadoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denucia" ADD CONSTRAINT "Denucia_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "PostagemForum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questao_Simulado" ADD CONSTRAINT "Questao_Simulado_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questao_Simulado" ADD CONSTRAINT "Questao_Simulado_simuladoId_fkey" FOREIGN KEY ("simuladoId") REFERENCES "Simulado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Simulado" ADD CONSTRAINT "Simulado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questao_CadernoQuestoes" ADD CONSTRAINT "Questao_CadernoQuestoes_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questao_CadernoQuestoes" ADD CONSTRAINT "Questao_CadernoQuestoes_cadernoQuestoesId_fkey" FOREIGN KEY ("cadernoQuestoesId") REFERENCES "CadernoQuestoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CadernoQuestoes" ADD CONSTRAINT "CadernoQuestoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recorrecao" ADD CONSTRAINT "Recorrecao_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
