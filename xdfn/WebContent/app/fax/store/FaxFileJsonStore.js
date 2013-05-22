/**
 * File: app/fax/store/FaxFileJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.fax.store.FaxFileJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            proxy: {
                type: 'ajax',
                url: './faxManage.do?method=getAttachList',
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
                    name: 'V_FAX_FILENAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_DETAIL_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_UP_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'V_FILE_URL_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});