package cn.gotom.client.filter;

import javax.servlet.Filter;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import cn.gotom.client.Ticket;
import cn.gotom.client.util.CommonUtils;
import cn.gotom.client.util.PathMatcher;
import cn.gotom.client.util.PathMatcherAnt;

public abstract class AbstractConfigurationFilter implements Filter
{
	protected final Logger log = Logger.getLogger(getClass());

	protected final String serviceParameter = "service";

	protected final String serverUrlParameter = "serverUrl";

	protected final String ticketParameter = "ticket";

	protected final PathMatcher urlMatcher = new PathMatcherAnt();

	private boolean encodeServiceUrl = true;

	/**
	 * 可选，接入服务器名，为空测从哪来回哪去
	 */
	private String serverName;
	/**
	 * 可选，接入服务验证返回URL，为空测从哪来回哪去
	 */
	private String service;

	/**
	 * 必选，验证服务器URL
	 */
	private String serverUrl;

	/**
	 * 忽列验证的路径
	 */
	private String[] authenticationNones;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException
	{
		initInternal(filterConfig);
	}

	public String getServerName()
	{
		return serverName;
	}

	public void setServerName(String serverName)
	{
		this.serverName = serverName;
	}

	public String getService()
	{
		return service;
	}

	public void setService(String service)
	{
		this.service = service;
	}

	public String getServerUrl()
	{
		return serverUrl;
	}

	public void setServerUrl(String serverUrl)
	{
		this.serverUrl = serverUrl;
	}

	public String[] getAuthenticationNones()
	{
		return authenticationNones;
	}

	public void setAuthenticationNones(String[] authenticationNones)
	{
		this.authenticationNones = authenticationNones;
	}

	public boolean isEncodeServiceUrl()
	{
		return encodeServiceUrl;
	}

	public void setEncodeServiceUrl(boolean encodeServiceUrl)
	{
		this.encodeServiceUrl = encodeServiceUrl;
	}

	private void initIgnore(FilterConfig filterConfig)
	{
		String none = getInitParameter(filterConfig, "authenticationNone", null);
		log.trace("Loaded " + "authenticationNone" + " parameter: " + none);
		if (none != null)
		{
			none = none.trim().replace("；", ";");
			none = none.replace(",", ";");
			none = none.replace("，", ";");
			none = none.replace("\n", ";");
			authenticationNones = none.trim().split(";");
			for (int i = 0; i < authenticationNones.length; i++)
			{
				authenticationNones[i] = authenticationNones[i].trim();
			}
		}
	}

	protected boolean isIgnore(String url)
	{
		if (authenticationNones != null)
		{
			for (String pattern : authenticationNones)
			{
				if (urlMatcher.pathMatchesUrl(pattern.trim(), url))
				{
					return true;
				}
			}
		}
		return false;
	}

	protected void initInternal(final FilterConfig filterConfig) throws ServletException
	{
		initIgnore(filterConfig);
		setServerName(getInitParameter(filterConfig, "serverName", null));
		log.trace("Loading serverName property: " + this.serverName);
		setService(getInitParameter(filterConfig, serviceParameter, null));
		log.trace("Loaded " + serviceParameter + " parameter: " + this.getService());
		setServerUrl(getInitParameter(filterConfig, serviceParameter, null));
		log.trace("Loaded " + serverUrlParameter + " parameter: " + this.getServerUrl());
		setEncodeServiceUrl(CommonUtils.parseBoolean(getInitParameter(filterConfig, "encodeServiceUrl", "true")));
		log.trace("Loading encodeServiceUrl property: " + this.encodeServiceUrl);
	}

	protected Ticket getTicketFromSessionOrRequest(final ServletRequest servletRequest)
	{
		final HttpServletRequest request = (HttpServletRequest) servletRequest;
		final HttpSession session = request.getSession(false);
		final Ticket ticket = (Ticket) (session == null ? request.getAttribute(Ticket.CONST_TICKET) : session.getAttribute(Ticket.CONST_TICKET));
		return ticket;
	}

	protected final String constructServiceUrl(final HttpServletRequest request, final HttpServletResponse response)
	{
		return CommonUtils.constructServiceUrl(request, response, this.getService(), this.getServerName(), this.ticketParameter, this.encodeServiceUrl);
	}

	protected final String getInitParameter(final FilterConfig filterConfig, final String propertyName, final String defaultValue)
	{
		String value = filterConfig.getInitParameter(propertyName);
		if (CommonUtils.isNotBlank(value))
		{
			log.info("Property [" + propertyName + "] loaded from FilterConfig.getInitParameter with value [" + value + "]");
			return value;
		}
		value = filterConfig.getServletContext().getInitParameter(propertyName);
		if (CommonUtils.isNotBlank(value))
		{
			log.info("Property [" + propertyName + "] loaded from ServletContext.getInitParameter with value [" + value + "]");
			return value;
		}
		if (CommonUtils.isEmpty(value))
		{
			value = defaultValue;
		}
		log.info("Property [" + propertyName + "] not found.  Using default value [" + defaultValue + "]");
		return defaultValue;
	}
}
