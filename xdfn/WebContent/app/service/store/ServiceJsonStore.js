/**
 * File: app/service/store/ServiceJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.service.store.ServiceJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './serRec.do?method=getList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {
                    name: 'ID_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_CREATE_TIME_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'V_CONTRACT_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_TITLE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_OFFICE_BRANCH_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_DUTYER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_CUST_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_CUST_LINKER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PHONE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_FAX_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_RESPONSE_TIME_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d'
                },
                {
                    name: 'V_STATUS_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_HANDLER_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});