using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestWeb.Model;
using YSL.EntpLib.Data.Facade;

namespace TestWeb.Facade
{
    public class StudentFacade
    {
        DBFacade facade = DBFactory.GetDBFacade();
        public int AddStudent(Student stu)
        {
            int i = -1;
            if (stu.Id > 0)
                i = facade.Update(stu);
            else
                i = facade.Add(stu);
            return i;
        }

        public List<Student> SelectStudentAll()
        {
            string sql = "select * from student";
            List<Student> list = facade.QueryBatch<Student>(sql, null);
            return list;
        }

         public List<Student> SelectStudentWhere(string where)
        {
            string sql = "select * from student where " + where;

            List<Student> list = facade.QueryBatch<Student>(sql, null);
            return list;
        }

         public Student SelectStudentByNum(string Num)
         {
             string sql = "select * from student where Num='" + Num + "'";
             Student stu = facade.QueryFirst<Student>(sql, null);
             return stu;
         }

        public int Delete(Student stu)
        {
            return facade.Delete(stu);
        }
    }
}