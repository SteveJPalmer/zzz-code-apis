USE [MyDatabase]
GO
/****** Object:  Table [dbo].[Dept]    Script Date: 15/05/2018 23:56:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dept](
	[DeptID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](20) NOT NULL,
	[City] [varchar](30) NOT NULL,
 CONSTRAINT [PK_Dept] PRIMARY KEY CLUSTERED 
(
	[DeptID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Emp]    Script Date: 15/05/2018 23:56:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Emp](
	[EmpID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](30) NOT NULL,
	[Surname] [varchar](30) NOT NULL,
	[Age] [smallint] NULL,
	[IsPet] [char](1) NULL,
	[Dept] [int] NOT NULL,
 CONSTRAINT [PK_Emp] PRIMARY KEY CLUSTERED 
(
	[EmpID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Dept] ADD  CONSTRAINT [DF_Dept_City]  DEFAULT ('London') FOR [City]
GO
ALTER TABLE [dbo].[Emp] ADD  CONSTRAINT [DF_Emp_IsPet]  DEFAULT ('Y') FOR [IsPet]
GO
ALTER TABLE [dbo].[Emp]  WITH CHECK ADD  CONSTRAINT [FK_Emp_Dept] FOREIGN KEY([Dept])
REFERENCES [dbo].[Dept] ([DeptID])
GO
ALTER TABLE [dbo].[Emp] CHECK CONSTRAINT [FK_Emp_Dept]
GO
