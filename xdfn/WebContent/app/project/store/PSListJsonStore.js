/**
 * File: app/project/store/PSListJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.PSListJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            proxy: {
            	type: 'ajax',
            	url: './projectMgr.do?method=getProFollowPSList',
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
                    name: 'V_CONTENT_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_PS_TIME_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'V_PSER_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});