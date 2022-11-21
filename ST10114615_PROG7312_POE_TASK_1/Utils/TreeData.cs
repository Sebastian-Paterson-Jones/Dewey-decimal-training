using Newtonsoft.Json;
using ST10114615_PROG7312_POE_TASK_1.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace ST10114615_PROG7312_POE_TASK_1.Utils
{
    public sealed class TreeData
    {
        private static TreeDataInstance _instance;

        public static TreeDataInstance GetInstance()
        {
            if (_instance == null)
            {
                _instance = new TreeDataInstance();
            }
            return _instance;
        }
    }

    public class TreeDataInstance
    {
        public DeweyTree tree;
        private static Random rand = new Random();

        public TreeDataInstance()
        {
            loadData();
        }

        public List<DeweyNumber> GetDeweyNumbers(int number)
        {
            List<DeweyNumber> numbers = new List<DeweyNumber>();

            for(int i=0; i<number; i++)
            {
                DeweyNumber tmpNum = new DeweyNumber();

                int grandIndex = rand.Next(tree.children.Count);
                int parentIndex = rand.Next(tree.children[grandIndex].children.Count);
                int childIndex = rand.Next(tree.children[grandIndex].children[parentIndex].children.Count);

                tmpNum.grandDescription = tree.children[grandIndex].description;
                tmpNum.grandNumber = tree.children[grandIndex].number;
                tmpNum.parentDescription = tree.children[grandIndex].children[parentIndex].description;
                tmpNum.parentNumber = tree.children[grandIndex].children[parentIndex].number;
                tmpNum.description = tree.children[grandIndex].children[parentIndex].children[childIndex].description;
                tmpNum.number = tree.children[grandIndex].children[parentIndex].children[childIndex].number;

                numbers.Add(tmpNum);
            }

            return numbers;
        }

        private void loadData()
        {
            using (StreamReader r = new StreamReader(HostingEnvironment.MapPath("~/Content/CallNumbers.json")))
            {
                string json = r.ReadToEnd();
                // deserialize
                this.tree = JsonConvert.DeserializeObject<DeweyTree>(json);
            }
        }
    }
}