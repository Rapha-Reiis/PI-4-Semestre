-- CreateTable
CREATE TABLE "public"."Games" (
    "id" SERIAL NOT NULL,
    "rawg_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "cover_url" TEXT NOT NULL,
    "rawg_rating_avg" INTEGER NOT NULL,
    "metacritc" INTEGER NOT NULL,
    "last_synced_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Games_slug_key" ON "public"."Games"("slug");
