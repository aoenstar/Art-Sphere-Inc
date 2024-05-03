/*
  Warnings:

  - The primary key for the `Hour` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Hour] DROP CONSTRAINT [Hour_pkey];
ALTER TABLE [dbo].[Hour] ADD CONSTRAINT Hour_pkey PRIMARY KEY CLUSTERED ([user_id],[project_id],[date]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
