/*
 * File: classes/view/BuildingShartsPanel.js
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

Ext.define('ems.view.BuildingShartsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.BuildingShartsPanel',

    id: 'BuildingShartsPanel',
    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    region: 'west',
                    split: true,
                    id: 'BuildingShartsTreePanel',
                    maxWidth: 400,
                    minWidth: 100,
                    width: 150,
                    collapsed: false,
                    collapsible: true,
                    title: '建筑能耗报表',
                    store: 'BuildingShartsTreeStore',
                    rootVisible: false,
                    viewConfig: {

                    },
                    listeners: {
                        itemclick: {
                            fn: me.onBuildingShartsTreePanelItemClick,
                            scope: me
                        }
                    },
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
                    xtype: 'panel',
                    region: 'center',
                    id: 'CenterPanel',
                    layout: {
                        type: 'border'
                    },
                    items: [
                        {
                            xtype: 'form',
                            region: 'north',
                            height: 101,
                            id: 'FormPanel',
                            layout: {
                                type: 'absolute'
                            },
                            bodyPadding: 10,
                            collapsed: false,
                            collapsible: true,
                            header: false,
                            title: '查询条件',
                            titleCollapse: false,
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    id: 'toolbar',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: 'btnRed',
                                            iconCls: 'icon-refresh',
                                            text: '刷新',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtnRedClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'btnSearch',
                                            iconCls: 'icon-search',
                                            text: '查询',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtnSearchClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            items: [
                                {
                                    xtype: 'textfield',
                                    x: 10,
                                    y: 10,
                                    id: 'name',
                                    width: 380,
                                    fieldLabel: '建筑标识',
                                    labelAlign: 'right',
                                    labelWidth: 80,
                                    name: 'id'
                                },
                                {
                                    xtype: 'datefield',
                                    x: 10,
                                    y: 40,
                                    id: 'startDate',
                                    width: 220,
                                    fieldLabel: '查询时间',
                                    labelAlign: 'right',
                                    labelWidth: 80
                                },
                                {
                                    xtype: 'datefield',
                                    x: 230,
                                    y: 40,
                                    id: 'endDate',
                                    width: 160,
                                    fieldLabel: '至',
                                    labelAlign: 'right',
                                    labelSeparator: ' ',
                                    labelWidth: 20
                                },
                                {
                                    xtype: 'hiddenfield',
                                    x: 417,
                                    y: 13,
                                    id: 'id',
                                    fieldLabel: 'Label'
                                }
                            ],
                            listeners: {
                                afterlayout: {
                                    fn: me.onFormPanelAfterLayout,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            region: 'center',
                            html: '<iframe width="100%" height="100%" frameborder="0" src="chart.html"></iframe>',
                            id: 'ContentPanel'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onBuildingShartsTreePanelItemClick: function(dataview, record, item, index, e, eOpts) {

        Ext.getCmp('name').setValue(record.data.text);
        Ext.getCmp('id').setValue(record.data.id);
    },

    onToolClick: function(tool, e, eOpts) {
        Ext.getCmp('BuildingShartsTreePanel').getStore().reload();
    },

    onBtnRedClick: function(button, e, eOpts) {
        window.location.reload();
    },

    onBtnSearchClick: function(button, e, eOpts) {
        var id = Ext.getCmp('id').getValue();
        var name = Ext.getCmp('name').getValue();
        var startDate = Ext.getCmp('startDate').getValue();
        var endDate = Ext.getCmp('endDate').getValue();
        var url = 'chart.html?id='+id+'&name='+name+'&startDate='+startDate+'&endDate='+endDate;
        alert(url);
        var html = '<iframe width="100%" height="100%" frameborder="0" src="'+url+'"></iframe>';
        Ext.getCmp('ContentPanel').update(html);

    },

    onFormPanelAfterLayout: function(container, layout, eOpts) {
        Ext.getCmp('startDate').setValue(new Date());
        Ext.getCmp('endDate').setValue(new Date());
    }

});