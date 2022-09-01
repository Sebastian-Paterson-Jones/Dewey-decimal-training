using System.Web;
using System.Web.Mvc;

namespace ST10114615_PROG7312_POE_TASK_1
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
