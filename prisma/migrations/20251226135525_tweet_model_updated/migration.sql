-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "tweetId" TEXT;

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "image" TEXT,
ADD COLUMN     "imageId" TEXT,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
