using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestWeb.Model;
using YSL.EntpLib.Data.Facade;

namespace TestWeb.Facade
{
    public class ExamFacade
    {
        DBFacade facade = DBFactory.GetDBFacade();
        public int AddExam(Exam exam)
        {
            int i = -1;
            if (exam.Id > 0)
                i = facade.Update(exam);
            else
                i = facade.Add(exam);
            return i;
        }
    }
}