package cn.gotom.service;

import java.util.Enumeration;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

import org.apache.log4j.Logger;

import cn.gotom.pojos.Custom;
import cn.gotom.pojos.User;
import cn.gotom.util.PasswordEncoder;

import com.google.inject.Inject;

public class DataInitializeServiceImpl implements DataInitializeService
{
	protected final Logger log = Logger.getLogger(getClass());

	@Inject
	UniversalService universalService;

	@Inject
	PasswordEncoder passwordEncoder;

	@Inject
	private UserService userService;

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
					if (universalService.findAll(clazz).size() == 0)
					{
						String rightString = bundle.getString(key);
						JSON json = JSONSerializer.toJSON(rightString);
						JsonConfig jsonConfig = new JsonConfig();
						jsonConfig.setRootClass(clazz);
						List<?> list = (List<?>) JSONSerializer.toJava(json, jsonConfig);
						universalService.saveAll(list);
					}
				}
				catch (Exception ex)
				{
					log.error("初始化数据异常 " + key, ex);
				}
			}
		}
		catch (Exception ex)
		{
			log.error("初始化数据异常", ex);
		}
	}
}
