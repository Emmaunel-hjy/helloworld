using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TestWeb.Facade;
using TestWeb.Model;

namespace TestWeb
{
    public partial class Demo1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //string where = "name='李四'";
            List<Student> list = new StudentFacade().SelectStudentAll();
            //new StudentFacade().Delete(new Student() { Id = 1 });
            //list = new StudentFacade().SelectStudentAll();
        }

        protected void Student_AddClick(object sender, EventArgs e)
        {
            string num = txt_num.Value;
            string password = txt_password.Value;
            Student stu = new Student()
            {
                Num = num,
                PassWord = password,
                Name = "张三"
            };

            int i = new StudentFacade().AddStudent(stu);


        }

        protected void Student_UpdateClick(object sender, EventArgs e)
        {
            List<Student> list = new StudentFacade().SelectStudentAll();

            list[0].Name = "李四";

            int i = new StudentFacade().AddStudent(list[0]);
        }
    }
}