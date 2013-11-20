/*
 * File: classes/view/YearReportPanel.js
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

Ext.define('ems.view.YearReportPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.YearReportPanel',

    requires: [
        'ems.model.YearReportDataModel'
    ],

    id: 'YearReportPanel',
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
                    id: 'BuildingTreePanel',
                    maxWidth: 400,
                    minWidth: 100,
                    width: 150,
                    collapsed: false,
                    collapsible: true,
                    title: '年报表查询',
                    store: 'BuildingTreeStore',
                    rootVisible: false,
                    viewConfig: {

                    },
                    listeners: {
                        itemclick: {
                            fn: me.onBuildingTreePanelItemClick,
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
                                    y: 40,
                                    id: 'name',
                                    width: 380,
                                    fieldLabel: '建筑标识',
                                    labelAlign: 'right',
                                    labelWidth: 80,
                                    name: 'name'
                                },
                                {
                                    xtype: 'datefield',
                                    x: 10,
                                    y: 10,
                                    id: 'startDate',
                                    width: 220,
                                    fieldLabel: '查询时间',
                                    labelAlign: 'right',
                                    labelWidth: 80,
                                    name: 'startDate',
                                    format: 'Y'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    x: 417,
                                    y: 13,
                                    id: 'buildingId',
                                    fieldLabel: 'Label',
                                    name: 'buildingId'
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
                            id: 'ContentPanel',
                            layout: {
                                type: 'border'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    region: 'center',
                                    id: 'YearReportGrid',
                                    title: '查询结果',
                                    store: 'YearReportStore',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            id: 'ConsumptionClass',
                                            dataIndex: 'ConsumptionClass',
                                            text: '能源消耗量'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            id: 'JanValue',
                                            dataIndex: 'JanValue',
                                            text: '1月'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            id: 'FebValue',
                                            dataIndex: 'FebValue',
                                            text: '2月'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            id: 'MarValue',
                                            dataIndex: 'MarValue',
                                            text: '3月'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            id: 'AprValue',
                                            dataIndex: 'AprValue',
                                            text: '4月'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            id: 'MayValue',
                                            dataIndex: 'MayValue',
                                            text: '5月'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            id: 'JuneValue',
                                            dataIndex: 'JuneValue',
                                            text: '6月'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            id: 'JulyValue',
                                            dataIndex: 'JulyValue',
                                            text: '7月'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            id: 'AugValue',
                                            dataIndex: 'AugValue',
                                            text: '8月'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            dataIndex: 'SeptValue',
                                            text: '9月'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            id: 'OctValue',
                                            dataIndex: 'OctValue',
                                            text: '10月'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            id: 'NovValue',
                                            dataIndex: 'NovValue',
                                            text: '11月'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            id: 'DecValue',
                                            dataIndex: 'DecValue',
                                            text: '12月'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onBuildingTreePanelItemClick: function(dataview, record, item, index, e, eOpts) {
        Ext.getCmp('name').setValue(record.data.text);
        Ext.getCmp('buildingId').setValue(record.data.id);
    },

    onToolClick: function(tool, e, eOpts) {
        var store = Ext.getCmp('BuildingTreePanel').getStore();
        store.getRootNode().removeAll();
        store.load();
    },

    onBtnRedClick: function(button, e, eOpts) {
        window.location.reload();
    },

    onBtnSearchClick: function(button, e, eOpts) {
        var me = this;
        var form = Ext.getCmp('FormPanel');
        if (form.isValid())
        {
            form.submit({
                url : '../YearReport.do',
                method : 'POST',
                waitMsg : '正在生成报表，稍后...',
                success : function(f, action)
                {
                    var result = Ext.JSON.decode(action.response.responseText);
                    me.loadGridData(result.data);
                    //me.showHighcharts(result.data);
                },
                failure : function(f, action)
                {
                    if(action.response.status == 200)
                    {
                        var result = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('信息提示', result.data);
                    }
                    else
                    {
                        Ext.Msg.alert('信息提示', action.response.responseText);
                    }
                }
            });
        }
    },

    onFormPanelAfterLayout: function(container, layout, eOpts) {
        Ext.getCmp('startDate').setValue(new Date()); 
    },

    loadGridData: function(data) {
        var jsonStore = Ext.create('Ext.data.Store', {
            storeId:'jsonStore',
            model: 'ems.model.YearReportDataModel',
            data : data,
            proxy:
            {
                type: 'memory',
                reader:{
                    type: 'json'
                }
            }    
        });
        Ext.getCmp('GataGridPanel').bindStore(jsonStore);           
    }

});