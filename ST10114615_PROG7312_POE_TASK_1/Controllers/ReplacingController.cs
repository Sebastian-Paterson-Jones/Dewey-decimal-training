using ST10114615_PROG7312_POE_TASK_1.Models;
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

        // GET: Replacing
        [HttpGet]
        public JsonResult GetReplacementBooks()
        {
            List<Book> BooksList = generateRandomBooks(10);

            

            return BooksList;
        }

        private List<Book> generateRandomBooks(int size)
        {
            List<Book> res = new List<Book>();

            for(int i=0; i<10; i++)
            {
                res.Add(Book.generateRandomBook());
            }

            return res;
        }
    }
}