/**
 * File: app/project/store/ProjMoneyPlanJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjMoneyPlanJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	groupField: 'V_NAME_VIEW',
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=gethkjhList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {name: 'ID_VIEW', type: 'string'},
                {name: 'V_NAME_VIEW', type: 'string'},
                {name: 'N_FHTS_VIEW', type: 'number'},
                {name: 'N_YSZK_VIEW', type: 'number'},
                {name: 'N_RATIO_VIEW', type: 'number'},
                {name: 'D_HKRQ_VIEW', type: 'date', dateFormat: 'Y-m-d'},
                {name: 'V_HKZRR_VIEW', type: 'string'},
                {name: 'V_CJR_VIEW', type: 'string'},
                {name: 'V_REM_VIEW', type: 'string'},
                {name: 'D_DATE_VIEW', type: 'date', dateFormat: 'Y-m-d H:i:s'}
            ]
        }, cfg)]);
    }
});