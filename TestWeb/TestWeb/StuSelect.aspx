<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StuSelect.aspx.cs" Inherits="TestWeb.StuSelect" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>C程序作业发布与智能批改平台</title>
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <style>
        .header {
            height:100px;
            background-color:cadetblue;
            
        }
        .logotext{
            width:500px;
            margin:4px,7px,2px,4px;
        }
        .tipstext{
            width:500px;
        }
        .userbox{
            width:500px;
            margin:auto;
        }
       
    </style>
</head>
<body>
<form id="form1" runat="server">
   <header class="header">
       <div class="head_main">
           <div class="logotext">
               <h1>
                   C程序作业发布与智能批改平台
               </h1>
           </div>
           <div class="tipstext">
               <h1>
                   2021年4月21日星期三
               </h1>
           </div>
           <div class="userbox">
           <ul>
               <li>姓名（学号）</li>
               <li>修改资料</li>
               <li>退出登录</li>
           </ul>
       </div>
       </div>
       
   </header>
     
    </form>
</body>
</html>
