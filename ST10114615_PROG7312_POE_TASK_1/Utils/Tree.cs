using ST10114615_PROG7312_POE_TASK_1.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ST10114615_PROG7312_POE_TASK_1.Utils
{
    public class DeweyTree
    {
        public string number;
        public string description;
        public List<DeweyTree> children;

        public DeweyTree(string number, string description)
        {
            this.number = number;
            this.description = description;
            this.children = new List<DeweyTree>();
        }
    }
}
