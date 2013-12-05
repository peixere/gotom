package cn.gotom.client.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.StringTokenizer;

class StringUtils
{
	public static String[] tokenizeToStringArray(String str, String delimiters, boolean trimTokens, boolean ignoreEmptyTokens)
	{

		if (str == null)
		{
			return null;
		}
		StringTokenizer st = new StringTokenizer(str, delimiters);
		List<String> tokens = new ArrayList<String>();
		while (st.hasMoreTokens())
		{
			String token = st.nextToken();
			if (trimTokens)
			{
				token = token.trim();
			}
			if (!ignoreEmptyTokens || token.length() > 0)
			{
				tokens.add(token);
			}
		}
		return toStringArray(tokens);
	}

	public static String[] toStringArray(Collection<String> collection)
	{
		if (collection == null)
		{
			return null;
		}
		return collection.toArray(new String[collection.size()]);
	}

	public static boolean hasLength(CharSequence str)
	{
		return (str != null && str.length() > 0);
	}

	public static int countOccurrencesOf(String str, String sub)
	{
		if (str == null || sub == null || str.length() == 0 || sub.length() == 0)
		{
			return 0;
		}
		int count = 0;
		int pos = 0;
		int idx;
		while ((idx = str.indexOf(sub, pos)) != -1)
		{
			++count;
			pos = idx + sub.length();
		}
		return count;
	}

	public static boolean hasText(CharSequence str)
	{
		if (!hasLength(str))
		{
			return false;
		}
		int strLen = str.length();
		for (int i = 0; i < strLen; i++)
		{
			if (!Character.isWhitespace(str.charAt(i)))
			{
				return true;
			}
		}
		return false;
	}
}