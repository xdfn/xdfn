/**
 * File: app/project/store/ProjStandingJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjStandingJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	groupField: 'V_TYPE_VIEW',
            proxy: {
                type: 'ajax',
                url: './proExec.do?method=getBidAccountList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {name: 'ID_VIEW', type: 'string'},
                {name: 'V_TYPE_VIEW', type: 'string'},
                {name: 'N_SUM_VIEW', type: 'number'},
                {name: 'V_PAY_STATUS_VIEW', type: 'string'},
                {name: 'D_PAY_DATE_VIEW', type: 'date', dateFormat: 'Y-m-d'},
                {name: 'V_PAY_MODE_VIEW', type: 'string'},
                {name: 'V_PAYEE_VIEW', type: 'string'},
                {name: 'V_PAYER_VIEW', type: 'string'},
                {name: 'V_INVOICE_VIEW', type: 'string'},
                {name: 'V_SUBMIT_PAY_VIEW', type: 'string'},
                {name: 'V_REMARK_VIEW', type: 'string'}
            ]
        }, cfg)]);
    }
});