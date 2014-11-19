Ext.define('Common', {
    extend: 'Ext.Base',
    alias: 'widget.Common',

    statics: {
        onAjaxException: function(response, component) {
            if(component)
            {
                if(response.status === 403){
                    component.close();
                }
            }
            Common.onException(response);
        },

        onProxyException: function(proxy, response, operation, eOpts) {
        	Common.onException(response);
        },
        
        onException: function(response) {
        	portal.showNotice({title:'操作提示',html:response.responseText});
            if(response.status === 0)
            {
                Ext.MessageBox.show({
                    title:'无法连接 ',
                    msg:response,
                    icon:Ext.MessageBox.ERROR 
                });
            }
            else if(response.status === 200)
            {
                var result = Ext.JSON.decode(response.responseText);
                portal.showNotice({title:'操作异常',html:result.data});
            }
            else if(response.status === 401)
            {
                window.location.href = ctxp;
            }
            else if(response.status === 403)
            {
            	portal.showNotice({title:'无操作权限',html:response.responseText});
            }
            else
            {
            	portal.showNotice({title:'操作提示',html:response.responseText}); 
            }
        },
        bindStore: function(config) {
            var myStore = Ext.create("Ext.data.JsonStore", {
			    autoLoad: true,
			    model: config.model,
			    proxy: {
			        type: "ajax",
			        actionMethods: 'post',
			        url: config.url,
			        reader: {
			            type: 'json',
			            root: 'data'
			        },
			        listeners: {
			            exception: function(proxy, response, operation, eOpts) {
			                Common.onAjaxException(response, me);
			            }
			        }
			    },
			    listeners: {
			        beforeload: {
			            fn: function() {
			                mask.show();
			            }
			        }
			    }
			});
			var mask = new Ext.LoadMask(config.component, {
			    msg: config.message,
			    store: myStore
			});
			config.component.bindStore(myStore);
        },        
        ajax: function(config) {
            if(config.component)
            {
                if(config.message)
                {
                    config.component.setLoading(config.message);
                }
                else
                {
                    config.component.setLoading('正在下载...');
                }
            }
            Ext.Ajax.request(
            {
                url : config.url,
                params : config.params,
                method : 'post',

                callback : function(options, success, response)
                {
                    if(config.component)
                    {
                        config.component.setLoading(false);
                    }
                    if (success)
                    {
                        config.callback(Ext.JSON.decode(response.responseText),options, success, response);// 调用回调函数
                    }
                    else
                    {
                        Common.onAjaxException(response,config.component);
                    }
                }
            });
        },

        formSubmit: function(config) {
            if (config.form.isValid())
            {
                var msg = '正在保存数据，稍后...';
                if(config.msg){
                    msg = config.msg;
                }
                config.form.submit(
                {
                    url : config.url,
                    method : 'POST',
                    waitMsg : msg,
                    success : function(f, action){
                        config.callback(action.result);// 调用回调函数
                    },
                    failure : function(f, action)
                    {
                        Common.onAjaxException(action.response);          
                    }
                });
            }
        },

        createTreeStore: function(URL, pid) {
            var store = Ext.create("Ext.data.TreeStore",
                {
                    defaultRootId : pid,
                    clearOnLoad : true,
                    nodeParam : 'id',
                    fields: [
                    {
                        name: 'id'
                    },
                    {
                        name: 'sort',
                        type: 'int'
                    },
                    {
                        name: 'text'
                    },
                    {
                        name: 'iconCls'
                    },
                    {
                        name: 'leaf',
                        type: 'boolean'
                    },
                    {
                        name: 'type'
                    },
                    {
                        name: 'resource'
                    },
                    {
                        name: 'component'
                    },
                    {
                        name: 'parentId'
                    }
                    ],
                    proxy :
                    {
                        type : 'ajax',
                        url : URL            
                    }
                });
            return store;
        },
        storeToJson: function(jsondata){  
            var listRecord;  
            if(jsondata instanceof Ext.data.Store){  
                listRecord = new Array();  
	            jsondata.each(function(record){  
	                listRecord.push(record.data);  
	            });  
            }else if(jsondata instanceof Array){  
                listRecord = new Array();  
                Ext.each(jsondata,function(record){  
                    listRecord.push(record.data);  
                });  
            }  
            return Ext.encode(listRecord);  
        },
        getQueryParam: function(name) {
            var regex = RegExp('[?&]' + name + '=([^&]*)');
            var scriptEls = document.getElementsByTagName('script');
            var path = scriptEls[scriptEls.length - 1].src;
            var match = regex.exec(location.search) || regex.exec(path);
            return match && decodeURIComponent(match[1]);
        },

        addQueryParam: function(url, name, value) {
            var path = url;
            if (value !== null && value.length > 0)
            {
                if (url.indexOf('?') >= 0)
                {
                    path = url + '&' + name + '=' + value;
                }
                else
                {
                    path = url + '?' + name + '=' + value;
                }
            }
            return path;
        },

        onTreeParentNodeChecked: function(node, checked) {
            if(node.parentNode !== null)
            {
                if(node.parentNode.childNodes.length >0)
                {
                    var parentCheck = false;
                    Ext.each(node.parentNode.childNodes,function(childNode)
                    {
                        if(childNode.data.checked)
                        {
                            parentCheck = true;
                        }
                    });
                }
                node.parentNode.set('checked', parentCheck);
                Common.onTreeParentNodeChecked(node.parentNode,checked);
            }
        },
        
        setTreeParentNodeChecked: function(node, checked) {
            if(node.parentNode !== null)
            {
                node.parentNode.set('checked', checked);
                Common.onTreeParentNodeChecked(node.parentNode,checked);
            }
        },
        
        onTreeChildNodesChecked: function(node, checked) {
            Ext.each(node.childNodes,function(childNode)
            {
                childNode.set('checked', checked);  
                if(childNode.childNodes.length >0)
                {
                    Common.onTreeChildNodesChecked(childNode,checked);
                }
            });

        },

        onTreePanelCheckChange: function(node, checked) {
            Common.onTreeChildNodesChecked(node,checked);
            Common.onTreeParentNodeChecked(node,checked);

        }
    }
});