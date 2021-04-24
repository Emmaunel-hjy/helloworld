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
    public partial class AddExam : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //string json = "[{Num:'dfvbshjfgdhsjk'},{Num:'gfdklg23454515'}]";
                //List<Student> stu = JsonHelper.DeserializeJsonToObject<List<Student>>(json);



            }
        }

        protected void Add_ServerClick(object sender, EventArgs e)
        {
            string DeadLine = txt_DeadLine.Value;
            string json = hid_json.Value;
            List<Question> que = JsonHelper.DeserializeJsonToObject<List<Question>>(json);
                         
            //添加作业表
            Exam exam = new Exam();
            exam.Etime = DateTime.Now;
            exam.DeadLine = Convert.ToDateTime(DeadLine);
            //i 是作业Id
            int i = new ExamFacade().AddExam(exam);

            QuestionFacade qf = new QuestionFacade();
            //根据作业id 添加题目表      

            int j = 1;
            foreach (Question item in que)
            {
                item.Qnum = j++;
                item.Eid = i;
                item.Time = DateTime.Now;

                qf.AddQuestion(item);
            }
        }
    }
}