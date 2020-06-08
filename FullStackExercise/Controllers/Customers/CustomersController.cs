using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FullStackExercise.Models;
using FullStackExercise.Utils;
using Microsoft.AspNetCore.Authorization;

namespace FullStackExercise.Controllers
{
    public class CustomersController : Controller
    {
        private static readonly List<customers> _customers;

        static CustomersController()
        {
            _customers = new YamlParser().parseCustomers();
        }

        public ActionResult Index()
        {
            return View();
        }

        [Route("customers")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        [Authorize]
        public ActionResult customers()
        {
            return Json(_customers);
        }

        [Authorize]
        public IActionResult Logoff()
        {
            HttpContext.Session.Clear();
            return Redirect("~/Login/Index");
        }
    }
}
