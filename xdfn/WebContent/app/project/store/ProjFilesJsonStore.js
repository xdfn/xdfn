/**
 * File: app/project/store/ProjFilesJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjFilesJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=getProWldaList',
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
                    name: 'D_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'V_TITLE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_RECODER_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});