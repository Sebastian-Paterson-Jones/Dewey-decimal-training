using ST10114615_PROG7312_POE_TASK_1.Models;
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
        // entity place holder
        DeweyDecimalTrainingEntities1 entities;


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

        // POST: submit sort time
        [HttpPost]
        public JsonResult submitTime(SortTime sortedTime)
        {
            Dictionary<string, string> resp = new Dictionary<string, string>();
            int index;

            using (entities = new DeweyDecimalTrainingEntities1())
            { 
                try
                {
                    entities.SortTimes.Add(sortedTime);
                    entities.SaveChanges();
                    index = entities.SortTimes.OrderBy(i => i.Time).ToList().IndexOf(sortedTime);
                } catch
                {
                    resp.Add("msg", "an error occured while submittig time");
                    return Json(resp);
                }
            }

            resp.Add("msg", "successfully submitted time");
            resp.Add("index", ""+(index+1));

            return Json(resp);
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