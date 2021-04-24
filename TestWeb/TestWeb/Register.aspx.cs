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
    public partial class Register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                error.Visible = false;
            }
        }
        public void RegisterUser(object sender, EventArgs e)
        {
            string UserName = username.Value;
            string Num = num.Value;
            string Pwd1 = password1.Value;
            string Pwd2 = password2.Value;
            string Role = role.Value;
            string err = "", tan = "";

            if(Pwd1 != Pwd2){
                err = "两次密码输入不一致!";
            }
            //在这里之前，你要先判断一下 用户登录的是 学生还是教师
            //学生才查询学生表，教师查询教师表
            if(Role =="学生"){
                Student stu = new StudentFacade().SelectStudentByNum(Num);
                if (stu != null)
                {
                    err = "用户已存在！";

                }
                else
                {
                    Student s = new Student()
                    {
                        Name = UserName,
                        Num = Num,
                        PassWord = Pwd1,
                    };
                                       
                    int i = new StudentFacade().AddStudent(s);
                    if (i < 1)
                    {
                        tan = "添加失败！";
                    }
                    else {
                        tan = "添加成功！";
                    }
                }
            }else           
            {
                Teacher tch = new TeacherFacade().SelectTeacherByNum(Num);
                if (tch != null)
                {
                    err = "用户已存在！";
                }
                else {
                    Teacher t = new Teacher()
                    {
                        Name = UserName,
                        Num = Num,
                        PassWord = Pwd1,
                    };
                    int j = new TeacherFacade().AddTeacher(t);
                    if (j < 1)
                    {
                        tan = "添加失败！";
                    }
                    else
                    {
                        tan = "添加成功！";
                    }
                }
            }
           


           
        

            if (string.IsNullOrEmpty(err))
            {
                ScriptManager.RegisterStartupScript(this.Page, this.GetType(), "onekey", "alert('"+tan+"');jump('/Login.aspx')", true);
                error.Visible = false;
                error.InnerHtml = err;
            }
            else
            {
                error.Visible = true;
                error.InnerHtml = err;
            }
          
         
            
        }
    }
}