using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YSL.EntpLib.Entity;
using YSL.EntpLib.Entity.Mapping;

namespace TestWeb.Model
{
    public class Exam: BaseEntity
    {
        [EntityColumn(IsPriKey = true, IsIdentity = true)]
        public int Id { get; set; }
        public DateTime Etime { get; set; }
        public DateTime DeadLine { get; set; }

    }
}