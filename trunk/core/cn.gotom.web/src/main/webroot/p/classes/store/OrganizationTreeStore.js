/*
 * File: classes/store/OrganizationTreeStore.js
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

Ext.define('Gotom.store.OrganizationTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.OrganizationTreeStore',

    requires: [
        'Gotom.model.OrganizationModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            model: 'Gotom.model.OrganizationModel',
            storeId: 'OrganizationTreeStore',
            defaultRootId: '',
            defaultRootText: '',
            nodeParam: 'id',
            proxy: {
                type: 'ajax',
                url: '../p/organization!tree.do',
                listeners: {
                    exception: {
                        fn: me.onAjaxException,
                        scope: me
                    }
                }
            }
        }, cfg)]);
    },

    onAjaxException: function(proxy, response, operation, eOpts) {
        if(response.status == 200)
        {
            var result = Ext.JSON.decode(response.responseText);
            Ext.Msg.alert('信息提示'+response.status, result.data);
        }
        else
        {
            Ext.Msg.alert('信息提示', response.responseText);
        }
    }

});