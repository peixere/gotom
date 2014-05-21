/*
 * File: classes/view/Portal.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Gotom.view.Portal', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Portal',

    passWin: '',
    border: false,
    id: 'app-viewport',
    layout: {
        padding: '0 5 5 5',
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    border: false,
                    height: 60,
                    id: 'app-header',
                    layout: {
                        animate: false,
                        type: 'accordion'
                    },
                    animCollapse: false,
                    header: false,
                    title: ''
                },
                {
                    xtype: 'container',
                    region: 'center',
                    border: false,
                    id: 'portal-container',
                    layout: {
                        type: 'border'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'west',
                            split: true,
                            id: 'app-options',
                            maxWidth: 450,
                            minWidth: 100,
                            width: 180,
                            layout: {
                                animate: true,
                                type: 'accordion'
                            },
                            animCollapse: true,
                            collapsible: true,
                            title: '系统菜单',
                            tools: [
                                {
                                    xtype: 'tool',
                                    type: 'refresh',
                                    listeners: {
                                        click: {
                                            fn: me.onToolClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            region: 'center',
                            split: true,
                            id: 'tabPanel'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'south',
                    split: false,
                    border: false,
                    height: 1,
                    id: 'app-footer',
                    shrinkWrap: 0,
                    layout: {
                        type: 'border'
                    }
                }
            ],
            listeners: {
                afterlayout: {
                    fn: me.onPortalVIewPanelAfterLayout,
                    single: true,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onToolClick: function(tool, e, eOpts) {
        this.onOptionsToolClick(tool,e,eOpts);
    },

    onPortalVIewPanelAfterLayout: function(container, layout, eOpts) {
        this.onLoad();
    },

    createTools: function() {
        return [
        {
            xtype : 'tool',
            type : 'gear',
            handler : function(e, target, header, tool)
            {
                var portlet = header.ownerCt;
                portlet.setLoading(portlet.id + 'Loading...');
                Ext.defer(function()
                {
                    portlet.setLoading(false);
                }, 1000);
            }
        }
        ];
    },

    onPortletClose: function(portlet) {
        alert('"' + portlet.title + '" was removed');
    },

    onLoad: function() {
        var me = this;
        me.headerPanel = Ext.getCmp('app-header');
        me.footerPanel = Ext.getCmp('app-footer');
        me.options = Ext.getCmp('app-options');
        me.tabPanel = Ext.getCmp('tabPanel');
        me.loadHeader();
        me.loadOptions();
        me.loadDesktop(desktopPanel);
        me.footerPanel.setHeight(0);
    },

    loadDesktop: function(name) {
        var me = this;
        try{  
            if(Ext.isEmpty(name))
            {
                this.loadIndex();
            }else{
                var desktop = Ext.create(name,
                    {
                        region : 'center',
                        title : '我的桌面'
                    });    
                    me.tabPanel.add(desktop);
                me.tabPanel.setActiveTab(desktop);    
            }
        }catch(error){Ext.Msg.alert('操作提示',error);}
    },

    loadHeader: function() {
        me = this;
        try{
            Common.ajax({
                component : me.headerPanel,
                message : '加载头信息...',    
                url : ctxp+'/p/main!main.do',
                callback : function(result){me.setHeader(result);}
            });
        }catch(error){Ext.Msg.alert('异常提示',error);}
            Ext.defer(function(){me.loadHeader();}, 60000);
    },

    setHeader: function(result) {
        try{
            var me = this;
            var header = me.headerPanel;
            var data = result.data;
            header.setLoading(false);
            me.setLoading(false);
            var image = ctxp+'/resources/icons/fam/topbg.jpg';
            if(!Ext.isEmpty(data.topbgId))
            {
                image = ctxp+'/download?id='+data.topbgId;
            }
            header.setBodyStyle('background-image','url('+image+')');
            var imlogo = ctxp+'/resources/icons/logo.png';
            if(!Ext.isEmpty(data.logoId))
            {
                imlogo = ctxp+'/download?id='+data.logoId;
            }
            document.title = data.title;
            var style = 'color: red;';
            if(!Ext.isEmpty(data.fontStyle))
            {
                style = data.fontStyle;
            }
            var htmlStr = '';
            htmlStr += '<div class="logoPanel"><img onclick="Ext.defer(function(){Ext.getCmp(\'app-viewport\').loadHeader();}, 100);" src="'+imlogo+'" border="0"/></div>';
            htmlStr += '<div class="titlePanel"><font style="'+style+'">' + data.title + '</font></div>';
            htmlStr += '<div class="userPanel">';
            htmlStr += '<font style="'+style+'">欢迎您：</font><a href="#" style="'+style+'">' + data.userFullname + '</a>　';
            htmlStr += '<a style="'+style+'" href="javascript:Ext.getCmp(\'app-viewport\').settingPassword();">修改密码</a>　';
            htmlStr += '<a style="'+style+'" href="' + data.logoutUrl + '">注销登录</a>';
            htmlStr += '</div>';
            header.update(htmlStr);
        }catch(error){Ext.Msg.alert('异常提示',error);}    
    },

    loadOptions: function() {
        var me = this;
        try{
            Common.ajax(
            {
                component : me.options,
                message : '加载菜单...',
                url : ctxp+'/p/main!menu.do',
                callback : function(result){me.setOptions(result);}
            });
        }catch(error){Ext.Msg.alert('异常提示',error);}    
            Ext.defer(function(){me.loadOptions();}, 60000);
    },

    setOptions: function(data) {
        var me = this;
        try{
            var options = me.options;
            options.removeAll();
            var URL = ctxp+'/p/main!menu.do';
            for (var i = 0; i < data.length; i++)
            {    
                var treeStore = Common.createTreeStore(URL, data[i].id);     
                var tree = Ext.create("Ext.tree.Panel",
                    {
                        id : data[i].id,
                        title : data[i].text,
                        iconCls : data[i].iconCls,
                        // useArrows: true,
                        autoScroll : true,
                        rootVisible : false,
                        viewConfig :
                        {
                            loadingText : "正在加载..."
                        },
                        store : treeStore,
                        listeners : {
                            itemclick: {
                                fn: me.onOptionsItemClick,
                                scope: me
                            }
                        }
                    });    
                    options.add(tree);
            }
            options.doLayout();
        }catch(error){Ext.Msg.alert('异常提示',error);}    
    },

    onOptionsItemClick: function(view, node) {
        var me = this;
        var tabPanel = me.tabPanel;
        var has = false;
        for (var i = 0; i < tabPanel.items.length; i++)
        {
            if (tabPanel.items.get(i).id == node.data.id)
            {
                has = true;
                tabPanel.setActiveTab(tabPanel.items.get(i));
                break;
            }
        }
        if (has)
        {
            return;
        }
        try{
            if (node.isLeaf())
            {// 判断是否是根节点
                if (node.data.type === 'URL')
                {// 判断资源类型
                    var theme = Common.getQueryParam('theme');
                    var url = Common.addQueryParam(node.data.component, 'theme', theme);
                    var panel = Ext.create('Ext.panel.Panel',
                        {
                            id : node.data.id,
                            title : node.data.text,
                            closable : true,
                            // iconCls : 'icon-activity',
                            html : '<iframe width="100%" height="100%" frameborder="0" src="' + url + '"></iframe>'
                        });
                    tabPanel.add(panel);
                    tabPanel.setActiveTab(panel);
                }
                else if (node.data.type === 'COMPONENT')
                {
                    var component = Ext.create(node.data.component,
                        {
                            id : node.data.id,
                            title : node.data.text,
                            closable : true
                            // iconCls : 'icon-activity'
                        });
                    tabPanel.add(component);
                    tabPanel.setActiveTab(component);
                }
            }
        }
        catch(err)
        {
            Ext.Msg.alert('错误',err);
        }
    },

    onOptionsToolClick: function(tool, e, eOpts) {
        this.loadOptions();
    },

    settingPassword: function() {
        //Ext.Msg.alert('修改密码');
        if (!this.passWin)
        {
            this.passWin = Ext.create('Gotom.view.UserPassowrd');
        }
        this.passWin.show();
    },

    loadIndex: function() {
        var me = this;
        try{
            var portalPanel = Ext.create("Gotom.view.PortalPanel",
                {
                    id : 'app-portal',
                    region : 'center',
                    title : "我的桌面",
                    layout : 'column'
                });
            var portalcolumn = Ext.create('Gotom.view.PortalColumn',
                {
                    columnWidth : 0.7,
                    items : [
                    {
                        title : '最新通知',
                        height : 150,
                        tools : me.createTools(),
                        listeners :
                        {
                            'close' : Ext.bind(me.onPortletClose, this)
                        }
                    },
                    {
                        title : '业绩报表',
                        height : 250,
                        tools : me.createTools(),
                        items : Ext.create('Gotom.view.ChartPortlet'),
                        listeners :
                        {
                            'close' : Ext.bind(me.onPortletClose, this)
                        }
                    }
                    ]
                });
            portalPanel.add(portalcolumn);
            var portalcolumn2 = Ext.create('Gotom.view.PortalColumn',
                {
                    columnWidth : 0.3,
                    items : [
                    {
                        title : '功能链接',
                        height : 150,
                        tools : me.createTools(),
                        listeners :
                        {
                            'close' : Ext.bind(me.onPortletClose, this)
                        }
                    },
                    {
                        title : '待办事项',
                        height : 150,
                        tools : me.createTools(),
                        listeners :
                        {
                            'close' : Ext.bind(me.onPortletClose, this)
                        }
                    },
                    {
                        title : '业绩报表',
                        height : 250,
                        tools : me.createTools(),
                        items : Ext.create('Gotom.view.ChartPortlet'),
                        listeners :
                        {
                            'close' : Ext.bind(me.onPortletClose, this)
                        }
                    }
                    ]
                });
            portalPanel.add(portalcolumn2);    
            me.tabPanel.add(portalPanel);
            me.tabPanel.setActiveTab(portalPanel);    
        }catch(error){Ext.Msg.alert('操作提示',error);}
    }

});