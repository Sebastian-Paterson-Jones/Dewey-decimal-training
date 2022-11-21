using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ST10114615_PROG7312_POE_TASK_1.Models;
using ST10114615_PROG7312_POE_TASK_1.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Hosting;
using System.Web.Mvc;

namespace ST10114615_PROG7312_POE_TASK_1.Controllers
{
    public class FindingController : Controller
    {
        // local entities
        DeweyDecimalTrainingEntities2 entities;

        // GET: Finding
        public ActionResult Index()
        {       
            return View();
        }

        // Get getRandomCallNumbers
        public JsonResult getRandomCallNumbers()
        {
            TreeDataInstance data = TreeData.GetInstance();
            return Json(data.GetDeweyNumbers(4), JsonRequestBehavior.AllowGet);
        }

        // GET: Finding/Leaderboard
        public ActionResult leaderboard()
        {
            List<FindingScore> scoreList;
            using (entities = new DeweyDecimalTrainingEntities2())
            {
                scoreList = entities.FindingScores.OrderByDescending(score => score.Score).ToList();
            }
            return View(scoreList);
        }

        // POST: Submit score
        [HttpPost]
        public JsonResult submitScore(FindingScore submitScores)
        {
            Dictionary<string, string> resp = new Dictionary<string, string>();
            int index;

            using (entities = new DeweyDecimalTrainingEntities2())
            {
                try
                {
                    entities.FindingScores.Add(submitScores);
                    entities.SaveChanges();
                    index = entities.FindingScores.OrderByDescending(i => i.Score).ToList().IndexOf(submitScores);
                }
                catch (Exception err)
                {
                    resp.Add("msg", err.Message);
                    return Json(resp);
                }
            }

            JsonResult result = Json(submitScores);

            resp.Add("msg", "successfully submitted score");
            resp.Add("index", "" + (index + 1));

            return Json(resp);
        }
    }
}