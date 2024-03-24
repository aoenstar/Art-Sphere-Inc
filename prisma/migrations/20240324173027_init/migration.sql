BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [user_id] INT NOT NULL IDENTITY(1,1),
    [firstname] NVARCHAR(1000) NOT NULL,
    [lastname] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [age_group] NVARCHAR(1000),
    [zipcode] INT,
    [gender] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [User_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [profile_picture] NVARCHAR(1000),
    [hours_goal] INT,
    [last_active] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([user_id])
);

-- CreateTable
CREATE TABLE [dbo].[Project] (
    [project_id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [continent] NVARCHAR(1000) NOT NULL,
    [completion_date] DATETIME2,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Project_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [owner_id] INT NOT NULL,
    CONSTRAINT [Project_pkey] PRIMARY KEY CLUSTERED ([project_id])
);

-- CreateTable
CREATE TABLE [dbo].[UsersOnProjects] (
    [user_id] INT NOT NULL,
    [project_id] INT NOT NULL,
    CONSTRAINT [UsersOnProjects_pkey] PRIMARY KEY CLUSTERED ([user_id],[project_id])
);

-- CreateTable
CREATE TABLE [dbo].[Hour] (
    [user_id] INT NOT NULL,
    [project_id] INT NOT NULL,
    [hours] INT NOT NULL,
    [date] DATETIME2 NOT NULL CONSTRAINT [Hour_date_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Hour_pkey] PRIMARY KEY CLUSTERED ([user_id],[project_id])
);

-- CreateTable
CREATE TABLE [dbo].[Question] (
    [question_id] INT NOT NULL IDENTITY(1,1),
    [project_id] INT NOT NULL,
    [question] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000),
    [status] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Question_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Question_pkey] PRIMARY KEY CLUSTERED ([question_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Project] ADD CONSTRAINT [Project_owner_id_fkey] FOREIGN KEY ([owner_id]) REFERENCES [dbo].[User]([user_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UsersOnProjects] ADD CONSTRAINT [UsersOnProjects_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UsersOnProjects] ADD CONSTRAINT [UsersOnProjects_project_id_fkey] FOREIGN KEY ([project_id]) REFERENCES [dbo].[Project]([project_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Hour] ADD CONSTRAINT [Hour_project_id_fkey] FOREIGN KEY ([project_id]) REFERENCES [dbo].[Project]([project_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Hour] ADD CONSTRAINT [Hour_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Question] ADD CONSTRAINT [Question_project_id_fkey] FOREIGN KEY ([project_id]) REFERENCES [dbo].[Project]([project_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
