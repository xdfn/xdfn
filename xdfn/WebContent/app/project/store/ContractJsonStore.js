/**
 * File: app/project/store/ContractJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ContractJsonStore', {
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
                    name: 'V_STATE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_TRANS_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_PRE_SIGN_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d'
                },
                {
                    name: 'D_SIGN_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d'
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
                    name: 'V_HTJX_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_SW_ZZR_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_XY_ZZR_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_HTZRR_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_GSBSC_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_HTPS_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_ZBQ_VIEW',
                    type: 'string'
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
                    name: 'V_BZJ_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_SHZRR_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_UPDATE_DATE_VIEW',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'V_CJR_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});