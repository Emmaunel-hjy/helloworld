using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestWeb.Model
{
    public class LoginSession
    {
        public int Id { get; set; }
        public string Num { get; set; }
        public string Name { get; set; }
        public string PassWord { get; set; }
        public int LoginType { get; set; }
    }
}