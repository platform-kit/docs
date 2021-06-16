-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('text', 'audio', 'video', 'link', 'iframe');

-- CreateEnum
CREATE TYPE "PricingInterval" AS ENUM ('day', 'week', 'month', 'year');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "email" TEXT,
    "oauth_id" TEXT NOT NULL,
    "name" TEXT,
    "stripeId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "json" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_items" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contentType" "ContentType" NOT NULL DEFAULT E'text',
    "thumbnail" TEXT,
    "cover" TEXT,
    "content" TEXT NOT NULL,
    "contentPreview" TEXT NOT NULL,
    "excerpt" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "json" JSONB NOT NULL,
    "subscriptionPlanId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price_usd" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,
    "stripeId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_plans" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price_usd" INTEGER NOT NULL,
    "interval" "PricingInterval" NOT NULL DEFAULT E'month',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,
    "stripeId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytic_events" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "userId" INTEGER,
    "json" JSONB,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.uuid_unique" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users.oauth_id_unique" ON "users"("oauth_id");

-- CreateIndex
CREATE UNIQUE INDEX "users.stripeId_unique" ON "users"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "pages.uuid_unique" ON "pages"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "content_items.uuid_unique" ON "content_items"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "products.uuid_unique" ON "products"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "products.stripeId_unique" ON "products"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_plans.uuid_unique" ON "subscription_plans"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_plans.stripeId_unique" ON "subscription_plans"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "analytic_events.uuid_unique" ON "analytic_events"("uuid");

-- AddForeignKey
ALTER TABLE "pages" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_items" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_items" ADD FOREIGN KEY ("subscriptionPlanId") REFERENCES "subscription_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_plans" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytic_events" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
