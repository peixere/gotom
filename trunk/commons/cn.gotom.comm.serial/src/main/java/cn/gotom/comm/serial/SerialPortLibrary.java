package cn.gotom.comm.serial;

import java.io.IOException;
import java.util.Map;

import javax.comm.SerialPort;

import org.apache.log4j.Logger;

import cn.gotom.util.ClassLoaderUtils;
import cn.gotom.util.FileUtils;
import cn.gotom.util.SystemProperty;

public class SerialPortLibrary
{
	protected static final Logger log = Logger.getLogger(SerialPortLibrary.class);

	private final static String javaHome = SystemProperty.java_home;

	public static boolean init() throws IOException
	{
		Map<?, ?> map = System.getProperties();
		String systemProperties = "";
		for (Object key : map.keySet())
		{
			systemProperties += key + "=" + map.get(key) + "\n";
		}
		log.debug(systemProperties);
		System.out.println(systemProperties);
		boolean flag = false;
		switch (SystemProperty.os)
		{
			case SunOS:
				flag = sunos();
				break;
			case MacOS:
				flag = macos();
				break;
			case Linux:
				flag = linux();
				break;
			case Windows:
				flag = win();
				break;
			default:
				break;
		}
		return flag;
	}

	private static boolean sunos() throws IOException
	{
		String fromfile;
		String tofile;
		fromfile = getFile("native/sunos/javax.comm.properties");
		tofile = javaHome + "/lib/javax.comm.properties";
		FileUtils.cover(fromfile, tofile);
		if (SystemProperty.os_arch.indexOf("x86") > -1)
		{
			fromfile = getFile("native/sunos/comm3x86/libSolarisSerialParallel.so");
			tofile = javaHome + "/lib/i386/libSolarisSerialParallel.so";
			FileUtils.cover(fromfile, tofile);
			return true;
		}
		else if (SystemProperty.os_arch.indexOf("sparc") > -1)
		{
			fromfile = getFile("native/sunos/comm3sparc/libSolarisSerialParallel.so");
			tofile = javaHome + "/lib/i386/libSolarisSerialParallel.so";
			FileUtils.cover(fromfile, tofile);
			return true;
		}
		else if (SystemProperty.os_arch.indexOf("i586") > -1)
		{
			fromfile = getFile("native/sunos/comm3i586/libSolarisSerialParallel.so");
			tofile = javaHome + "/lib/i386/libSolarisSerialParallel.so";
			FileUtils.cover(fromfile, tofile);
			return true;
		}
		return false;
	}

	private static boolean linux() throws IOException
	{
		String fromfile;
		String tofile;
		if (SystemProperty.os_arch.indexOf("x86") > -1)
		{
			if (SystemProperty.arch_data_model.indexOf("64") > -1)
			{
				fromfile = getFile("native/linux/x86_64/rxtxSerial.dll");
				tofile = javaHome + "/lib/i386/rxtxSerial.dll";
				FileUtils.cover(fromfile, tofile);
				return true;
			}
			else
			{
				fromfile = getFile("native/linux/i686/rxtxParallel.dll");
				tofile = javaHome + "/lib/i386/rxtxParallel.dll";
				FileUtils.cover(fromfile, tofile);
				fromfile = getFile("native/linux/i686/rxtxSerial.dll");
				tofile = javaHome + "/lib/i386/rxtxSerial.dll";
				FileUtils.cover(fromfile, tofile);
				return true;
			}
		}
		else if (SystemProperty.os_arch.indexOf("ia64") > -1)
		{
			fromfile = getFile("native/linux/ia64/rxtxSerial.dll");
			tofile = javaHome + "/lib/i386/rxtxSerial.dll";
			FileUtils.cover(fromfile, tofile);
			return true;
		}
		else
		{
			fromfile = getFile("native/linux/i686/rxtxParallel.dll");
			tofile = javaHome + "/lib/i386/rxtxParallel.dll";
			FileUtils.cover(fromfile, tofile);
			fromfile = getFile("native/linux/i686/rxtxSerial.dll");
			tofile = javaHome + "/lib/i386/rxtxSerial.dll";
			FileUtils.cover(fromfile, tofile);
			return true;
		}
	}

	private static boolean macos() throws IOException
	{
		String fromfile;
		String tofile;
		fromfile = getFile("native/macos/librxtxSerial.jnilib");
		tofile = javaHome + "/Library/Java/Extensions/librxtxSerial.jnilib";
		FileUtils.cover(fromfile, tofile);
		return true;
	}

	private static boolean win() throws IOException
	{
		String fromfile;
		String tofile;
		if (SystemProperty.os_arch.indexOf("x86") > -1)
		{
			if (SystemProperty.arch_data_model.indexOf("32") > -1)
			{
				fromfile = getFile("native/win/x86_32/rxtxParallel.dll");
				tofile = javaHome + "/bin/rxtxParallel.dll";
				FileUtils.cover(fromfile, tofile);
				fromfile = getFile("native/win/x86_32/rxtxSerial.dll");
				tofile = javaHome + "/bin/rxtxSerial.dll";
				FileUtils.cover(fromfile, tofile);
				return true;
			}
			else if (SystemProperty.arch_data_model.indexOf("64") > -1)
			{
				fromfile = getFile("native/win/x86_64/rxtxParallel.dll");
				tofile = javaHome + "/bin/rxtxParallel.dll";
				FileUtils.cover(fromfile, tofile);
				fromfile = getFile("native/win/x86_64/rxtxSerial.dll");
				tofile = javaHome + "/bin/rxtxSerial.dll";
				FileUtils.cover(fromfile, tofile);
				return true;
			}
		}
		return false;
	}

	public static String getFile(String args)
	{
		//SerialPortLibrary.class.getProtectionDomain().getCodeSource().getLocation().getPath()
		return SerialPortLibrary.class.getClassLoader().getResource(args).getFile();
	}

	public static void main(String[] args)
	{
		// File fs = new File("c:\\core.jar");
		System.out.println(ClassLoaderUtils.getDomainPath(SerialPort.class));
	}
}
