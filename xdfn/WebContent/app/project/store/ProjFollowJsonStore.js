/**
 * File: app/project/store/ProjFollowJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjFollowJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=getProFollowList',
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
                    name: 'D_FOLLOWUP_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d'
                },
                {
                    name: 'V_TITLE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_TYPE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_FOLLOWER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_STATE_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_SUMMARY_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'V_ANNO_STATE_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});