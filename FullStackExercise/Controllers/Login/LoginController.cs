using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FullStackExercise.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using FullStackExercise.Utils.Security;

namespace FullStackExercise.Controllers.Login
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult LoginUser(auth user)
        {
            if(user.password == null || user.username == null)
            {
                return Redirect("~/Customers/Index");
            }

            TokenProvider _tokenProvider = new TokenProvider();

            var userToken = _tokenProvider.LoginUser(user.username.Trim(),
                            user.password.Trim());
            if (userToken != null)
            {
                //Save token in session object
                HttpContext.Session.SetString("JWToken", userToken);
            }
            return Redirect("~/Customers/Index");
        }
    }
}

