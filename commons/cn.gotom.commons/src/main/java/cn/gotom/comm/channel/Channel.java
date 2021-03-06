package cn.gotom.comm.channel;

import java.io.IOException;

import cn.gotom.annotation.Description;
import cn.gotom.commons.Listener;

/**
 * 通道接口
 * 
 * @author <a href="mailto:pqixere@qq.com">裴绍国</a>
 * @version 2013-10-16
 */
@Description("通道接口")
public interface Channel extends java.io.Serializable
{

	@Description("获取通道参数")
	Parameters getParameters();

	@Description("设置通道参数")
	void setParameters(Parameters parameters);

	@Description("通道Id")
	String getId();

	boolean connected();

	@Description("连接通道")
	void connect() throws IOException;

	@Description("设置读数据监听器")
	void setReceiveListener(Listener<byte[]> listener);

	@Description("写数据到通道")
	void write(byte[] bytes) throws IOException;

	@Description("关闭")
	void close();

	@Description("设置通道事件")
	void setStateListener(Listener<State> stateListener);

	@Description("+通道事件")
	void addStateListener(Listener<State> stateListener);

	@Description("-通道事件")
	void removeStateListener(Listener<State> stateListener);

	@Description("获取报文监听器")
	Listener<String> getMessageListener();

	@Description("设置报文监听器")
	void setMessageListener(Listener<String> messageListener);

	State getState();

	@Description("获取通道检测周期（毫秒）")
	long getCheckPeriod();

	@Description("设置通道检测周期（毫秒）")
	void setCheckPeriod(long checkPeriod);
}