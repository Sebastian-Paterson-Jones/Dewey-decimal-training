using ST10114615_PROG7312_POE_TASK_1.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ST10114615_PROG7312_POE_TASK_1.Controllers
{
    public class FindingController : Controller
    {
        private DeweyTree tree = new DeweyTree("parent", "root node");


        // GET: Finding
        public ActionResult Index()
        {
            return View();
        }
    }
}