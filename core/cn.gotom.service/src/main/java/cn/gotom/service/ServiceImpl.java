package cn.gotom.service;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;

import cn.gotom.pojos.Custom;
import cn.gotom.pojos.CustomUser;
import cn.gotom.pojos.Role;
import cn.gotom.pojos.User;
import cn.gotom.util.PasswordEncoder;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.inject.Inject;

public class ServiceImpl implements Service
{
	protected final Logger log = Logger.getLogger(getClass());

	@Inject
	UniversalService universalService;
	@Inject
	protected UserService userService;
	@Inject
	private RoleService roleService;
	@Inject
	PasswordEncoder passwordEncoder;
	@Inject
	private OrganizationService orgService;
	@Inject
	private CustomService customService;

	@Override
	public void init()
	{
		defaultCustom();
		initUser();
		defalutData();
	}

	private void initUser()
	{
		try
		{
			User user = userService.getByUsername(User.ROOT);
			if (user == null)
			{
				user = new User();
				user.setUsername(User.ROOT);
				user.setName("超级管理员");
				user.setPassword(passwordEncoder.encode("888888"));
				userService.save(user);
			}
		}
		catch (Exception ex)
		{
			log.error("", ex);
		}
	}

	private void defaultCustom()
	{
		try
		{
			Custom o = universalService.get(Custom.class, Custom.Default);
			if (o == null)
			{
				o = new Custom();
				o.setId(Custom.Default);
				o.setName("管理平台");
				universalService.persist(o);
			}
		}
		catch (Exception ex)
		{
			log.error("", ex);
		}
	}

	private void defalutData()
	{
		try
		{
			ResourceBundle bundle = ResourceBundle.getBundle("DefaultData", Locale.ROOT);
			Enumeration<String> keys = bundle.getKeys();
			while (keys.hasMoreElements())
			{
				String key = keys.nextElement();
				try
				{
					Class<?> clazz = Class.forName(key);
					List<?> olist = universalService.findAll(clazz);
					if (olist.size() == 0)
					{
						Gson gson = new Gson();
						String json = bundle.getString(key);
						List<?> list = (List<?>) gson.fromJson(json, TypeToken.get(olist.getClass()).getType());
						log.debug(list);
						// JSON json = JSONSerializer.toJSON(rightString);
						// JsonConfig jsonConfig = new JsonConfig();
						// jsonConfig.setRootClass(clazz);
						// List<?> list = (List<?>) JSONSerializer.toJava(json, jsonConfig);
						universalService.saveAll(list);
					}
				}
				catch (Exception ex)
				{
					log.error("初始化数据异常 " + key, ex);
				}
			}
			Custom custom = customService.get(Custom.Default);
			orgService.updateEmpty(custom);
			userService.updateEmpty(custom);
		}
		catch (Exception ex)
		{
			log.error("初始化数据异常", ex);
		}
	}

	@Override
	public boolean userHasCustom(String userId, String customId)
	{
		return customService.getCustomUser(userId, customId) != null;
	}

	@Override
	public boolean saveUser(String currentUser, String customId, User user, String[] roleIds)
	{
		CustomUser customUser = customService.getCustomUser(user.getId(), customId);
		User old = userService.getByUsername(user.getUsername());
		if (old != null && !old.getId().equals(user.getId()))
		{
			return false;
		}
		else
		{
			if (old != null)
			{
				user.setPassword(old.getPassword());
			}
			else
			{
				user.setPassword(passwordEncoder.encode("123456"));
			}
			List<Role> userRoles = new ArrayList<Role>();
			if (roleIds != null && roleIds.length > 0)
			{
				List<Role> roleList = roleService.findAll();
				for (Role o : roleList)
				{
					for (String roleId : roleIds)
					{
						if (o.getId().equals(roleId.trim()))
						{
							userRoles.add(o);
							break;
						}
					}
				}
			}
			user.setRoles(userRoles);
			userService.save(user);
			if (customUser == null)
			{
				customUser = new CustomUser();
				customUser.setUser(user);
				customUser.setCustom(new Custom());
				customUser.getCustom().setId(customId);
				userService.persist(customUser);
			}
		}
		return true;
	}

	//
	// @Override
	// public List<TreeCheckedModel> findSelectOrgs(String currentUser, User user, String parentId)
	// {
	// if (user != null)
	// {
	// user = userService.get(user.getId());
	// }
	// User login = userService.getByUsername(currentUser);
	// List<Organization> orgList = new ArrayList<Organization>();
	// if (User.ROOT.equals(login.getUsername()))
	// {
	// orgList = orgService.findByParentId(parentId);
	// }
	// else
	// {
	// // orgList = login.getOrganizations();
	// }
	// if (StringUtils.isNotEmpty(parentId))
	// {
	// orgList = orgService.findByParentId(parentId);
	// }
	// List<TreeCheckedModel> tree = new ArrayList<TreeCheckedModel>();
	// List<Organization> selectOrgs = new ArrayList<Organization>();
	// // if (user != null)
	// // {
	// // if (user.getOrganizations() == null)
	// // {
	// // user.setOrganizations(orgService.findSelectedByUser(user));
	// // }
	// // selectOrgs = user.getOrganizations();
	// // }
	// for (Organization o : orgList)
	// {
	// TreeCheckedModel e = new TreeCheckedModel();
	// for (Organization check : selectOrgs)
	// {
	// if (o.getId().equals(check.getId()))
	// {
	// e.setChecked(true);
	// break;
	// }
	// }
	// e.setId(o.getId());
	// e.setSort(o.getSort());
	// e.setText(o.getText());
	// tree.add(e);
	// }
	// return tree;
	// }

	@Override
	public List<User> findUserByCustomId(String customId, String username)
	{
		return customService.findUserByCustomId(customId);
	}
}