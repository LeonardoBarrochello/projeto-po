-- CreateTable
CREATE TABLE "Dispositivo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "marca" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Localizacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_dispositivo" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Localizacao_id_dispositivo_fkey" FOREIGN KEY ("id_dispositivo") REFERENCES "Dispositivo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_codigo_key" ON "Dispositivo"("codigo");
