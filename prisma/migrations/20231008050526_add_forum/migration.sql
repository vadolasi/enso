/*
  Warnings:

  - You are about to drop the `Comentario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_questaoId_fkey";

-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_usuarioId_fkey";

-- DropTable
DROP TABLE "Comentario";

-- CreateTable
CREATE TABLE "PostagemForum" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "questaoId" INTEGER,
    "comentario" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizao" TIMESTAMP(3) NOT NULL,
    "replyToId" INTEGER,

    CONSTRAINT "PostagemForum_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostagemForum" ADD CONSTRAINT "PostagemForum_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostagemForum" ADD CONSTRAINT "PostagemForum_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "QuestaoObjetiva"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostagemForum" ADD CONSTRAINT "PostagemForum_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "PostagemForum"("id") ON DELETE SET NULL ON UPDATE CASCADE;
