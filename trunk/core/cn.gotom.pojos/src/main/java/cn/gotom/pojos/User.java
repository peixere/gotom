package cn.gotom.pojos;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/**
 * 
 * 用户信息表
 * 
 * @author peixere@qq.com
 * 
 * @version 2012-12-03
 * 
 */
@Entity
@Table(name = "core_user")
public class User extends SuperEntity implements Serializable
{
	private static final long serialVersionUID = 1L;

	public static final String admin = "admin";

	@Column(nullable = true, length = 50)
	private String name;

	@Column(nullable = false, length = 50)
	private String password;

	@Column(unique = true, nullable = false, length = 100,updatable = true)
	private String username;

	@Column(nullable = true, length = 100)
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "organization_id", referencedColumnName = "id")	
	private String organization = "";

	/**
	 * 0:正常;1:挂起;2:删除
	 */
	@Column(nullable = true, length = 11)
	private Status status = Status.Normal;

	@ManyToMany
	@JoinTable(name = "core_user_role", joinColumns = { @JoinColumn(name = "user_id", nullable = false) }, inverseJoinColumns = { @JoinColumn(name = "role_id", nullable = false) })
	private java.util.List<Role> roles;

	public User()
	{
	}

	public String getName()
	{
		return this.name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getPassword()
	{
		return this.password;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public String getUsername()
	{
		return this.username;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

	public String getOrganization()
	{
		return organization;
	}

	public void setOrganization(String organization)
	{
		this.organization = organization;
	}

	public Status getStatus()
	{
		return status;
	}

	public void setStatus(Status status)
	{
		this.status = status;
	}

	public java.util.List<Role> getRoles()
	{
		return this.roles;
	}

	public void setRoles(java.util.List<Role> roles)
	{
		this.roles = roles;
	}

}