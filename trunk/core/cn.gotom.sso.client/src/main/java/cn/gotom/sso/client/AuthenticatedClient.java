package cn.gotom.sso.client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

public class AuthenticatedClient
{

	public AuthenticatedClient()
	{

	}

	public AuthenticatedResponse auth(String authServiceUrl, AuthenticatedRequest request)
	{
		AuthenticatedResponse response = new AuthenticatedResponse(request);
		CloseableHttpClient httpclient = HttpClients.createDefault();
		try
		{
			StringEntity entity = new StringEntity(request.toString());
			HttpPost httppost = new HttpPost(authServiceUrl);
			httppost.setEntity(entity);
			HttpResponse httpResponse = httpclient.execute(httppost);
			if (httpResponse.getStatusLine().getStatusCode() == 200)
			{
				String jsonString = getStringFromHttp(httpResponse.getEntity());
				response = fromJsonString(AuthenticatedResponse.class, jsonString);
			}
			else
			{
				response.setStatus(httpResponse.getStatusLine().getStatusCode());
				response.setMessage(httpResponse.getStatusLine().toString());
			}
		}
		catch (UnsupportedEncodingException e)
		{
			e.printStackTrace();
		}
		catch (ClientProtocolException e)
		{
			e.printStackTrace();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
		return response;
	}

	@SuppressWarnings("unchecked")
	public static <T> T fromJsonString(Class<T> clazz, String jsonString)
	{
		JSON json = JSONSerializer.toJSON(jsonString);
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setRootClass(clazz);
		return (T) JSONSerializer.toJava(json, jsonConfig);
	}

	public static String convertStreamToString(InputStream is) throws Exception
	{
		BufferedReader in = new BufferedReader(new InputStreamReader(is, "utf-8"));
		StringBuffer buffer = new StringBuffer();
		String line = "";
		while ((line = in.readLine()) != null)
		{
			buffer.append(line).append("\n");
		}
		return buffer.toString();
	}

	public static String getStringFromHttp(HttpEntity entity)
	{
		StringBuffer buffer = new StringBuffer();
		try
		{
			BufferedReader reader = new BufferedReader(new InputStreamReader(entity.getContent()));
			String temp = null;
			while ((temp = reader.readLine()) != null)
			{
				buffer.append(temp);
			}
		}
		catch (IllegalStateException e)
		{
		}
		catch (IOException e)
		{
		}
		return buffer.toString();
	}

	public static void main(String[] args)
	{
		int i = 1000;
		long time = System.currentTimeMillis();
		while (i-- > 0)
		{
			AuthenticatedRequest request = new AuthenticatedRequest();
			request.setAppCode("appCode");
			request.setUsername("admins");
			request.setUrl("/authService.do" + i);
			AuthenticatedClient ac = new AuthenticatedClient();
			AuthenticatedResponse response = ac.auth("http://localhost:8080/authService", request);
			response.getStatus();
		}
		time = System.currentTimeMillis() - time;
		System.out.println(time);
	}
}