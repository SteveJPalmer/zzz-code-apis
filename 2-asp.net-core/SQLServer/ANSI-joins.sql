SELECT * FROM Emp e

SELECT * FROM Dept e

-- Standard join where matching records found on both sides 
SELECT * 
FROM Emp e
INNER JOIN Dept d ON (e.Dept = d.DeptID)			-- or just JOIN

-- add Dept's with no emps (ie no emps for dept 8)
SELECT * 
FROM Emp e
RIGHT OUTER JOIN Dept d ON (e.Dept = d.DeptID)	 -- or just RIGHT JOIN

-- add Emps's with no dept
SELECT * 
FROM Emp e
LEFT OUTER JOIN Dept d ON (e.Dept = d.DeptID)		-- or just LEFT JOIN

-- outer join both sides
SELECT * 
FROM Emp e
FULL OUTER JOIN Dept d ON (e.Dept = d.DeptID)		-- or just FULL JOIN



