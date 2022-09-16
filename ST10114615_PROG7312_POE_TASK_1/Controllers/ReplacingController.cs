﻿using ST10114615_PROG7312_POE_TASK_1.Models;
using ST10114615_PROG7312_POE_TASK_1.Utils;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ST10114615_PROG7312_POE_TASK_1.Controllers
{
    public class ReplacingController : Controller
    {
        // GET: Replacing
        public ActionResult Index()
        {
            return View();
        }

        // GET: Replacing List
        [HttpGet]
        public JsonResult GetReplacementBooks()
        {
            List<Book> BooksList = generateRandomBooks(10);

            return Json(BooksList, JsonRequestBehavior.AllowGet);
        }

        // POST: Validate order of call nums
        [HttpPost]
        public JsonResult ValidateCallOrder(List<Book> books, int timeStamp)
        {
            return Json(Sorting.isSorted(books));
        }

        private List<Book> generateRandomBooks(int size)
        {
            List<Book> res = new List<Book>();

            for(int i=0; i<size; i++)
            {
                res.Add(Book.generateRandomBook());
            }

            return res;
        }
    }
}