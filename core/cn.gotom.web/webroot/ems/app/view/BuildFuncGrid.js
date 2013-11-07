/*
 * File: app/view/BuildFuncGrid.js
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

Ext.define('MyApp.view.BuildFuncGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.BuildFuncGrid',

    height: 359,
    id: 'BuildFuncGrid',
    width: 468,
    frameHeader: false,
    title: '建筑类别管理',
    enableColumnHide: false,
    enableColumnMove: false,
    store: 'BuildingFuncStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    id: 'bfToolBar',
                    items: [
                        {
                            xtype: 'button',
                            id: 'btnRef',
                            iconCls: 'icon-refresh',
                            text: '刷新',
                            listeners: {
                                click: {
                                    fn: me.onBtnRefClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            id: 'btnNew',
                            iconCls: 'icon-add',
                            text: '新增',
                            listeners: {
                                click: {
                                    fn: me.onBtnNewClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            id: 'btnEdit',
                            iconCls: 'icon-edit',
                            text: '修改',
                            listeners: {
                                click: {
                                    fn: me.onBtnEditClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            id: 'btnDel',
                            iconCls: 'icon-del',
                            text: '删除',
                            listeners: {
                                click: {
                                    fn: me.onBtnDelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'code',
                    text: '编码'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: '名称'
                }
            ]
        });

        me.callParent(arguments);
    },

    onBtnRefClick: function(button, e, eOpts) {
        window.location.reload();
    },

    onBtnNewClick: function(button, e, eOpts) {
        var selected=this.getSelectionModel().selected;
        var record=selected.items[0];
        var id='';
        if(!Ext.isEmpty(record))
        {
            id=record.data.id;
        }
        this.openWinForm(id);
    },

    onBtnEditClick: function(button, e, eOpts) {
        var selected = this.getSelectionModel().selected;
        var record = selected.items[0];
        if(!Ext.isEmpty(record))
        {
            this.openWinForm(record.data.id);
        }
    },

    onBtnDelClick: function(button, e, eOpts) {
        var selected = this.getSelectionModel().selected;
        var selecteditems = selected.items;

        if (selecteditems.length == 0)
        {
            Ext.Msg.show(
            {
                title : "操作提示",
                msg : "请选择要删除的节点!",
                icon : Ext.Msg.WARNING
            });
            return;
        }
        var ids = [];
        Ext.each(selecteditems, function()
        {
            var nd = this;
            ids.push(nd.data.id);
        });
        Ext.Msg.confirm("警告", "确定要删除吗？", function(button)
        {
            if (button == "yes")
            {
                Ext.Msg.wait("正在执行......", "操作提示");
                Ext.Ajax.request(
                {
                    url : '../ems/buildfunc!remove.do',
                    method : 'POST',
                    params :
                    {
                        id : ids.join(",")
                    },
                    success : function(response, options)
                    {
                        Ext.Msg.alert("删除提示", "删除成功");
                        window.location.reload();
                    },
                    failure : function(response, options)
                    {
                        Ext.Msg.alert("删除提示", "删除失败");
                    }
                });
            }
        });
    }

});