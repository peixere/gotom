/**
 * author 裴绍国
 * 
 * @class Ext.app.PortalView
 * @extends Object A sample portal layout application class.
 */

// @require @packageOverrides
Ext.define('Ext.app.PortalView',
{
    extend : 'Ext.container.Viewport',
    alias: 'PortalView',
    requires : [ 'Ext.app.PortalPanel', 'Ext.app.PortalColumn', 'Ext.app.GridPortlet', 'Ext.app.ChartPortlet'
    ],
    getTools : function()
    {
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
		}, 2000);
	    }
	}
	];
    },

    onPortletClose : function(portlet)
    {
	alert('"' + portlet.title + '" was removed');
    },

    onloadPortal : function(portal)
    {
	portal.setLoading(panel.id + 'Loading...');
	Ext.defer(function()
	{
	    portal.setLoading(false);
	}, 2000);
    },

    setContent : function(content)
    {
	if (this.items.get(1).items.length <= 2)
	{
	    return this.items.get(1).add(content);
	}
    },
    header : Ext.create("Ext.panel.Panel",
    {
	id : 'app-header',
	region : 'north',
	border : false,
	split : false
    }),
    menus : Ext.create("Ext.panel.Panel",
    {
	id : 'app-options',
	title : '系统菜单',
	region : 'west',
	animCollapse : true,
	width : 200,
	minWidth : 150,
	maxWidth : 400,
	split : true,
	collapsible : true,
	layout :
	{
	    type : 'accordion',
	    animate : true
	},
	/*
        tools: [
                {
                    xtype: 'tool',
                    type: 'refresh',
                    listeners: {
                        click: function(tool, e, eOpts) {
                            //alert('s');
                        }
                    }
                }
        ],	
        */
	listeners : {
	// afterrender : Ext.bind(this.onLoadMenus, this)
	}
    }),

    initComponent : function()
    {
	Ext.apply(this,
	{
	    id : 'app-viewport',
	    layout :
	    {
		type : 'border',
		padding : '0 5 5 5'
	    },
	    items : [ this.header, {
		    xtype : 'container',
		    region : 'center',
		    layout : 'border',
		    items : [ this.menus]
		}
	    ]
	});
	this.callParent(arguments);
    }
});