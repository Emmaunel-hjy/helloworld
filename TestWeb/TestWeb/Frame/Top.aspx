<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Top.aspx.cs" Inherits="TestWeb.Frame.Top" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="../Content/bootstrap.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <nav class="navbar navbar-default navbar-fixed-top" style="height:80px;">
           <%-- <div class="container-fluid">
                <div style="width:80%;height:150px;float:left;">
                    <div style="margin:20px 0px 0px 40px;">
                        <h1>C程序作业与智能批改平台</h1>
                    </div>
                    <div style="margin:20px 0px 20px 40px;">
                        <h2>系统时间</h2>
                    </div>
                </div>
                <div style="height:150px;float:left;text-align:right;">
                   <div style="margin:20px 0px 0px 20px;">
                       <h4>张三 - 2011111111111</h4>
                   </div>
                    <div style="margin:20px 0px 0px 20px;">
                       <button type="button" class="btn btn-info">修改资料</button>
                   </div>
                    <div style="margin:20px 0px 0px 20px;">
                       <button type="button" class="btn btn-danger">退出登录</button>
                   </div>
                </div>
            </div>--%>

            <div class="navbar-header" style="margin-top:-5px;margin-left:30px;">                
                 <h2>C程序作业与智能批改平台</h2>
            </div>
            <div class="collapse navbar-collapse" style="margin-top:10px;float:right;">
                <span style="width:300px;margin-right:10px;" id="user" runat="server"></span>
                <button type="submit" class="btn btn-info">修改资料</button>                
                <a href="/LoginOut.aspx" class="btn btn-danger" target="_top">退出登录</a>
            </div>
       </nav>
    </form>
</body>
</html>
