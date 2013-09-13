package cn.gotom.web.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.interceptor.ServletRequestAware;

import cn.gotom.pojos.Right;
import cn.gotom.service.AuthService;

import com.google.inject.Inject;

@ParentPackage("json-default")
public class AppAction implements ServletRequestAware
{
	protected final Logger log = Logger.getLogger(getClass());

	@Inject
	private AuthService authService;

	private HttpServletRequest request;

	private List<Right> rightList;

	private String parentId;

	@Action(value = "/main", results = { @Result(name = "success", type = "json") })
	public String execute()
	{
		String username = request.getRemoteUser();
		rightList = authService.findRightList(username,parentId);
		return "success";
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0)
	{
		request = arg0;
	}

	public List<Right> getRightList()
	{
		return rightList;
	}

	public void setRightList(List<Right> rightList)
	{
		this.rightList = rightList;
	}

	public String getParentId()
	{
		return parentId;
	}

	public void setParentId(String parentId)
	{
		this.parentId = parentId;
	}

}
