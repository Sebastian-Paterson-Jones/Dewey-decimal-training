using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ST10114615_PROG7312_POE_TASK_1.Models
{
    public class Book
    {
        private static Random rand = new Random();

        public int bookID { get; set; }
        public string bookTitle { get; set; }
        public string bookAuthorLastName { get; set; }
        public string bookAuthorFirstName { get; set; }
        public int classNum { get; set; }
        public int subjectNum { get; set; }
        public string callNumber { get; set; }

        public static Book generateRandomBook()
        {
            Book book = new Book();
            book.bookAuthorFirstName = generateRandomFirstname();
            book.bookAuthorLastName = generateRandomSurname();
            book.classNum = generateRandomClassNum();
            book.subjectNum = generateRandomSubjectNum();
            book.callNumber = $"{book.classNum}.{book.subjectNum} {book.bookAuthorLastName.Substring(0, 3).ToUpper()}";

            return book;
        }

        private static string generateRandomSurname()
        {
            string[] surnames ={"johnson", "michel", "wild", 
                                "frank", "barnard", "burgess",
                                "viljoen", "carlos", "kemper"};

            return surnames[getRandomInt(9) - 1];
        }

        private static string generateRandomFirstname()
        {
            string[] firstnames ={"james", "sebastian", "jared",
                                "keegan", "adam", "carla",
                                "kate", "carlton", "john"};

            return firstnames[getRandomInt(9) - 1];
        }

        private static int generateRandomClassNum()
        {
            return ((getRandomInt(10)-1) * 100) + getRandomInt(100)-1;
        }

        private static int generateRandomSubjectNum()
        {
            return getRandomInt(10000)-1;
        }

        private static int getRandomInt(int range)
        {
            return rand.Next(1, range);
        }

        public override string ToString()
        {
            return callNumber;
        }

        public static bool operator ==(Book left, Book right)
        {
            return left.ToString().Equals(right.ToString());
        }

        public static bool operator !=(Book left, Book right)
        {
            return !left.ToString().Equals(right.ToString());
        }

        public static bool operator <(Book left, Book right)
        {
            int test = String.Compare(left.ToString(), right.ToString(), comparisonType: StringComparison.Ordinal);
            return test < 0;
        }

        public static bool operator >(Book left, Book right)
        {
            int test = String.Compare(left.ToString(), right.ToString(), comparisonType: StringComparison.Ordinal);
            return test > 0;
        }
    }
}