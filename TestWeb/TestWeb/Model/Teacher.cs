using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YSL.EntpLib.Entity;
using YSL.EntpLib.Entity.Mapping;

namespace TestWeb.Model
{
    public class Teacher : BaseEntity
    {
         [EntityColumn(IsPriKey = true, IsIdentity = true)]
         public int Id { get; set; }
         public string Num { get; set; }
         public string Name { get; set; }
         public string PassWord { get; set; }    
    }
}