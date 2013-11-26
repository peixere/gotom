/*
 * File: classes/model/BuildingModel.js
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

Ext.define('ems.model.BuildingModel', {
    extend: 'Ext.data.Model',
    alias: 'model.BuildingModel',

    fields: [
        {
            name: 'id',
            type: 'string'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'province',
            type: 'string'
        },
        {
            name: 'city',
            type: 'string'
        },
        {
            name: 'address',
            type: 'string'
        },
        {
            name: 'ecDate',
            type: 'date'
        },
        {
            name: 'fillFormDate',
            type: 'date'
        },
        {
            name: 'buildYear',
            type: 'int'
        },
        {
            name: 'buildFloor',
            type: 'int'
        },
        {
            name: 'buildArea',
            type: 'float'
        },
        {
            name: 'airconditioner',
            type: 'float'
        },
        {
            name: 'heatingArea',
            type: 'float'
        },
        {
            name: 'airconditionerSystemCode',
            type: 'string'
        },
        {
            name: 'airconditionerSystem',
            type: 'string'
        },
        {
            name: 'heatingFormCode',
            type: 'string'
        },
        {
            name: 'heatingForm',
            type: 'string'
        },
        {
            name: 'structureCode',
            type: 'string'
        },
        {
            name: 'structure',
            type: 'string'
        },
        {
            name: 'exteriorCode',
            type: 'string'
        },
        {
            name: 'exterior',
            type: 'string'
        },
        {
            name: 'exteriorWallCode',
            type: 'string'
        },
        {
            name: 'exteriorWall',
            type: 'string'
        },
        {
            name: 'windowTypeCode',
            type: 'string'
        },
        {
            name: 'windowType',
            type: 'string'
        },
        {
            name: 'glassTypesCode',
            type: 'string'
        },
        {
            name: 'glassTypes',
            type: 'string'
        },
        {
            name: 'windowFrameMaterialCode',
            type: 'string'
        },
        {
            name: 'windowFrameMaterial',
            type: 'string'
        },
        {
            name: 'electrovalency',
            type: 'float'
        },
        {
            name: 'waterPrice',
            type: 'float'
        },
        {
            name: 'gasPrice',
            type: 'float'
        },
        {
            name: 'feverPrice',
            type: 'float'
        },
        {
            name: 'attacha',
            type: 'float'
        },
        {
            name: 'attachb',
            type: 'float'
        },
        {
            name: 'attachc',
            type: 'float'
        }
    ]
});