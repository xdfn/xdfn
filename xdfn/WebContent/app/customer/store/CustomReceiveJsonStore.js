/**
 * File: app/customer/store/CustomReceiveJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.customer.store.CustomReceiveJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './cusManage.do?method=getCusRecList',
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
                    name: 'D_REC_DATE_VIEW',
                    type: 'date'
                },
                {
                    name: 'D_LEAVE_DATE_VIEW',
                    type: 'date'
                },
                {
                    name: 'V_REC_LEVEL_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_REC_SUBJECT_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_CUS_COMP_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_REC_LOG_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_REC_CARD_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_REC_RESULT_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_APPLIER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_CUS_BELONGED_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_RECER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PRO_NAME_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});