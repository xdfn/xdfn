/**
 * File: app/person/store/ScheduleJosnStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.person.store.ScheduleJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './userManage.do?method=getAgendaList',
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
                    name: 'D_DATETIME_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
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
                    name: 'V_TYPE_SHIYOU_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_TYPE_BELONG_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_LEVEL_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_REPORT_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_FINISH_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_WORK_SUMMARY_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_APPROVE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_VERIFY_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PRO_NAME_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});