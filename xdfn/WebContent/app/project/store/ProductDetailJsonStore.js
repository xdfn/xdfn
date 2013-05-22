/**
 * File: app/project/store/ProductDetailJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProductDetailJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=getProDetailList',
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
                    name: 'V_PARTS_TYPE_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PARTS_NAME_VIEW',
                    type: 'string'
                },
                
                {
                    name: 'V_PARTS_MODEL_VIEW',
                    type: 'string'
                },
                
                {
                    name: 'V_PARTS_UNIT_VIEW',
                    type: 'string'
                },
                
                {
                    name: 'V_PARTS_NUM_VIEW',
                    type: 'number'
                },
                
                {
                    name: 'V_PARTS_PRICE_VIEW',
                    type: 'number'
                },
                {
                    name: 'V_VENDER1_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_VENDER2_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_VENDER3_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_VENDER4_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_VENDER5_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});