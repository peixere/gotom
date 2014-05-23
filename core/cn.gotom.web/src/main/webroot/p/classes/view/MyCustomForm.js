/*
 * File: classes/view/MyCustomForm.js
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

Ext.define('Gotom.view.MyCustomForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.MyCustomForm',

    requires: [
        'Gotom.view.CustomForm'
    ],

    layout: {
        type: 'border'
    },
    title: '公司信息',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'CustomForm',
                    header: false,
                    region: 'center',
                    listeners: {
                        afterlayout: {
                            fn: me.onFormAfterLayout,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                afterlayout: {
                    fn: me.onPanelAfterLayout,
                    scope: me
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    layout: {
                        pack: 'end',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'icon-save',
                            text: '保存',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onFormAfterLayout: function(container, layout, eOpts) {
        this.formPanel = container;
    },

    onPanelAfterLayout: function(container, layout, eOpts) {
        var me = this;
        Common.ajax({
            component : me,
            message : '正在加载......',    
            url : ctxp+'/p!context.do',
            callback : function(result) {
                me.loadForm(result.data.id);
            }
        });
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var form = me.formPanel;
        try{
            var rightIds = [];
            var tree = me.treePanel.items.get(1);
            var items = tree.getSelectionModel().store.data.items;
            Ext.each(items, function()
            {
                var nd = this;
                if(nd.data.checked)
                {
                    rightIds.push(nd.data.id);
                }
            });    
            form.getForm().findField('rightIds').setValue(rightIds);
            Common.formSubmit({  
                url : ctxp+'/p/myCustomSave.do',
                form:form,
                callback : function(result)
                {
                    if(result.success)
                    {
                        me.loadGrid();
                        me.onAddClick(button,e,eOpts);
                    }else{
                        Ext.Msg.alert('信息提示', result.data);
                    }	
                }
            });
        }catch(error){
            alert(error);
        }
    },

    loadForm: function(customId) {
        var me = this;
        me.formPanel.getForm().reset();
        Common.ajax({
            component : me,
            message : '正在加载......',    
            url : ctxp+'/p/custom.do?custom.id='+customId,
            callback : function(result) {
                me.formPanel.getForm().setValues(result.data);
            }
        });
    }

});