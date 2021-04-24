<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Demo1.aspx.cs" Inherits="TestWeb.Demo1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
</head>
<body>  

    <form runat="server" class="form-horizontal">
        <div class="bs-example" style="margin:20px 20px 20px 20px;" >
      <div class="form-group">
        <label for="exampleInputEmail1" class="col-sm-2 control-label">用户名：</label>
          <div class="col-sm-5">
        <input type="email" class="form-control" id="txt_num" placeholder="学号"  runat="server" />
              </div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1" class="col-sm-2 control-label">密码：</label>
          <div class="col-sm-5">
        <input type="password" class="form-control" id="txt_password" placeholder="Password" runat="server" />
              </div>
      </div> 
  <div class="form-group"><div class="col-sm-offset-2 col-sm-10">
       <input type="button" value="提交" class="btn" runat="server" onserverclick="Student_AddClick" />
       <input type="button" value="修改"  class="btn" runat="server" onserverclick="Student_UpdateClick" />
            </div>  </div> </div>
    </form>
</body>
</html>
