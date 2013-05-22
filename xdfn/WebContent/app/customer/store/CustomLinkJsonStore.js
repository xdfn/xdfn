/**
 * File: app/customer/store/CustomLinkJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.customer.store.CustomLinkJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            proxy: {
                type: 'ajax',
                url: './cusManage.do?method=getCusRelList',
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
                    name: 'V_TRUE_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PST_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PHONE1_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PHONE2_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PHONE3_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_FAX_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_EMAIL_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_QQ_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_MSN_VIEW',
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