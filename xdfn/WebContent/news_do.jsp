<%@ page contentType="text/html; charset=utf-8"%>
<%@page import="com.xdfn.mode.TbNews"%>
<%@page import="com.liuq.common.DateUtil"%>
<%TbNews ent = (TbNews)request.getAttribute("ent");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>资讯页面</title>
<link rel="shortcut icon" href="resources/images/favicon.ico"/>

<STYLE type=text/css>
    body {
    background-color: #FFFFFF;
    margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;

}
A:link {
	COLOR: #000000; TEXT-DECORATION: none
}
A:visited {
	COLOR: 00526B; TEXT-DECORATION: none
}
A:active {
	COLOR: #000000}
A:hover {
	COLOR:107DC0; TEXT-DECORATION: none
}
TD {
	COLOR: #000000; FONT-FAMILY: 宋体; FONT-SIZE: 9pt
}
</STYLE>
</head>

<body>
<table width="100%" height="2"  border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="19%" bgcolor="#FF6600"></td>
    <td width="81%" bgcolor="#0040A7"></td>
  </tr>
</table>

<div align="center">
    <center>
        <table border="0" width="1003" cellspacing="0" cellpadding="0">
            <tr>
                <td width="486">
                    <p style="margin-top: 10">&nbsp;<img src="resources/images/logo/logo.gif" width="211" height="57"></p></td>
                <td width="513" valign="top">&nbsp;</td>
            </tr>
        </table>
    </center>
</div>
<table width="1003" border="0" cellpadding="0" cellspacing="0" align="center">
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="1003" height="32" border="0" cellpadding="0" cellspacing="0" bgcolor="#A6A6A6" align="center">
  <tr>
    <td height="1" colspan="2"></td>
  </tr>
  <tr>
    <td width="771" height="30" bgcolor="#F6F6F6">&gt; &gt;首页 &gt; <span class="font12">资讯信息</span></td>
    <td width="106" bgcolor="#F6F6F6">&nbsp;</td>
  </tr>
  <tr>
    <td height="1" colspan="2"></td>
  </tr>
</table>
<table width="834" border="0" cellpadding="0" cellspacing="1" align="center">
  <tr>
    <td width="832" valign="top">
        <table  width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td>&nbsp;</td>
          </tr>
        </table>
        <table style="word-break:break-all" width="90%"  border="0" align="center" cellpadding="0" cellspacing="0">
          
          
          <tr>
            <td height="40" align="center" valign="middle"><p style="text-align: center; line-height: 28pt; margin: 0cm 0cm 6pt; mso-line-height-rule: exactly; mso-para-margin-bottom: .5gd" class="MsoNormal" align="center"><strong style="mso-bidi-font-weight: normal"><span style="font-family: 黑体; font-size: 17pt; mso-font-kerning: 0pt; mso-hansi-font-family: 宋体; mso-bidi-font-family: 宋体"><%=ent.getVTitle()%><span lang="EN-US"><o:p></o:p></span></span></strong></p></td>
          </tr>
          <tr>
            <td height="24" align="right" valign="middle"><%=DateUtil.parseTimestampToDateStr(ent.getDPubDate(),"yyyy-MM-dd")%></td>
          </tr>
          <tr>
            <td height="12" valign="bottom">
  <p style="line-height: 20pt; font-size: 14pt; text-indent: 30pt; margin: 0cm 0cm 0pt; mso-pagination: widow-orphan; mso-line-height-rule: exactly; mso-char-indent-count: 2.0" class="MsoNormal"><%=ent.getVContent()%></p>
  <br>
              <div align="right" style="margin: 10pt 0cm 6pt;">（编辑: <%=ent.getVPuber()%>）</div>
            </td>
            
          </tr>
          <tr>
            <td height="24" valign="bottom" class="line">&nbsp;</td>
          </tr>
        </table>
    <br></td>
  </tr>
</table>
<div align="center">
  <center>
  <table border="0" width="1003 " cellspacing="0" cellpadding="0" background="images/oa-index-botton-de.gif" height="68">
    <tr>
      <td width="100%" valign="top">
        <table border="0" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td></td>
            <td style="text-align: center">
              <p style="margin-top: 10"><b>湘电风能版权所有</b></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  </center>
</div>
</body>
</html>