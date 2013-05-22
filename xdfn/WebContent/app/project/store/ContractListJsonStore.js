/**
 * File: app/project/store/ContractListJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ContractListJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=getContractList',
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
                    name: 'V_CON_CODE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_CON_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_CUST_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'N_XSTS_VIEW',
                    type: 'number'
                },
                {
                    name: 'N_HTTS_VIEW',
                    type: 'number'
                },
                {
                    name: 'N_HTZJ_VIEW',
                    type: 'number'
                },
                {
                    name: 'V_HTZXZT_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_HZQK_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_GSBSC_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_ZBQ_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_BZJ_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_SIGN_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d'
                }
            ]
        }, cfg)]);
    }
});