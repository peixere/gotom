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

    requires: [
        'Gotom.view.*'
    ],

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
        this.setHeader();
        var portal = Ext.getCmp('portal-container');
        var portalPanel = Ext.create("Gotom.view.PortalPanel",
            {
                id : 'app-portal',
                region : 'center',
                title : "我的桌面",
                layout : 'column'
            });
        //var tabPanel = Ext.getCmp('tabPanel');
        var tabPanel = Ext.create('Ext.tab.Panel',
            {
                id : 'tabPanel',
                region : 'center',
                activeTab : 0,
                enableTabScroll : true,
                animScroll : true,
                border : true,
                autoScroll : true,
                split : true,
                items : [ portalPanel]
            });
        portal.add(tabPanel);
        this.setOptions();
        this.onLoadIndex('');
        var footer = Ext.getCmp('app-footer');
        footer.setHeight(0);
    },

    onLoadIndex: function(data) {
        var me = this;
        var tabPanel = Ext.getCmp('tabPanel');
        var portalPanel = Ext.getCmp('app-portal');
        tabPanel.setLoading('加载数据...');
        //tabPanel.add(portalPanel);
        Ext.defer(function()
        {
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
            tabPanel.setLoading(false);
        }, 100);
    },

    setHeader: function() {
        me = this;
        Common.ajax({
            //component : Ext.getCmp('app-header'),
            message : '加载头信息...',    
            url : ctxp+'/p/main!main.do',
            callback : me.callbackHeader
        });
        Ext.defer(function(){me.setHeader();}, 60000);
    },

    callbackHeader: function(data) {
        var header = Ext.getCmp('app-header');
        header.setLoading(false);
        Ext.getCmp('app-viewport').setLoading(false);
        var image = ctxp+'/resources/icons/fam/topbg.jpg';
        if(!Ext.isEmpty(data.topbgUrl))
        {
            image = ctxp+data.topbgUrl;
        }
        header.setBodyStyle('background-image','url('+image+')');
        var imlogo = ctxp+'/resources/icons/logo.png';
        if(!Ext.isEmpty(data.logoUrl))
        {
            imlogo = ctxp+data.logoUrl;
        }
        document.title = data.title;
        var style = 'color: red;';
        if(!Ext.isEmpty(data.fontStyle))
        {
            style = data.fontStyle;
        }
        var htmlStr = '';
        htmlStr += '<div class="logoPanel"><img src="'+imlogo+'" border="0"/></div>';
        htmlStr += '<div class="titlePanel"><font style="'+style+'">' + data.title + '</font></div>';
        htmlStr += '<div class="userPanel">';
        htmlStr += '<font style="'+style+'">欢迎您：</font><a href="#" style="'+style+'">' + data.userFullname + '</a>　';
        htmlStr += '<a style="'+style+'" href="javascript:Ext.getCmp(\'app-viewport\').settingPassword();">修改密码</a>　';
        htmlStr += '<a style="'+style+'" href="' + data.logoutUrl + '">注销登录</a>';
        htmlStr += '</div>';
        header.update(htmlStr);
    },

    setOptions: function() {
        var me = this;
        var options = Ext.getCmp('app-options');
        Ext.defer(function()
        {
            Common.ajax(
            {
                component : options,
                message : '加载菜单...',
                url : ctxp+'/p/main!menu.do',
                callback : me.callbackOptions

            });
        }, 100);
    },

    callbackOptions: function(data) {
        var options = Ext.getCmp('app-options');
        options.removeAll();
        var me = Ext.getCmp('app-viewport');
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
    },

    onOptionsItemClick: function(view, node) {
        var me = Ext.getCmp('app-viewport');
        var tabPanel = Ext.getCmp('tabPanel');
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
        this.setOptions();
    },

    settingPassword: function() {
        //Ext.Msg.alert('修改密码');
        if (!this.passWin)
        {
            this.passWin = Ext.create('Gotom.view.UserPassowrd');
        }
        this.passWin.show();
    }

});