USE [MyDatabase]
GO
SET IDENTITY_INSERT [dbo].[Dept] ON 
GO
INSERT [dbo].[Dept] ([DeptID], [Name], [City]) VALUES (1, N'IT', N'Bournemouth')
GO
INSERT [dbo].[Dept] ([DeptID], [Name], [City]) VALUES (2, N'HR', N'Bournemouth')
GO
INSERT [dbo].[Dept] ([DeptID], [Name], [City]) VALUES (4, N'FINANCE', N'Bournemouth')
GO
INSERT [dbo].[Dept] ([DeptID], [Name], [City]) VALUES (6, N'SALES', N'London')
GO
INSERT [dbo].[Dept] ([DeptID], [Name], [City]) VALUES (8, N'CRECHE', N'Bournemouth')
GO
SET IDENTITY_INSERT [dbo].[Dept] OFF
GO
SET IDENTITY_INSERT [dbo].[Emp] ON 
GO
INSERT [dbo].[Emp] ([EmpID], [FirstName], [Surname], [Age], [IsPet], [Dept]) VALUES (1, N'Fred', N'Flintstone', 35, N'N', 4)
GO
INSERT [dbo].[Emp] ([EmpID], [FirstName], [Surname], [Age], [IsPet], [Dept]) VALUES (2, N'Wilma', N'Flintstone', 29, N'N', 2)
GO
INSERT [dbo].[Emp] ([EmpID], [FirstName], [Surname], [Age], [IsPet], [Dept]) VALUES (4, N'Pebbles', N'Flintstone', 5, N'N', 8)
GO
INSERT [dbo].[Emp] ([EmpID], [FirstName], [Surname], [Age], [IsPet], [Dept]) VALUES (5, N'Dino', N'Flintstone', 9, N'Y', 4)
GO
INSERT [dbo].[Emp] ([EmpID], [FirstName], [Surname], [Age], [IsPet], [Dept]) VALUES (6, N'Barney', N'Rubble', 33, N'N', 1)
GO
INSERT [dbo].[Emp] ([EmpID], [FirstName], [Surname], [Age], [IsPet], [Dept]) VALUES (7, N'Betty', N'Rubble', 27, N'N', 2)
GO
INSERT [dbo].[Emp] ([EmpID], [FirstName], [Surname], [Age], [IsPet], [Dept]) VALUES (8, N'Bamm-Bamm', N'Rubble', 7, N'N', 8)
GO
INSERT [dbo].[Emp] ([EmpID], [FirstName], [Surname], [Age], [IsPet], [Dept]) VALUES (9, N'Hoppy', N'Rubble', 1, N'Y', 8)
GO
SET IDENTITY_INSERT [dbo].[Emp] OFF
GO
