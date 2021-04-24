<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Left.aspx.cs" Inherits="TestWeb.Frame.Left" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
     <link href="../Content/bootstrap.css" rel="stylesheet" />
    <style>
        html {
            scrollbar-face-color: #dee3e7;
            scrollbar-highlight-color: #fff;
            scrollbar-shadow-color: #dee3e7;
            scrollbar-3dlight-color: #d1d7dc;
            scrollbar-arrow-color: #069;
            scrollbar-track-color: #efefef;
            scrollbar-darkshadow-color: #98aab1;
        }

        ::-webkit-scrollbar {
            width: 15px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px transparent;
        }

            ::-webkit-scrollbar-track:hover {
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.4);
                background-color: rgba(0,0,0,0.01);
            }

            ::-webkit-scrollbar-track:active {
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.4);
                background-color: rgba(0,0,0,0.05);
            }

        ::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.1);
            border-radius: 10px;
            -webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,0.1);
        }

            ::-webkit-scrollbar-thumb:hover {
                background-color: rgba(0,0,0,0.4);
                -webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,0.1);
            }

            ::-webkit-scrollbar-thumb:active {
                background: rgba(0,0,0,0.6);
            }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div style="height:900px;">
        <div class="list-group" id="lead" runat="server">
            <a href="../Default.aspx" class="list-group-item" target="main">选择教师</a>
            <a href="../Login.aspx" class="list-group-item" target="main">查看作业记录</a>
            <a href="../Register.aspx" class="list-group-item" target="main">查看作业记录</a>          
        </div>
    </div>
    </form>
</body>
</html>
