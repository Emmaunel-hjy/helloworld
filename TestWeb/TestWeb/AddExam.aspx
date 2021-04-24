<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddExam.aspx.cs" Inherits="TestWeb.AddExam" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="../Content/bootstrap.css" rel="stylesheet" />
    <link href="Content/JCalender/Black/jCalender.css" rel="stylesheet" />

    <script src="Scripts/jquery-2.1.4.js"></script>
    <script src="Scripts/jCalender.js"></script>

    <script>

        $(function () {
            var nowdate = GetDate();
            $("#txt_DeadLine").val(nowdate);

            $("#txt_DeadLine").jCalender({ yesterdays: 2 });
        })

        function GetDate() {
            var now = new Date(new Date().getTime() + 24*60*60*1000);
            var month = now.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            var day = now.getDate();
            if (day < 10) {
                  day = "0" + day;
            }
            return now.getFullYear() + "-" + month + "-" + day;
        }

        function AddQuestion() {
            var html = "<div class='panel panel-default' style='margin:0px 200px 0px 100px' name='Ques'><div class='panel-body'>" +
                //上传类型
                "<div class='form-group'>" +
                "<label for='inputPassword' class='col-sm-2 control-label'>选择作业上传类型:</label>"+
                "<div class='col-sm-2'><select class='form-control' style='width: 200px;' name='sel_type'>"+
                "<option value='0'>文本类型</option><option  value='1'>文件类型</option></select></div></div>" +

                //题目内容
                "<div class='form-group'>" +
                "<label for='inputPassword' class='col-sm-2 control-label'>题目内容：</label>" +
                "<div class='col-sm-2'><textarea style='width:400px;height:80px;' name='sel_text'></textarea></div></div>" +

                 //期望输入
                "<div class='form-group'>" +
                "<label for='inputPassword' class='col-sm-2 control-label'>期望输入：</label>" +
                "<div class='col-sm-2'><textarea style='width:400px;height:40px;' name='exp_in'></textarea></div></div>" +

                //期望输出
                "<div class='form-group'>" +
                "<label for='inputPassword' class='col-sm-2 control-label'>期望输出：</label>" +
                "<div class='col-sm-2'><textarea style='width:400px;height:40px;' name='exp_out'></textarea></div></div>" +


                "<div class='form-group'>" +               
                "<div class='col-sm-2'></div><div class='col-sm-2'><button type='button' class='btn btn-danger' onclick='DeleteQuestion(this)'>删除题目</button></div></div>"+
                "</div></div>";
            $("#div_question").append(html);
        }


        function DeleteQuestion(obj) {
            $(obj).parents("div[name=Ques]").remove();
        }         

        function AddExam() {
            //   [{"Type":"1","Content":"123"},{}]        {"Type":"1","Content":"123"}   

            var json = [];
            $.each($("select[name=sel_type]"), function () {
                var single = {};
                single.Type = $(this).val();
                json.push(single);
            })

            var i = 0;
            $.each($("textarea[name=sel_text]"), function () {
                json[i++].Qtext = $(this).val();
            })

            i = 0;
            $.each($("textarea[name=exp_in]"), function () {
                json[i++].ExpIn = $(this).val();
            })

            i = 0;
            $.each($("textarea[name=exp_out]"), function () {
                json[i++].ExpOut = $(this).val();
            })

            $("#hid_json").val(JSON.stringify(json));
        }

    </script>
</head>
<body>

    <form class="form-horizontal" runat="server" style="margin-top:20px;">
        <input type="hidden" id="hid_json" runat="server" value="123456" />
        <div class="form-group">
            <label for='inputPassword' class='col-sm-2 control-label'>作业截止日期:</label>
            <div class="col-sm-2">
              <input type="text" class="form-control" id="txt_DeadLine" runat="server" value="" />
             </div>
        </div>
        <div class="form-group">
            <div class="col-sm-2" >
               </div>
            <div class="col-sm-2">
              <button type="button" class="btn btn-info" onclick="AddQuestion()">添加题目</button>
             </div>
        </div>

        <div id="div_question">


        </div>

         <div class="form-group" > <div class="col-sm-12" style="text-align:center;">
                <button type="button" class="btn btn-primary" runat="server" onclick="AddExam();" onserverclick="Add_ServerClick" >提交作业</button>
             </div>
        </div>
    </form>
       
</body>
</html>
