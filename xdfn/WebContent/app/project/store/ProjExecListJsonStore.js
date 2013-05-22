/**
 * File: app/project/store/ProjExecListJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjExecListJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            fields: [
                {name: 'ID_VIEW', type: 'string'},
                {name: 'V_JX_NAME_VIEW', type: 'string'},
                {name: 'V_BJ_NAME_VIEW', type: 'string'},
                {name: 'N_F_SUM_VIEW', type: 'number'},
                {name: 'N_S_SUM_VIEW', type: 'number'},
                {name: 'D_DISP_DATE_VIEW', type: 'date', dateFormat: 'Y-m-d'},
                {name: 'D_RECIEVED_DATE_VIEW', type: 'date', dateFormat: 'Y-m-d'},
                {name: 'V_CJR_VIEW', type: 'string'},
                {name: 'V_REM_VIEW', type: 'string'},
                {name: 'D_DATE_VIEW', type: 'date', dateFormat: 'Y-m-d H:i:s'}
            ]
        }, cfg)]);
    }
});