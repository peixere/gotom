<%@ page language="java" isErrorPage="true"%>
<%@ page pageEncoding="UTF-8" contentType="text/html;charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
response.setStatus(404);
%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>您的访问出错了</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="shortcut icon" href="${ctx}/resources/favicon.ico" />
</head>
<body>
	<p><img src="${ctx}/resources/icons/fam/logo.png" title="错误"/>您的访问出错了</p>
	<p>
	${pageContext.request.scheme}://${header.host}${pageContext.errorData.requestURI}
	<br/>很抱歉，您要访问的页面不存在!
	</p>
	<p style="text-align: center; margin-top: 20px">
		<img src="${ctx}/resources/icons/fam/404.png"/>
	</p>
</body>
</html>