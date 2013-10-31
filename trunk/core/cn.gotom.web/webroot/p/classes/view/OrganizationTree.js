/*
 * File: classes/view/OrganizationTree.js
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

Ext.define('Gotom.view.OrganizationTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.OrganizationTree',

    height: 244,
    id: 'OrganizationTree',
    maxWidth: 400,
    minWidth: 120,
    width: 150,
    autoScroll: true,
    bodyBorder: false,
    animCollapse: true,
    collapsed: false,
    collapsible: true,
    overlapHeader: false,
    title: '组织架构',
    titleCollapse: false,
    columnLines: false,
    store: 'OrganizationTreeStore',
    rootVisible: false,

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }

});