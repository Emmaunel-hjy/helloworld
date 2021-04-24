using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TestWeb.Model;

namespace TestWeb.Frame
{
    public partial class Top : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoginSession ls = (LoginSession)Session["LoginBuffer"];
                if (ls != null)
                    user.InnerHtml = ls.Name + " - " + ls.Num; 
                
            }
            
        }       
    }
}