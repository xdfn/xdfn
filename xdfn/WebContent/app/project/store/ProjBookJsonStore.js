/**
 * File: app/project/store/ProjBookJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjBookJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            proxy: {
                type: 'ajax',
                url: './proExec.do?method=getBidbookList',
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
                    name: 'V_BID_CODE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_BID_ADDR_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_BID_STATE_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_BID_DEATH_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d'
                },
                {
                    name: 'D_BID_OPEN_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d'
                },
                {
                    name: 'V_DELEGATE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_TENDERS_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_AUDI_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});