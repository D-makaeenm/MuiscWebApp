USE [master]
GO

/****** Object:  Database [WebMusic]    Script Date: 23/06/2024 8:29:14 SA ******/
CREATE DATABASE [WebMusic]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'WebMusic', FILENAME = N'D:\Code\SQLSever\MSSQL16.MSSQLSERVER\MSSQL\DATA\WebMusic.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'WebMusic_log', FILENAME = N'D:\Code\SQLSever\MSSQL16.MSSQLSERVER\MSSQL\DATA\WebMusic_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [WebMusic].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [WebMusic] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [WebMusic] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [WebMusic] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [WebMusic] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [WebMusic] SET ARITHABORT OFF 
GO

ALTER DATABASE [WebMusic] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [WebMusic] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [WebMusic] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [WebMusic] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [WebMusic] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [WebMusic] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [WebMusic] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [WebMusic] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [WebMusic] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [WebMusic] SET  ENABLE_BROKER 
GO

ALTER DATABASE [WebMusic] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [WebMusic] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [WebMusic] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [WebMusic] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [WebMusic] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [WebMusic] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [WebMusic] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [WebMusic] SET RECOVERY FULL 
GO

ALTER DATABASE [WebMusic] SET  MULTI_USER 
GO

ALTER DATABASE [WebMusic] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [WebMusic] SET DB_CHAINING OFF 
GO

ALTER DATABASE [WebMusic] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [WebMusic] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [WebMusic] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [WebMusic] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO

ALTER DATABASE [WebMusic] SET QUERY_STORE = ON
GO

ALTER DATABASE [WebMusic] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO

ALTER DATABASE [WebMusic] SET  READ_WRITE 
GO




USE [WebMusic]
GO

