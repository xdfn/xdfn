/**
 * File: app/project/store/ProjApplyJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjApplyJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=getProApplyList',
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
                    name: 'V_PRO_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_OLD_TYPE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_TYPE_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_SUBMIT_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'V_SUBMITTER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_DEPT_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_SUBMIT_MEMO_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_REVIEW_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'V_REVIEWER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_REVIEW_MEMO_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_REVIEW_STATUS_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});