/**
 * File: app/customer/store/CustomInfoJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.customer.store.CustomInfoJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './cusManage.do?method=getCusInfoList',
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
                    name: 'V_CUSTOM_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_ZONE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_TYPE_BELONG_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PARENT_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_TYPE_TRADE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PHASE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_LEVEL_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_REL_AGENT_VIEW',
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
                    name: 'V_POST_CODE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_WEB_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_EMAIL_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_ADDRESS_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_MEMO_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});