using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace TestWeb
{
    public class PageBase : Page
    {
        protected override void OnLoad(EventArgs e)
        {
            if (Session["LoginBuffer"] == null)
            {
                Response.Redirect("/Login.aspx?error=请先登录!");
                return;
            }
            if (!IsPostBack)
            {
                if (Session["LoginBuffer"] == null)
                {
                    Response.Redirect("/Login.aspx?error=请先登录!");
                    return;
                }
            }
            base.OnLoad(e);
        }
    }
}