using FullStackExercise.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FullStackExercise.Utils.Security
{
    public class TokenProvider
    {
        public string LoginUser(string UserID, string Password)
        {
            var user = UserList.SingleOrDefault(x => x.username == UserID);

            if (user == null)
                return null;

            if (Password == user.password)
            {
                var key = Encoding.ASCII.GetBytes
                ("YourKey-2374-OFFKDI940NG7:56753253-tyuw-5769-0921-kfirox29zoxv");
                var userIdentity = new ClaimsIdentity("Custom");
                userIdentity.AddClaim(new Claim(ClaimTypes.Name, user.username));

                var JWToken = new JwtSecurityToken(
                    issuer: "http://localhost:44348/",
                    audience: "http://localhost:44348/",
                    claims: userIdentity.Claims,
                    notBefore: new DateTimeOffset(DateTime.Now).DateTime,
                    expires: new DateTimeOffset(DateTime.Now.AddDays(1)).DateTime,
                    signingCredentials: new SigningCredentials
                    (new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                );
                var token = new JwtSecurityTokenHandler().WriteToken(JWToken);
                return token;
            }
            else
            {
                return null;
            }
        }

        private List<auth> UserList = new List<auth>(new YamlParser().parseUsers());

        private IEnumerable<Claim> GetUserClaims(auth user)
        {
            IEnumerable<Claim> claims = new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.username)
                    };
            return claims;
        }
    }
}
