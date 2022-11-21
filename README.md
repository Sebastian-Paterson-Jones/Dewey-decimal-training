[![forthebadge](https://forthebadge.com/images/badges/ages-12.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-c-sharp.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)

# Dewey-decimal-training
A Dewey decimal training system. Developed for a university assignment, not a final solution

# Getting started
To configure this repo for yourself there are a few configurations needed to be made.

1. ensure that .NET MVC 5 is supported by the your .NET system.
2. Database configurations cannot be uploaded to this repo. Hence, a database will need to be implemented on your side.
3. Reconfigure the connection strings in the web.config to match your configuration.
4. A script will be provided below to create all needed tables.
5. Update entity framework models.

Database tables init script (MsSQL)
```
CREATE TABLE [dbo].[SortTime] (
    [Id]   INT           IDENTITY (1, 1) NOT NULL,
    [Time] INT           NOT NULL,
    [Name] VARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [dbo].[IdentifyScore] (
    [Id]      INT           IDENTITY (1, 1) NOT NULL,
    [Time]    INT           NOT NULL,
    [Name]    VARCHAR (255) NOT NULL,
    [Correct] INT           NOT NULL,
    [Score]   INT           NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [dbo].[FindingScore] (
    [Id]      INT           IDENTITY (1, 1) NOT NULL,
    [Time]    INT           NOT NULL,
    [Name]    VARCHAR (255) NOT NULL,
    [Correct] INT           NOT NULL,
    [Score]   INT           NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
```
