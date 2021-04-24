using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestWeb.Model;
using YSL.EntpLib.Data.Facade;

namespace TestWeb.Facade
{
    public class QuestionFacade
    {
        DBFacade facade = DBFactory.GetDBFacade();
        public int AddQuestion(Question que)
        {
            int i = -1;
            if (que.Id > 0)
                i = facade.Update(que);
            else
                i = facade.Add(que);
            return i;
        }
    }
}