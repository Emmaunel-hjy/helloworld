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
    public partial class login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                error.Visible = false;

                string err = "";
                if (Request["error"] != null)
                {
                    err = Request["error"].ToString();

                    ScriptManager.RegisterStartupScript(this.Page, this.GetType(), "onekey", "alert('" + err + "');", true);
                }
            }
        }
        public void LoginUser(object sender, EventArgs e)
        {
            string Num = num.Value;
            string PassWord = Password.Value;
            string Role = role.Value;
            string err = "";
            LoginSession ls = new LoginSession();
            if (Role == "学生")
            {
                Student stu = new StudentFacade().SelectStudentByNum(Num);
                if (stu != null)
                {
                    if (stu.PassWord != PassWord)
                    {
                        err = "用户名密码错误！";
                    }
                    else {
                        ls.Id = stu.Id;
                        ls.Name = stu.Name;
                        ls.Num = stu.Num;
                        ls.PassWord = stu.PassWord;
                        ls.LoginType = 0;                       
                    }
                }
                else
                {
                    err = "用户不存在，请去注册！";
                }
            }
            else {
                Teacher tch = new TeacherFacade().SelectTeacherByNum(Num);
                if (tch != null)
                {
                    if (tch.PassWord != PassWord)
                    {
                        err = "用户名密码错误！";
                    }
                    else
                    {
                        ls.Id = tch.Id;
                        ls.Name = tch.Name;
                        ls.Num = tch.Num;
                        ls.PassWord = tch.PassWord;
                        ls.LoginType = 1;                        
                    }
                }
                else
                {
                    err = "用户不存在，请去注册！";
                }
            }
           


            if (string.IsNullOrEmpty(err))
            {
                Session["LoginBuffer"] = ls;
                error.Visible = false;
                error.InnerHtml = err;

                Response.Redirect("Frame/Main.aspx"); 
            }
            else
            {
                error.Visible = true;
                error.InnerHtml = err;
            }
          
        }
    }
}