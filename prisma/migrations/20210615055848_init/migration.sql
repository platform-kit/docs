-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('text', 'audio', 'video', 'link', 'iframe');

-- CreateEnum
CREATE TYPE "PricingInterval" AS ENUM ('day', 'week', 'month', 'year');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "email" TEXT,
    "oauth_id" TEXT NOT NULL,
    "name" TEXT,
    "stripeId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
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
CREATE TABLE "ContentItem" (
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
CREATE TABLE "Product" (
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
CREATE TABLE "SubscriptionPlan" (
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
CREATE TABLE "AnalyticEvents" (
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
CREATE UNIQUE INDEX "User.uuid_unique" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User.oauth_id_unique" ON "User"("oauth_id");

-- CreateIndex
CREATE UNIQUE INDEX "User.stripeId_unique" ON "User"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "Page.uuid_unique" ON "Page"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ContentItem.uuid_unique" ON "ContentItem"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Product.uuid_unique" ON "Product"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Product.stripeId_unique" ON "Product"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan.uuid_unique" ON "SubscriptionPlan"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan.stripeId_unique" ON "SubscriptionPlan"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "AnalyticEvents.uuid_unique" ON "AnalyticEvents"("uuid");

-- AddForeignKey
ALTER TABLE "Page" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentItem" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentItem" ADD FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionPlan" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalyticEvents" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
