/**
 * File: app/project/store/ProductionJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProductionJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            proxy: {
                type: 'ajax',
                url: './proExec.do?method=getZbjxList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {name: 'ID_VIEW', type: 'string'},
                {name: 'V_JX_VIEW', type: 'string'},
                {name: 'N_DJRL_VIEW', type: 'number'},
                {name: 'N_NUM_VIEW', type: 'number'},
                {name: 'N_PRICE_VIEW', type: 'number'},
                {name: 'N_DWQWJG_VIEW', type: 'number'},
                {name: 'V_MEMO_VIEW', type: 'string'}
            ]
        }, cfg)]);
    }
});