/**
 * File: app/project/store/ProjExecProgressJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjExecProgressJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	groupField: 'V_JX_NAME_VIEW',
        	proxy: {
                type: 'ajax',
                url: './proExec.do?method=getExecAzjdList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {name: 'ID_VIEW', type: 'string'},
                {name: 'V_JX_NAME_VIEW', type: 'string'},
                {name: 'N_DHTS_VIEW', type: 'number'},
                {name: 'N_AZTS_VIEW', type: 'number'},
                {name: 'N_SYXTS_VIEW', type: 'number'},
                {name: 'N_GQTS_VIEW', type: 'number'},
                {name: 'V_CJR_VIEW', type: 'string'},
                {name: 'V_REM_VIEW', type: 'string'},
                {name: 'D_DATE_VIEW', type: 'date', dateFormat: 'Y-m-d H:i:s'}
            ]
        }, cfg)]);
    }
});