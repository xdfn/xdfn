/**
 * File: app/project/store/ProjectsJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjectsJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=getProjectList',
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
                    name: 'V_PRO_NO_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PRO_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_PRO_PRE_TIME_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'D_LAST_UPDATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'V_PRO_PORER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PRO_SOURCE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PRO_TYPE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_OFFICE_BRANCH_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PROVINCE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_INNER_MANAGER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_OUT_MANAGER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_OUT_MASTER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PRO_PHASE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_FIN_CUSTOM',
                    type: 'string'
                },
                {
                    name: 'V_DESIGN_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_WIND_ADDR_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_WIND_TYPE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PRO_PROCESS_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});