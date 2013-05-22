/**
 * File: app/project/store/ProjMoneyInJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjMoneyInJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=gethkjsList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {name: 'ID_VIEW', type: 'string'},
                {name: 'V_NAME_VIEW', type: 'string'},
                {name: 'V_PERCENT_VIEW', type: 'string'},
                {name: 'N_SUM_VIEW', type: 'number'},
                {name: 'D_DATE_VIEW', type: 'date', dateFormat: 'Y-m-d H:i:s'}
            ]
        }, cfg)]);
    }
});