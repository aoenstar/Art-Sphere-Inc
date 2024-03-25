BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Project] DROP CONSTRAINT [Project_owner_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[Project] ALTER COLUMN [owner_id] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Project] ADD CONSTRAINT [Project_owner_id_fkey] FOREIGN KEY ([owner_id]) REFERENCES [dbo].[User]([user_id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
