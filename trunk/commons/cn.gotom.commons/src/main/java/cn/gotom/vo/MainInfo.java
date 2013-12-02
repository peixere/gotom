package cn.gotom.vo;

public class MainInfo extends JsonResponse
{
	private String id;
	private String username;
	private String userFullname;
	private String logoutUrl;
	private String logoUrl;
	private String title;
	
	public String getId()
	{
		return id;
	}
	public void setId(String id)
	{
		this.id = id;
	}
	public String getUsername()
	{
		return username;
	}
	public void setUsername(String username)
	{
		this.username = username;
	}
	public String getUserFullname()
	{
		return userFullname;
	}
	public void setUserFullname(String userFullname)
	{
		this.userFullname = userFullname;
	}
	public String getLogoutUrl()
	{
		return logoutUrl;
	}
	public void setLogoutUrl(String logoutUrl)
	{
		this.logoutUrl = logoutUrl;
	}
	public String getLogoUrl()
	{
		return logoUrl;
	}
	public void setLogoUrl(String logoUrl)
	{
		this.logoUrl = logoUrl;
	}
	public String getTitle()
	{
		return title;
	}
	public void setTitle(String title)
	{
		this.title = title;
	}

}