/****** Object:  Table [dbo].[BaiHat]    Script Date: 23/06/2024 8:24:08 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[BaiHat](
	[BaiHatID] [int] IDENTITY(1,1) NOT NULL,
	[TenBaiHat] [nvarchar](100) NOT NULL,
	[CaSi] [nvarchar](100) NULL,
	[FilePath] [nvarchar](255) NOT NULL,
	[ImagePath] [nvarchar](255) NULL,
	[UserID] [int] NULL,
	[DatePosted] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[BaiHatID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[BaiHat] ADD  DEFAULT (getdate()) FOR [DatePosted]
GO

ALTER TABLE [dbo].[BaiHat]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO

USE [WebMusic]
GO

/****** Object:  Table [dbo].[BaiHat_ChuDe]    Script Date: 23/06/2024 8:24:22 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[BaiHat_ChuDe](
	[BaiHatID] [int] NOT NULL,
	[ChuDeID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[BaiHatID] ASC,
	[ChuDeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[BaiHat_ChuDe]  WITH CHECK ADD FOREIGN KEY([BaiHatID])
REFERENCES [dbo].[BaiHat] ([BaiHatID])
GO

ALTER TABLE [dbo].[BaiHat_ChuDe]  WITH CHECK ADD FOREIGN KEY([ChuDeID])
REFERENCES [dbo].[ChuDe] ([ChuDeID])
GO

USE [WebMusic]
GO

/****** Object:  Table [dbo].[ChuDe]    Script Date: 23/06/2024 8:24:35 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ChuDe](
	[ChuDeID] [int] IDENTITY(1,1) NOT NULL,
	[TenChuDe] [nvarchar](100) NOT NULL,
	[Imagepath] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ChuDeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

USE [WebMusic]
GO

/****** Object:  Table [dbo].[feedback]    Script Date: 23/06/2024 8:24:41 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[feedback](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NOT NULL,
	[feedbackType] [nvarchar](255) NOT NULL,
	[description] [text] NOT NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[feedback] ADD  DEFAULT (getdate()) FOR [created_at]
GO

USE [WebMusic]
GO

/****** Object:  Table [dbo].[Playlist]    Script Date: 23/06/2024 8:24:48 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Playlist](
	[PlaylistID] [int] IDENTITY(1,1) NOT NULL,
	[TenPlaylist] [nvarchar](100) NOT NULL,
	[UserID] [int] NULL,
	[DateCreated] [datetime] NULL,
	[ImagePath] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[PlaylistID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Playlist] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO

ALTER TABLE [dbo].[Playlist]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO

USE [WebMusic]
GO

/****** Object:  Table [dbo].[Playlist_Song]    Script Date: 23/06/2024 8:24:54 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Playlist_Song](
	[PlaylistID] [int] NOT NULL,
	[BaiHatID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PlaylistID] ASC,
	[BaiHatID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Playlist_Song]  WITH CHECK ADD FOREIGN KEY([BaiHatID])
REFERENCES [dbo].[BaiHat] ([BaiHatID])
GO

ALTER TABLE [dbo].[Playlist_Song]  WITH CHECK ADD FOREIGN KEY([PlaylistID])
REFERENCES [dbo].[Playlist] ([PlaylistID])
GO

USE [WebMusic]
GO

/****** Object:  Table [dbo].[Song_Liked]    Script Date: 23/06/2024 8:25:00 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Song_Liked](
	[UserID] [int] NOT NULL,
	[BaiHatID] [int] NOT NULL,
	[DateAdded] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC,
	[BaiHatID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Song_Liked] ADD  DEFAULT (getdate()) FOR [DateAdded]
GO

ALTER TABLE [dbo].[Song_Liked]  WITH CHECK ADD FOREIGN KEY([BaiHatID])
REFERENCES [dbo].[BaiHat] ([BaiHatID])
GO

ALTER TABLE [dbo].[Song_Liked]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO

USE [WebMusic]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 23/06/2024 8:25:05 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[PasswordHash] [nvarchar](255) NOT NULL,
	[DateCreated] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[add_playlists]    Script Date: 23/06/2024 8:25:18 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[add_playlists]
    @UserID INT,
    @TenPlaylist NVARCHAR(255),
    @ImagePath NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Playlist (TenPlaylist, UserID, DateCreated, ImagePath)
    VALUES (@TenPlaylist, @UserID, GETDATE(), @ImagePath);
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[add_song_to_chude]    Script Date: 23/06/2024 8:25:25 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[add_song_to_chude]
	@ChuDeID int,
	@BaiHatID int
as
begin
	INSERT INTO BaiHat_ChuDe (ChuDeID, BaiHatID) VALUES (@ChuDeID, @BaiHatID)
end
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[add_topic]    Script Date: 23/06/2024 8:25:30 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[add_topic]
	@TenChuDe NVARCHAR(100),
	@Imagepath NVARCHAR(255)
as
begin
	SET NOCOUNT ON;

    INSERT INTO ChuDe (TenChuDe, Imagepath)
    VALUES (@TenChuDe, @Imagepath);
end
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[AddSongToLiked]    Script Date: 23/06/2024 8:25:38 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AddSongToLiked]
    @UserID INT,
    @BaiHatID INT
AS
BEGIN
    DECLARE @Result INT;
    SET NOCOUNT ON;

    -- Kiểm tra nếu bài hát đã được thích trước đó
    IF NOT EXISTS (SELECT 1 FROM Song_Liked WHERE UserID = @UserID AND BaiHatID = @BaiHatID)
    BEGIN
        -- Chèn bài hát vào bảng Song_Liked
        INSERT INTO Song_Liked (UserID, BaiHatID, DateAdded)
        VALUES (@UserID, @BaiHatID, GETDATE());
        SET @Result = 0; -- Bài hát được thêm mới
    END
    ELSE
    BEGIN
        -- Nếu bài hát đã được thích trước đó, trả về 1
        SET @Result = 1; -- Bài hát đã được thích trước đó
    END

    -- Trả về kết quả
    SELECT @Result AS Result;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[AddSongToPlaylists]    Script Date: 23/06/2024 8:25:45 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AddSongToPlaylists]
    @BaiHatID INT,
    @PlaylistIDs NVARCHAR(MAX)
AS
BEGIN
    DECLARE @sql NVARCHAR(MAX)
    SET @sql = 'INSERT INTO Playlist_Song (PlaylistID, BaiHatID) SELECT value, ' + CAST(@BaiHatID AS NVARCHAR) + ' FROM STRING_SPLIT(''' + @PlaylistIDs + ''', '','')'
    EXEC(@sql)
END
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[changepassword]    Script Date: 23/06/2024 8:25:51 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[changepassword]
    @userId INT,
    @oldPassword NVARCHAR(255),
    @newPassword NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @currentPassword NVARCHAR(255);

    -- Lấy mật khẩu hiện tại của người dùng
    SELECT @currentPassword = PasswordHash
    FROM Users
    WHERE UserID = @userId;

    -- Kiểm tra mật khẩu cũ có khớp không
    IF @currentPassword = @oldPassword
    BEGIN
        -- Thay đổi mật khẩu mới
        UPDATE Users
        SET PasswordHash = @newPassword
        WHERE UserID = @userId;

        -- Trả về thông báo thành công
        SELECT 1 AS Result, 'Thay đổi mật khẩu thành công' AS Message;
    END
    ELSE
    BEGIN
        -- Trả về thông báo lỗi
        SELECT 0 AS Result, 'Mật khẩu cũ không đúng' AS Message;
    END
END
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[delete_playlist]    Script Date: 23/06/2024 8:25:56 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[delete_playlist]
	@UserID INT,
	@PlaylistID INT
as
begin
	SET NOCOUNT ON;
	DELETE FROM Playlist_Song
    WHERE PlaylistID = @PlaylistID;
	DELETE FROM Playlist
	WHERE UserID = @UserID AND PlaylistID = @PlaylistID;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[delete_song_from_chude]    Script Date: 23/06/2024 8:26:01 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[delete_song_from_chude]
    @ChuDeID int,
    @BaiHatID int
as
begin
    DELETE FROM BaiHat_ChuDe WHERE ChuDeID = @ChuDeID AND BaiHatID = @BaiHatID
end
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[deletechude]    Script Date: 23/06/2024 8:26:05 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[deletechude]
    @ChuDeID int
as
begin
    SET NOCOUNT ON;

    -- Xóa tất cả các bản ghi liên quan trong bảng BaiHat_ChuDe trước
    DELETE FROM BaiHat_ChuDe WHERE ChuDeID = @ChuDeID;

    -- Sau đó xóa chủ đề trong bảng ChuDe
    DELETE FROM ChuDe WHERE ChuDeID = @ChuDeID;
end
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[deletemusic_liked]    Script Date: 23/06/2024 8:26:11 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[deletemusic_liked]
    @UserID INT,
    @BaiHatID INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Song_Liked
    WHERE UserID = @UserID AND BaiHatID = @BaiHatID;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[deletemusic_upload]    Script Date: 23/06/2024 8:26:15 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[deletemusic_upload]
    @UserID INT,
    @BaiHatID INT
AS
BEGIN
    SET NOCOUNT ON;

	DELETE FROM Playlist_Song WHERE BaiHatID = @BaiHatID;
    DELETE FROM Song_Liked WHERE BaiHatID = @BaiHatID;
    DELETE FROM BaiHat_ChuDe WHERE BaiHatID = @BaiHatID;

    -- Sau đó, xóa bài hát từ bảng BaiHat
    DELETE FROM BaiHat WHERE UserID = @UserID AND BaiHatID = @BaiHatID;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[get_liked_song]    Script Date: 23/06/2024 8:26:20 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[get_liked_song]
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        BaiHat.BaiHatID,
        BaiHat.TenBaiHat,
        BaiHat.ImagePath,
        BaiHat.CaSi,
		BaiHat.FilePath,
        Song_Liked.DateAdded
    FROM
        Song_Liked
    INNER JOIN
        BaiHat ON Song_Liked.BaiHatID = BaiHat.BaiHatID
    WHERE
        Song_Liked.UserID = @UserID;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[get_playlists]    Script Date: 23/06/2024 8:26:26 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[get_playlists]
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
		PlaylistID,
		TenPlaylist,
		UserID,
		DateCreated,
		ImagePath
    FROM 
        Playlist
    WHERE 
        UserID = @UserID;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[get_topic]    Script Date: 23/06/2024 8:26:30 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[get_topic]
as
begin
	select * from ChuDe
end
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[get20song_lastest]    Script Date: 23/06/2024 8:26:35 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[get20song_lastest]
as
begin
	SET NOCOUNT ON;
    
    SELECT TOP 20 
        BaiHat.BaiHatID, 
        BaiHat.TenBaiHat, 
        BaiHat.ImagePath, 
        BaiHat.CaSi, 
        BaiHat.DatePosted, 
        Users.UserName,
		BaiHat.FilePath
    FROM BaiHat
    INNER JOIN Users ON BaiHat.UserID = Users.UserID
    ORDER BY BaiHat.DatePosted DESC;
end
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[getallsongs]    Script Date: 23/06/2024 8:26:40 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[getallsongs]
as
begin
	select * from BaiHat
end
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[getfeedback]    Script Date: 23/06/2024 8:26:48 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[getfeedback]
	@UserID int,
	@feedbackType NVARCHAR(255),
	@description TEXT
as
begin
	SET NOCOUNT ON;
	insert into feedback (userId,feedbackType,description) values (@UserID, @feedbackType, @description);
	SELECT 'ok' AS [Message];
end
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[GetsongbyChude]    Script Date: 23/06/2024 8:26:52 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetsongbyChude]
    @ChuDeID INT
AS
BEGIN
    SELECT 
        b.BaiHatID,
        b.TenBaiHat,
        b.CaSi,
        b.FilePath,
        b.ImagePath,
        b.DatePosted
    FROM 
        BaiHat b
        INNER JOIN BaiHat_ChuDe bc ON b.BaiHatID = bc.BaiHatID
    WHERE 
        bc.ChuDeID = @ChuDeID
    ORDER BY 
        b.DatePosted DESC;  -- Sắp xếp theo ngày đăng mới nhất
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[GetsonginPlaylist]    Script Date: 23/06/2024 8:26:58 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetsonginPlaylist]
    @PlaylistID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        ps.BaiHatID,
        s.TenBaiHat,
        s.ImagePath,
        s.DatePosted,
        s.CaSi,
        p.TenPlaylist,
		s.FilePath
    FROM 
        Playlist_Song ps
    JOIN 
        BaiHat s ON ps.BaiHatID = s.BaiHatID
    JOIN
        Playlist p ON ps.PlaylistID = p.PlaylistID
    WHERE 
        ps.PlaylistID = @PlaylistID;
END
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[GetSongsInChuDe_homepage]    Script Date: 23/06/2024 8:27:03 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetSongsInChuDe_homepage]
    @ChuDeID INT
AS
BEGIN
    SELECT 
		bh.BaiHatID,
		bh.TenBaiHat,
		bh.ImagePath,
		bh.CaSi,
		bh.FilePath
    FROM BaiHat bh
    INNER JOIN BaiHat_ChuDe bcd ON bh.BaiHatID = bcd.BaiHatID
    WHERE bcd.ChuDeID = @ChuDeID
    ORDER BY bh.DatePosted DESC
END
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[GetSongsInPlaylist_homepage]    Script Date: 23/06/2024 8:27:10 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetSongsInPlaylist_homepage]
    @PlaylistID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        BaiHat.BaiHatID, 
        BaiHat.TenBaiHat, 
        BaiHat.CaSi, 
        BaiHat.FilePath, 
        BaiHat.ImagePath
    FROM 
        Playlist_Song
    JOIN 
        BaiHat ON Playlist_Song.BaiHatID = BaiHat.BaiHatID
    WHERE 
        Playlist_Song.PlaylistID = @PlaylistID;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[Gettop3songbyChude]    Script Date: 23/06/2024 8:27:15 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Gettop3songbyChude]
    @ChuDeID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 3 
        b.BaiHatID,
        b.TenBaiHat,
        b.CaSi,
        b.FilePath,
        b.ImagePath,
        b.UserID,
        b.DatePosted
    FROM 
        BaiHat b
    INNER JOIN 
        BaiHat_ChuDe bc ON b.BaiHatID = bc.BaiHatID
    WHERE 
        bc.ChuDeID = @ChuDeID
    ORDER BY 
        b.DatePosted DESC;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[Gettop4chude]    Script Date: 23/06/2024 8:27:20 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Gettop4chude]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 4
        c.ChuDeID,
        c.TenChuDe,
        c.Imagepath,
        COUNT(bc.BaiHatID) AS SongCount
    FROM
        ChuDe c
    LEFT JOIN
        BaiHat_ChuDe bc ON c.ChuDeID = bc.ChuDeID
    GROUP BY
        c.ChuDeID, c.TenChuDe, c.Imagepath
    ORDER BY
        SongCount DESC;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[Gettop4Playlist]    Script Date: 23/06/2024 8:27:25 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Gettop4Playlist]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 4
        p.PlaylistID,
        p.TenPlaylist,
        p.UserID,
        p.ImagePath,
        p.DateCreated,
        COUNT(ps.BaiHatID) AS SongCount
    FROM
        Playlist p
    LEFT JOIN
        Playlist_Song ps ON p.PlaylistID = ps.PlaylistID
    GROUP BY
        p.PlaylistID, p.TenPlaylist, p.UserID, p.ImagePath, p.DateCreated
    ORDER BY
        SongCount DESC;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[GetTop9LatestSongs]    Script Date: 23/06/2024 8:27:30 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetTop9LatestSongs]
AS
BEGIN
    SELECT TOP 9 
        BaiHatID,
        TenBaiHat,
        CaSi,
        FilePath,
        ImagePath,
        UserID,
        CONVERT(DATE, DatePosted) AS DatePosted
    FROM 
        BaiHat
    ORDER BY 
        DatePosted DESC;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[InsertBaiHat]    Script Date: 23/06/2024 8:27:34 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[InsertBaiHat]
    @UserID INT,
    @TenBaiHat NVARCHAR(100),
    @FilePath NVARCHAR(255),
    @ImagePath NVARCHAR(255),
    @ChuDeID INT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Result INT;
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Insert into BaiHat table
        INSERT INTO BaiHat (TenBaiHat, FilePath, ImagePath, UserID, DatePosted)
        VALUES (@TenBaiHat, @FilePath, @ImagePath, @UserID, GETDATE());

        -- Get the ID of the inserted song
        DECLARE @BaiHatID INT;
        SET @BaiHatID = SCOPE_IDENTITY();

        -- Insert into BaiHat_ChuDe table
        INSERT INTO BaiHat_ChuDe (BaiHatID, ChuDeID)
        VALUES (@BaiHatID, @ChuDeID);

        COMMIT TRANSACTION;
        SET @Result = 1;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SET @Result = 0;
    END CATCH

    SELECT @Result AS returnResult;
END
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[register]    Script Date: 23/06/2024 8:27:39 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[register]
    @UserName NVARCHAR(50),
    @PasswordHash NVARCHAR(100),
    @Email NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra xem UserName đã tồn tại chưa
    IF NOT EXISTS (SELECT 1 FROM Users WHERE UserName = @UserName)
    BEGIN
        -- Nếu UserName chưa tồn tại, thêm mới vào bảng Users
        INSERT INTO Users (UserName, PasswordHash, Email)
        VALUES (@UserName, @PasswordHash, @Email);
        SELECT 'User inserted successfully.' AS [Message];
    END
    ELSE
    BEGIN
        -- Nếu UserName đã tồn tại, không thêm mới và trả về thông báo
        SELECT 'User already exists.' AS [Message];
    END
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[SearchSongs]    Script Date: 23/06/2024 8:27:43 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[SearchSongs]
    @query NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT BaiHatID, TenBaiHat, ImagePath, FilePath 
    FROM BaiHat 
    WHERE TenBaiHat LIKE '%' + @query + '%';
END
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[selectbaihatcuauser]    Script Date: 23/06/2024 8:27:48 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[selectbaihatcuauser]
    @UserID INT
AS
BEGIN
    SELECT *
    FROM BaiHat
    WHERE UserID = @UserID
    ORDER BY DatePosted DESC, CaSi DESC;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[sessionlogin]    Script Date: 23/06/2024 8:27:54 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sessionlogin]
    @UserName NVARCHAR(50),
    @Password NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Result INT;
    DECLARE @UserID INT;

    IF EXISTS (SELECT 1 FROM Users WHERE UserName = @UserName)
    BEGIN
        IF EXISTS (SELECT 1 FROM Users WHERE UserName = @UserName AND PasswordHash = @Password)
        BEGIN
            SET @Result = 1;
            SELECT @UserID = UserID FROM Users WHERE UserName = @UserName AND PasswordHash = @Password;
        END
        ELSE
        BEGIN
            SET @Result = 2;
            SET @UserID = NULL;
        END;
    END
    ELSE
    BEGIN
        SET @Result = 0;
        SET @UserID = NULL;
    END;

    SELECT @Result AS LoginResult, @UserID AS UserID;
END;
GO

USE [WebMusic]
GO

/****** Object:  StoredProcedure [dbo].[showfeedback]    Script Date: 23/06/2024 8:28:00 SA ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[showfeedback]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Users.UserName, feedback.feedbackType, feedback.description 
    FROM feedback 
    JOIN Users ON feedback.userId = Users.UserID;
END
GO

