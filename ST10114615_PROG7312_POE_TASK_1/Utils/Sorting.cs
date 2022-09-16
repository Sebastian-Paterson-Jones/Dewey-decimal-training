using ST10114615_PROG7312_POE_TASK_1.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ST10114615_PROG7312_POE_TASK_1.Utils
{
    public static class Sorting
    {
        /// <summary>
        /// Sorts Books by call number
        /// </summary>
        /// <param name="list">List to be sorted</param>
        public static void sort(List<Book> list)
        {
            quickSort(list, 0, list.Count()-1);
        }

        public static bool isSorted(List<Book> list)
        {
            List<Book> temp = list.ToArray().ToList();
            quickSort(temp, 0, temp.Count-1);
            return temp.SequenceEqual(list);
        }

        // Quicksort code adapted from from https://www.geeksforgeeks.org/quick-sort/

        private static int Partition(List<Book> arr, int low, int high)
        {
            Book pivot = arr[low];
            while (true)
            {
                while (arr[low] < pivot)
                {
                    low++;
                }
                while (arr[high] > pivot)
                {
                    high--;
                }
                if (low < high)
                {
                    Book temp = arr[high];
                    arr[high] = arr[low];
                    arr[low] = temp;
                }
                else
                {
                    return high;
                }
            }
        }
        private static void quickSort(List<Book> arr, int low, int high)
        {
            if (low < high)
            {
                int pivot = Partition(arr, low, high);

                if (pivot > 1)
                {
                    quickSort(arr, low, pivot - 1);
                }
                if (pivot + 1 < high)
                {
                    quickSort(arr, pivot + 1, high);
                }
            }
        }
    }
}