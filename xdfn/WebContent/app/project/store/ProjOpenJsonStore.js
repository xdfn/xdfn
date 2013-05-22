/**
 * File: app/project/store/ProjOpenJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjOpenJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            proxy: {
                type: 'ajax',
                url: './proExec.do?method=getKbjlList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {name: 'ID_VIEW', type: 'string'},
                {name: 'V_MANU_VIEW', type: 'string'},
                {name: 'V_MACHINE_VIEW', type: 'string'},
                {name: 'N_CAP_VIEW', type: 'number'},
                {name: 'N_SUM_NUM_VIEW', type: 'number'},
                {name: 'N_SUM_MONEY_VIEW', type: 'number'},
                {name: 'N_SUM_PRICE_VIEW', type: 'number'},
                {name: 'V_MEMO_VIEW', type: 'string'}
            ]
        }, cfg)]);
    }
});