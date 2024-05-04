/*
  Warnings:

  - The primary key for the `Hour` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `project_id` on the `Hour` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Hour] DROP CONSTRAINT [Hour_project_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[Hour] DROP CONSTRAINT [Hour_pkey];
ALTER TABLE [dbo].[Hour] DROP COLUMN [project_id];
ALTER TABLE [dbo].[Hour] ADD CONSTRAINT Hour_pkey PRIMARY KEY CLUSTERED ([user_id],[date]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
