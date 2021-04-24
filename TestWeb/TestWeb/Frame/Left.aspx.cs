using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TestWeb.Model;

namespace TestWeb.Frame
{
    public partial class Left : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoginSession ls = (LoginSession)Session["LoginBuffer"];
                if (ls.LoginType == 0)//登录的是学生
                {
                    lead.InnerHtml = "<a href='../Default.aspx' class='list-group-item' target='main'>作业记录</a><a href='../Default.aspx' class='list-group-item' target='main'>得分情况</a>";
                }
                else
                {
                    lead.InnerHtml = "<a href='../AddExam.aspx' class='list-group-item' target='main'> 上传作业</a><a href='../Default.aspx' class='list-group-item' target='main'> 学生成绩</a>";
                }

                   

            }
        }
    }
}