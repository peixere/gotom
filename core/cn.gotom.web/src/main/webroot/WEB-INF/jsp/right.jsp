<%@ include file="/WEB-INF/jsp/inc/taglibs.jsp"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Hello World</title>
<jsp:include page="/WEB-INF/jsp/inc/meta.jsp"></jsp:include>
</head>
<body>
	<h1>${message}</h1>
	<s:form action="welcome">
		<s:textfield name="userName" label="User Name" />
		<s:submit />
	</s:form>
</body>
</html>