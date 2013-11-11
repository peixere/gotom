/*
 * File: classes/view/BuildingWin.js
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

Ext.define('ems.view.BuildingWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.BuildingWin',

    height: 315,
    width: 553,
    layout: {
        type: 'border'
    },
    title: '编辑建筑信息',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bindData: function(id) {
                        var formPanel = this;
                        var wait = Ext.Msg.wait("正在载入......", "操作提示");
                        Ext.Ajax.request(
                        {
                            url : '../build.do',
                            method : 'POST',
                            params:{  
                                id:id, 
                            },  
                            success : function(response, options)
                            {
                                var result = Ext.JSON.decode(response.responseText);
                                var record = Ext.create('ems.model.BuildingModel');
                                //result.parentId = parentId;
                                record.data = result;
                                wait.close();
                                formPanel.getForm().reset();
                                formPanel.loadRecord(record);   
                            },
                            failure : function(response, options)
                            {
                                wait.close();
                                Ext.Msg.alert("操作提示", "载入失败");
                            }
                        });
                    },
                    region: 'center',
                    id: 'BuildingEditForm',
                    layout: {
                        type: 'absolute'
                    },
                    bodyPadding: 10,
                    header: false,
                    title: 'My Form',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'code',
                            fieldLabel: '编码',
                            labelAlign: 'right',
                            labelWidth: 50,
                            name: 'code',
                            invalidText: '编码不能为空',
                            blankText: '编码不能为空'
                        },
                        {
                            xtype: 'textfield',
                            x: 190,
                            y: 10,
                            fieldLabel: '名称',
                            labelAlign: 'right',
                            labelWidth: 50,
                            name: 'name',
                            invalidText: '名称不能为空',
                            size: 100
                        },
                        {
                            xtype: 'textfield',
                            x: -18,
                            y: 40,
                            id: 'buildYear',
                            fieldLabel: '建设年代',
                            labelAlign: 'right',
                            labelWidth: 80,
                            name: 'buildYear',
                            inputType: 'number'
                        },
                        {
                            xtype: 'textfield',
                            x: 200,
                            y: 40,
                            id: 'buildFloor',
                            fieldLabel: '建筑层数（层）',
                            labelAlign: 'right',
                            name: 'buildFloor',
                            inputType: 'number'
                        },
                        {
                            xtype: 'textfield',
                            x: -6,
                            y: 70,
                            id: 'buildArea',
                            fieldLabel: '建筑总面积（平方米）',
                            labelAlign: 'right',
                            labelWidth: 140,
                            name: 'buildArea',
                            inputType: 'number'
                        },
                        {
                            xtype: 'textfield',
                            x: 270,
                            y: 100,
                            id: 'airconditioner',
                            fieldLabel: '空调总面积（平方米）',
                            labelAlign: 'right',
                            labelWidth: 130,
                            name: 'airconditioner',
                            inputType: 'number'
                        },
                        {
                            xtype: 'textfield',
                            x: -6,
                            y: 100,
                            id: 'heatingArea',
                            fieldLabel: '采暖总面积（平方米）',
                            labelAlign: 'right',
                            labelWidth: 140,
                            inputType: 'number'
                        },
                        {
                            xtype: 'combobox',
                            x: 10,
                            y: 130,
                            id: 'airconditionerSystemCode',
                            fieldLabel: '建筑空调系统',
                            labelAlign: 'right',
                            labelWidth: 80,
                            name: 'airconditionerSystemCode',
                            displayField: 'optionValue',
                            valueField: 'optionCode'
                        },
                        {
                            xtype: 'combobox',
                            x: 270,
                            y: 130,
                            id: 'heatingFormCode',
                            fieldLabel: '建筑采暖形式',
                            labelAlign: 'right',
                            labelWidth: 80,
                            name: 'heatingFormCode',
                            displayField: 'optionValue',
                            valueField: 'optionCode'
                        },
                        {
                            xtype: 'combobox',
                            x: 10,
                            y: 160,
                            id: 'structureCode',
                            fieldLabel: '建筑结构形式',
                            labelAlign: 'right',
                            labelWidth: 80,
                            name: 'structureCode',
                            displayField: 'optionValue',
                            valueField: 'optionCode'
                        },
                        {
                            xtype: 'textfield',
                            x: 270,
                            y: 70,
                            id: 'shapeCoefficient',
                            fieldLabel: '建筑体型系数',
                            labelAlign: 'right',
                            labelWidth: 80,
                            name: 'shapeCoefficient'
                        },
                        {
                            xtype: 'combobox',
                            x: 270,
                            y: 160,
                            id: 'exteriorCode',
                            fieldLabel: '建筑外墙形式',
                            labelAlign: 'right',
                            labelWidth: 80,
                            name: 'exteriorCode',
                            displayField: 'optionValue',
                            valueField: 'optionCode'
                        },
                        {
                            xtype: 'combobox',
                            x: 10,
                            y: 190,
                            id: 'exteriorWallCode',
                            fieldLabel: '外墙保温形式',
                            labelAlign: 'right',
                            labelWidth: 80,
                            name: 'exteriorWallCode',
                            displayField: 'optionValue',
                            valueField: 'optionCode'
                        },
                        {
                            xtype: 'combobox',
                            x: 270,
                            y: 190,
                            id: 'windowTypeCode',
                            fieldLabel: '建筑外窗类型',
                            labelAlign: 'right',
                            labelWidth: 80,
                            name: 'windowTypeCode',
                            displayField: 'optionValue',
                            valueField: 'optionCode'
                        },
                        {
                            xtype: 'combobox',
                            x: 10,
                            y: 220,
                            id: 'glassTypesCode',
                            fieldLabel: '建筑玻璃类型',
                            labelAlign: 'right',
                            labelWidth: 80,
                            name: 'glassTypesCode',
                            displayField: 'optionValue',
                            valueField: 'optionCode'
                        },
                        {
                            xtype: 'combobox',
                            x: 270,
                            y: 220,
                            id: 'windowFrameMaterialCode',
                            fieldLabel: '窗框材料类型',
                            labelAlign: 'right',
                            labelWidth: 80,
                            name: 'windowFrameMaterialCode',
                            displayField: 'optionValue',
                            valueField: 'optionCode'
                        },
                        {
                            xtype: 'hiddenfield',
                            x: 428,
                            y: 16,
                            id: 'id',
                            fieldLabel: 'Label',
                            name: 'id'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            x: 180,
                            y: 352,
                            dock: 'bottom',
                            layout: {
                                pack: 'end',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnBuildingSave',
                                    iconCls: 'icon-save',
                                    text: '保存',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnBuildingSaveClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'btnBuildingCancel',
                                    iconCls: 'icon-cancel',
                                    text: '取消',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnBuildingCancelClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterlayout: {
                    fn: me.onWindowAfterLayout,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtnBuildingSaveClick: function(button, e, eOpts) {

        if (this.getForm().isValid())
        {
            this.getForm().submit(
            {
                url : '../build!save.do',
                method : 'POST',
                waitMsg : '正在保存数据，稍后...',
                success : function(f, action)
                {
                    Ext.Msg.alert('信息提示', '保存成功');
                    //me.close();
                    window.location.reload();
                },
                failure : function(f, action)
                {
                    Ext.Msg.alert('信息提示', '保存失败，服务器端程序出错！');
                }
            });
        }
    },

    onBtnBuildingCancelClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterLayout: function(container, layout, eOpts) {
        var airSystemCodeStore = new Ext.data.Store({
            autoLoad: true,
            storeId: 'airSystemCodeCmbStore',
            fields: [
            {
                name: 'optionCode',
                type: 'string'
            },
            {
                name: 'optionValue',
                type: 'string'
            }
            ],
            proxy: {
                type: 'ajax',  
                url : '../build!airSystemCodes.do',
                listeners: {
                    exception: function(proxy, response, operation, eOpts) {
                        alert(response.statusText);
                    }
                }
            }
        });
        Ext.getCmp('airconditionerSystemCode').bindStore(airSystemCodeStore);

        var heatingFormCodeStroe = new Ext.data.Store({
            autoLoad: true,
            storeId: 'heatingFormCodeCmbStroe',
            fields: [
            {
                name: 'optionCode',
                type: 'string'
            },
            {
                name: 'optionValue',
                type: 'string'
            }
            ],
            proxy: {
                type: 'ajax',  
                url : '../build!heatingFormCodes.do',
                listeners: {
                    exception: function(proxy, response, operation, eOpts) {
                        alert(response.statusText);
                    }
                }
            }
        });
        Ext.getCmp('heatingFormCode').bindStore(heatingFormCodeStroe);

        var structureCodeStroe = new Ext.data.Store({
            autoLoad: true,
            storeId: 'structureCodeCmbStroe',
            fields: [
            {
                name: 'optionCode',
                type: 'string'
            },
            {
                name: 'optionValue',
                type: 'string'
            }
            ],
            proxy: {
                type: 'ajax',  
                url : '../build!structureCodes.do',
                listeners: {
                    exception: function(proxy, response, operation, eOpts) {
                        alert(response.statusText);
                    }
                }
            }
        });
        Ext.getCmp('structureCode').bindStore(structureCodeStroe);

        var exteriorCodeStroe = new Ext.data.Store({
            autoLoad: true,
            storeId: 'exteriorCodeCmbStroe',
            fields: [
            {
                name: 'optionCode',
                type: 'string'
            },
            {
                name: 'optionValue',
                type: 'string'
            }
            ],
            proxy: {
                type: 'ajax',  
                url : '../build!exteriorCodes.do',
                listeners: {
                    exception: function(proxy, response, operation, eOpts) {
                        alert(response.statusText);
                    }
                }
            }
        });
        Ext.getCmp('exteriorCode').bindStore(exteriorCodeStroe);

        var exteriorWallCodeStroe = new Ext.data.Store({
            autoLoad: true,
            storeId: 'exteriorWallCodeCmbStroe',
            fields: [
            {
                name: 'optionCode',
                type: 'string'
            },
            {
                name: 'optionValue',
                type: 'string'
            }
            ],
            proxy: {
                type: 'ajax',  
                url : '../build!exteriorWallCodes.do',
                listeners: {
                    exception: function(proxy, response, operation, eOpts) {
                        alert(response.statusText);
                    }
                }
            }
        });
        Ext.getCmp('exteriorWallCode').bindStore(exteriorWallCodeStroe);

        var windowTypeCodeStroe = new Ext.data.Store({
            autoLoad: true,
            storeId: 'windowTypeCodeCmbStroe',
            fields: [
            {
                name: 'optionCode',
                type: 'string'
            },
            {
                name: 'optionValue',
                type: 'string'
            }
            ],
            proxy: {
                type: 'ajax',  
                url : '../build!windowTypeCodes.do',
                listeners: {
                    exception: function(proxy, response, operation, eOpts) {
                        alert(response.statusText);
                    }
                }
            }
        });
        Ext.getCmp('windowTypeCode').bindStore(windowTypeCodeStroe);

        var glassTypesCodeStroe = new Ext.data.Store({
            autoLoad: true,
            storeId: 'glassTypesCodeCmbStroe',
            fields: [
            {
                name: 'optionCode',
                type: 'string'
            },
            {
                name: 'optionValue',
                type: 'string'
            }
            ],
            proxy: {
                type: 'ajax',  
                url : '../build!glassTypesCodes.do',
                listeners: {
                    exception: function(proxy, response, operation, eOpts) {
                        alert(response.statusText);
                    }
                }
            }
        });
        Ext.getCmp('glassTypesCode').bindStore(glassTypesCodeStroe);

        var windowFrameMaterialCodeStroe = new Ext.data.Store({
            autoLoad: true,
            storeId: 'windowFrameMaterialCodeCmbStroe',
            fields: [
            {
                name: 'optionCode',
                type: 'string'
            },
            {
                name: 'optionValue',
                type: 'string'
            }
            ],
            proxy: {
                type: 'ajax',  
                url : '../build!windowFrameMaterialCodes.do',
                listeners: {
                    exception: function(proxy, response, operation, eOpts) {
                        alert(response.statusText);
                    }
                }
            }
        });
        Ext.getCmp('windowFrameMaterialCode').bindStore(windowFrameMaterialCodeStroe);
    },

    getForm: function() {
        return Ext.getCmp('BuildingEditForm');
    }

});