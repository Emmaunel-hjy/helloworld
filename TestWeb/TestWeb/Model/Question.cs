using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YSL.EntpLib.Entity;
using YSL.EntpLib.Entity.Mapping;

namespace TestWeb.Model
{
    public class Question: BaseEntity
    {
        [EntityColumn(IsPriKey = true, IsIdentity = true)]
        public int Id { get; set; }
        public int Qnum { get; set; }
        public int Type { get; set; }
        public string Qtext { get; set; }
        public string ExpIn { get; set; }
        public string ExpOut { get; set; }
        public int Eid { get; set; }
        public DateTime Time { get; set; }
    }
}