/**
 * File: app/info/store/BulletinJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.info.store.BulletinJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './infoPub.do?method=getBulletinList',
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
                    name: 'V_TITLE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_CONTENT_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_PUB_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'V_PUBER_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});