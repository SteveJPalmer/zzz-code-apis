using System;
using System.Collections.Generic;

namespace ConsoleApp1
{
  public class Program
  {
    public static void Main()
    {
      IList<int> intList = new List<int>();
      intList.Add(10);
      intList.Add(20);
      intList.Add(30);
      intList.Add(40);

      Console.WriteLine(intList.Count);

      foreach (var el in intList)
        Console.WriteLine(el);

      IList<string> strList = new List<string>();
      strList.Add("one");
      strList.Add("two");
      strList.Add("three");
      strList.Add("four");
      strList.Add("four");
      strList.Add(null);
      strList.Add(null);

      Console.WriteLine(strList.Count);

      IList<Student> studentList = new List<Student>();
      studentList.Add(new Student());
      studentList.Add(new Student());
      studentList.Add(new Student());

      Console.WriteLine(studentList.Count);


      IList<int> intList1 = new List<int>();
      intList1.Add(10);
      intList1.Add(20);
      intList1.Add(30);
      intList1.Add(40);

      List<int> intList2 = new List<int>();

      intList2.AddRange(intList1);

      Console.WriteLine(intList2.Count);
 
      intList2.ForEach(el => Console.WriteLine(el));

      Console.ReadLine();
    }

  }

  public class Student
  {  //to be implemented 
  }


}
