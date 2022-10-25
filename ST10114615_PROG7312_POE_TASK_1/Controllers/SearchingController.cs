using ST10114615_PROG7312_POE_TASK_1.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ST10114615_PROG7312_POE_TASK_1.Controllers
{
    public class SearchingController : Controller
    {
        Dictionary<String, String> callNumberDescriptions = new Dictionary<String, String>() {
            { "000", "Computer Science, Information, & General Works" },
            { "100", "Philosophy & Psychology" },
            { "200", "Religion" },
            { "300", "Social Sciences" },
            { "400", "Language" },
            { "500", "Science" },
            { "600", "Technology" },
            { "700", "Arts & Recreation" },
            { "800", "Literature" },
            { "900", "History & Geography" }
        };

        // entity place holder
        DeweyDecimalTrainingEntities2 entities;

        // GET: Searching
        public ActionResult Index()
        {
            return View();
        }

        // GET: Searching/Leaderboard
        public ActionResult Leaderboard()
        {
            List<IdentifyScore> scoreList;
            using(entities = new DeweyDecimalTrainingEntities2())
            {
                scoreList = entities.IdentifyScores.OrderByDescending(score => score.Score).ToList();
            }
            return View(scoreList);
        }

        // POST: Validate the posted call correctness
        [HttpPost]
        public JsonResult validateCallCorrectness(Dictionary<String, String> calls)
        {
            int score = 0;

            foreach(KeyValuePair<String, String> keyValuePair in calls)
            {
                if(checkCallsCorrectness(keyValuePair.Key, keyValuePair.Value)) score++;
            }

            return Json(score);
        }

        // POST: Submit score
        [HttpPost]
        public JsonResult submitScore(IdentifyScore submitScores)
        {
            Dictionary<string, string> resp = new Dictionary<string, string>();
            int index;

            using (entities = new DeweyDecimalTrainingEntities2())
            {
                try
                {
                    entities.IdentifyScores.Add(submitScores);
                    entities.SaveChanges();
                    index = entities.IdentifyScores.OrderByDescending(i => i.Score).ToList().IndexOf(submitScores);
                }
                catch (Exception err)
                {
                    resp.Add("msg", err.Message);
                    return Json(resp);
                }
            }

            JsonResult result = Json(submitScores);

            resp.Add("msg", "successfully submitted time");
            resp.Add("index", "" + (index + 1));

            return Json(resp);
        }

        private bool checkCallsCorrectness(String key, String value)
        {
            String correctKeyValue;
            callNumberDescriptions.TryGetValue(key, out correctKeyValue);
            return correctKeyValue == value;
        }
    }
}