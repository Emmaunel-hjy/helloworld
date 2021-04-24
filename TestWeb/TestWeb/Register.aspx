<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="TestWeb.Register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>注册页面</title>
     <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <script src="Scripts/common.js"></script>
</head>
<body>
    <form class="form-horizontal" runat="server">
  <div class="bs-example" style="margin:20px 20px 20px 20px;" >

  <div class="form-group">
    <label for="inputtext" class="col-sm-2 control-label" >姓名：</label>
    <div class="col-sm-2">
      <input type="text" class="form-control" style="width:200px;" id="username" placeholder="请输入姓名" runat="server" />
    </div>
  </div>

    <div class="form-group">
        <label for="inputtext" class="col-sm-2 control-label" >学号/职工号：</label>
        <div class="col-sm-2">
          <input type="text" class="form-control" style="width:200px;" id="num" placeholder="请输入学号或职工号" runat="server" />
        </div>
      </div>

  <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">密码：</label>
    <div class="col-sm-2">
      <input type="password" class="form-control" style="width:200px;" id="password1" placeholder="请输入密码" runat="server" />
    </div>
  </div>

   <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">再次输入密码：</label>
    <div class="col-sm-2">
      <input type="password" class="form-control" style="width:200px;" id="password2" placeholder="请输入密码" runat="server" />
    </div>
  </div>

   <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">选择您的角色：</label>
    <div class="col-sm-2">
      <select class="form-control" style="width:200px;" runat="server" id="role">
          <option>学生</option>
          <option>教师</option>
      </select>
    </div>
  </div>
  
   <div class="form-group">
     <div class="col-sm-offset-2 col-sm-10">
       <button type="button" class="btn btn-default" runat="server" onserverclick="RegisterUser">注册</button>
     </div>
   </div>
<br />

      <div class="alert alert-danger" style="" role="alert" id="error" runat="server"></div>

      </div>
    </form>
</body>
</html>
