<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
<title>WebSocket</title>
<script type="text/javascript">  
//var ctxp = "ws://localhost:8080/cn.gotom.web";
var ctxp = 'ws://<%=cn.gotom.servlet.UrlUtils.buildContextPath(request)%>';
var ws = null;  
function startWebSocket() {  
    if ('WebSocket' in window)  
        ws = new WebSocket(ctxp+"/websocket.do");  
    else if ('MozWebSocket' in window)  
        ws = new MozWebSocket(ctxp+"/websocket.do");  
    else  
        alert("not support");  
    ws.onmessage = function(evt) {  
    	document.getElementById('writeMsg').value = evt.data;  
    };  
      
    ws.onclose = function(evt) {  
        alert("close");  
    };  
      
    ws.onopen = function(evt) {  
        alert("open");  
    };  
}  
  
function sendMsg() {  
    ws.send(document.getElementById('writeMsg').value);  
}  
</script>  
</head>
<body onload="startWebSocket();">  
<input type="text" id="writeMsg" size="100"></input>  
<input type="button" value="send" onclick="sendMsg()"></input>  
</body>  
</html>