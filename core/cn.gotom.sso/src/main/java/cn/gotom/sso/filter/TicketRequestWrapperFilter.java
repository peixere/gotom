package cn.gotom.sso.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import cn.gotom.sso.TicketImpl;

public final class TicketRequestWrapperFilter extends AbstractConfigurationFilter
{
	public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain filterChain) throws IOException, ServletException
	{
		final TicketImpl ticket = getTicketFromSessionOrRequest(request);
		filterChain.doFilter(new TicketRequestWrapper((HttpServletRequest) request, ticket), response);
	}

	@Override
	public void destroy()
	{

	}
}