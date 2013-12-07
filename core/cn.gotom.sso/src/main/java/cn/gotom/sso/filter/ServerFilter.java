package cn.gotom.sso.filter;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.gotom.sso.server.JDBCConnection;
import cn.gotom.sso.util.PasswordEncoder;
import cn.gotom.sso.util.PasswordEncoderMessageDigest;

public class ServerFilter extends AbstractAuthenticationFilter
{
	private static final String Muthod = "muthod";
	private static final String Login = "login";
	private static final String Logout = "logout";
	private static final String Validate = "validate";
	private static final String sqlPropertyName = "loginsql";

	private static final JDBCConnection connection = JDBCConnection.single;
	private PasswordEncoder passwordEncoder;
	private String loginSQL;
	private String encodingAlgorithm;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException
	{
		super.init(filterConfig);
		encodingAlgorithm = this.getInitParameter(filterConfig, "encodingAlgorithm", "MD5");
		loginSQL = this.getInitParameter(filterConfig, sqlPropertyName, "select password from core_user where username=?");
		passwordEncoder = new PasswordEncoderMessageDigest(encodingAlgorithm);
	}

	@Override
	public void destroy()
	{
		// TODO Auto-generated method stub
	}

	public final void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain filterChain) throws IOException, ServletException
	{
		final HttpServletRequest req = (HttpServletRequest) request;
		final HttpServletResponse res = (HttpServletResponse) response;
		String muthod = req.getHeader(Muthod);
		if (muthod == null || muthod.trim().length() == 0)
		{
			muthod = req.getParameter(Muthod);
		}
		if (Login.equalsIgnoreCase(muthod))
		{
			doLogin(req, res);
		}
		else if (Logout.equalsIgnoreCase(muthod))
		{
			doLogout(req, res);
		}
		else if (Validate.equalsIgnoreCase(muthod))
		{
			doValidate(req, res);
		}
		else
		{
			doLogout(req, res);
		}
	}

	protected void doLogin(HttpServletRequest req, HttpServletResponse res) throws IOException
	{
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		if (login(username, password))
		{
			String serviceUrl = req.getParameter(getServiceParameterName());
			res.sendRedirect(serviceUrl);
		}
	}

	private boolean login(String username, String password)
	{
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try
		{
			password = passwordEncoder.encode(password);
			Connection conn = connection.connection();
			stmt = conn.prepareStatement(loginSQL);
			stmt.setString(0, username);
			rs = stmt.executeQuery();
			if (rs.next())
			{
				if (password.equals(rs.getString(0)))
				{
					return true;
				}
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
		finally
		{
			try
			{
				if (rs != null)
					rs.close();
				if (stmt != null)
					stmt.close();
			}
			catch (SQLException e)
			{
				e.printStackTrace();
			}
			connection.close();
		}
		return false;
	}

	protected void doLogout(HttpServletRequest req, HttpServletResponse res)
	{

	}

	protected void doValidate(HttpServletRequest req, HttpServletResponse res)
	{

	}

	public String getLoginSQL()
	{
		return loginSQL;
	}

	public void setLoginSQL(String loginSQL)
	{
		this.loginSQL = loginSQL;
	}

	public String getEncodingAlgorithm()
	{
		return encodingAlgorithm;
	}

	public void setEncodingAlgorithm(String encodingAlgorithm)
	{
		this.encodingAlgorithm = encodingAlgorithm;
	}

}
