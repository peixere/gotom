package cn.gotom.web.action;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import cn.gotom.pojos.Organization;
import cn.gotom.service.OrganizationService;
import cn.gotom.servlet.ContextUtils;
import cn.gotom.util.StringUtils;

import com.google.inject.Inject;

@ParentPackage("json-default")
@Namespace(value = "/p")
@Action(value = "/organization", results = { @Result(name = "success", type = "json") })
public class OrganizationAction
{
	protected final Logger log = Logger.getLogger(getClass());

	private String id;

	private String parentId;

	private boolean success;

	@Inject
	private OrganizationService service;

	public void execute() throws IOException
	{
		Organization e = null;
		try
		{
			e = service.get(this.getId());
		}
		catch (Exception ex)
		{
			log.warn(ex.getMessage());
		}
		if (e == null)
		{
			e = new Organization();
			e.setParentId(this.getParentId());
		}
		ContextUtils.writerToJSON(e);
	}

	public void tree() throws IOException
	{
		List<Organization> menuList = service.loadTree();
		if (menuList.size() == 0)
		{
			Organization o = new Organization();
			o.setText("国家能源委员会");
			o.setCode("");
			service.save(o);
			menuList.add(o);
		}
		ContextUtils.writerToJSON(menuList);
	}
	public void list() throws IOException
	{
		List<Organization> menuList = service.findAll();
		ContextUtils.writerToJSON(menuList);
	}
	public String remove()
	{
		String ids = getId();
		if (StringUtils.isNotEmpty(ids))
		{
			String[] idarray = ids.split(",");
			this.setSuccess(true);
			for (String id : idarray)
			{
				if (service.findByParentId(id).size() == 0)
				{
					service.remove(id);
				}
				else
				{
					this.setSuccess(false);
				}
			}
		}
		return "success";
	}

	public String save()
	{
		try
		{
			Organization o = new Organization();
			Map<String, String[]> params = ServletActionContext.getRequest().getParameterMap();
			BeanUtils.copyProperties(o, params);
			this.setSuccess(true);
			service.save(o);
		}
		catch (Exception e)
		{
			log.error(e.getMessage(), e);
		}
		return "success";
	}

	public String getId()
	{
		return id;
	}

	public void setId(String id)
	{
		this.id = id;
	}

	public boolean isSuccess()
	{
		return success;
	}

	public void setSuccess(boolean success)
	{
		this.success = success;
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