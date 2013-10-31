/*
 * File: classes/model/TreeModel.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
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

Ext.define('Gotom.model.TreeModel', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'string'
        },
        {
            name: 'parentId',
            type: 'string'
        },
        {
            name: 'sort',
            type: 'int'
        },
        {
            name: 'iconCls',
            type: 'string'
        },
        {
            name: 'leaf',
            type: 'boolean'
        },
        {
            name: 'type',
            type: 'string'
        },
        {
            name: 'resource',
            type: 'string'
        },
        {
            name: 'component',
            type: 'string'
        },
        {
            name: 'text',
            type: 'string'
        },
        {
            name: 'appCode',
            type: 'string'
        },
        {
            name: 'checked',
            type: 'boolean'
        }
    ]
});