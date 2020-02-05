using System;

namespace ConsoleApp2
{
  public class Program
  {
    public static string name = "Flintstone";		//basic string declaration
    public static int favNumber;

    public static void Main()
    {
      favNumber = 13;
      var message = string.Format("{0} fav number is {1}", name, favNumber);		//via string
      Console.WriteLine(message);
      Console.WriteLine("{0} fav number is {1}", name, favNumber);								//via Console
      Console.ReadLine();
    }
  }
}
