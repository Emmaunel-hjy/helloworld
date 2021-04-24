<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Main.aspx.cs" Inherits="TestWeb.Frame.Main" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>C作业批改系统</title>
</head>
    <frameset rows="80,*,40" cols="*" frameborder="NO" border="0" framespacing="0">
		<frame src="Top.aspx" name="top" scrolling="NO" noresize="">
		<frameset rows="100%,*" cols="240,*"  framespacing="0" frameborder="NO" border="0" id="fBottom">           
			<frame src="Left.aspx" name="left" target="main">		
			<frame src="Right.aspx" name="main" id="main">
		</frameset>            		
		<noframes>
		</noframes>    
</frameset> 
</html>
