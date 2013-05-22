/**
 * File: app/fax/store/FaxInfoJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.fax.store.FaxInfoJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './faxManage.do?method=getFaxList',
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
                    name: 'V_FAX_NO_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_FAX_TITLE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_FAX_TYPE_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_FAX_DATE_VIEW',
                    type: 'date'
                },
                {
                    name: 'V_MEMO_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});