using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestWeb.Model;
using YSL.EntpLib.Data.Facade;

namespace TestWeb.Facade
{
    public class TeacherFacade
    {
        DBFacade facade = DBFactory.GetDBFacade();
        public int AddTeacher(Teacher tch)
        {
            int i = -1;
            if (tch.Id > 0)
                i = facade.Update(tch);
            else
                i = facade.Add(tch);
            return i;
        }
        public List<Teacher> SelectTeacherAll()
        {
            string sql = "select * from teacher";
            List<Teacher> list = facade.QueryBatch<Teacher>(sql, null);
            return list;
        }
        public List<Teacher> SelectTeacherWhere(string where)
        {
            string sql = "select * from teacher where " + where;

            List<Teacher> list = facade.QueryBatch<Teacher>(sql, null);
            return list;
        }
        public Teacher SelectTeacherByNum(string Num)
        {
            string sql = "select * from teacher where Num='" + Num + "'";
            Teacher tch = facade.QueryFirst<Teacher>(sql, null);
            return tch;
        }
        public int Delete(Teacher tch)
        {
            return facade.Delete(tch);
        }
    }
}