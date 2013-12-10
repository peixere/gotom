/**
 * Copyright (C) 2010 Google, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.inject.persist.jpa;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.hibernate.ejb.Ejb3Configuration;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.google.inject.persist.PersistService;
import com.google.inject.persist.UnitOfWork;

/**
 * @author Dhanji R. Prasanna (dhanji@gmail.com)
 */
@Singleton
class JpaPersistService implements Provider<EntityManager>, UnitOfWork, PersistService
{
	private final ThreadLocal<EntityManager> entityManager = new ThreadLocal<EntityManager>();
	private final Set<Class<?>> annotatedClasses = new HashSet<Class<?>>();
	private final String persistenceUnitName;
	private final Properties persistenceProperties;

	@Inject
	public JpaPersistService(@Jpa String persistenceUnitName, @Nullable @Jpa Properties persistenceProperties)
	{
		this.persistenceUnitName = persistenceUnitName;
		this.persistenceProperties = persistenceProperties;
	}

	public EntityManager get()
	{
		if (!isWorking())
		{
			begin();
		}

		EntityManager em = entityManager.get();
		return em;
	}

	public boolean isWorking()
	{
		return entityManager.get() != null;
	}

	public void begin()
	{
		entityManager.set(emFactory.createEntityManager());
	}

	public void end()
	{
		EntityManager em = entityManager.get();

		// Let's not penalize users for calling end() multiple times.
		if (null == em)
		{
			return;
		}

		em.close();
		entityManager.remove();
	}

	private volatile EntityManagerFactory emFactory;

	@SuppressWarnings("deprecation")
	public synchronized void start()
	{
		// if (null != persistenceProperties)
		// {
		// this.emFactory = Persistence.createEntityManagerFactory(persistenceUnitName, persistenceProperties);
		// }
		// else
		// {
		// this.emFactory = Persistence.createEntityManagerFactory(persistenceUnitName);
		// }
		if (persistenceProperties != null)
		{
			if (persistenceProperties.containsKey("jdbc.driver"))
			{
				persistenceProperties.put("hibernate.connection.driver_class", persistenceProperties.get("jdbc.driver"));
			}
			if (persistenceProperties.containsKey("jdbc.url"))
			{
				persistenceProperties.put("hibernate.connection.url", persistenceProperties.get("jdbc.url"));
			}
			if (persistenceProperties.containsKey("jdbc.username"))
			{
				persistenceProperties.put("hibernate.connection.username", persistenceProperties.get("jdbc.username"));
			}
			if (persistenceProperties.containsKey("jdbc.password"))
			{
				persistenceProperties.put("hibernate.connection.password", persistenceProperties.get("jdbc.password"));
			}
		}

		Ejb3Configuration cfg = new Ejb3Configuration();
		Ejb3Configuration configured = cfg.configure(persistenceUnitName, persistenceProperties);
		for (Class<?> persistentClass : annotatedClasses)
		{
			configured.addAnnotatedClass(persistentClass);
		}
		this.emFactory = configured != null ? configured.buildEntityManagerFactory() : null;
	}

	public synchronized void stop()
	{
		emFactory.close();
	}

	@Singleton
	public static class EntityManagerFactoryProvider implements Provider<EntityManagerFactory>
	{
		private final JpaPersistService emProvider;

		@Inject
		public EntityManagerFactoryProvider(JpaPersistService emProvider)
		{
			this.emProvider = emProvider;
		}

		public EntityManagerFactory get()
		{
			assert null != emProvider.emFactory;
			return emProvider.emFactory;
		}
	}

	@Documented
	@Retention(RetentionPolicy.RUNTIME)
	@Target(ElementType.PARAMETER)
	private @interface Nullable
	{
	}

	@Override
	public void addAnnotatedClasses(Set<Class<?>> annotatedClasses)
	{
		this.annotatedClasses.addAll(annotatedClasses);
	}
}
