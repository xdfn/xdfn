/**
 * File: app/project/store/ProjStatJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjStatJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	//autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'app/data/grid_proj_stat.json',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {
                    name: 'V_CATEGORY_VIEW',
                    type: 'string'
                },
                {
                	name: 'N_PRO_STAT1_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT2_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT3_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT4_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT5_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT6_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT7_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT8_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT9_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT10_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT11_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT12_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT13_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT14_VIEW',
                    type: 'number'
                },
                {
                	name: 'N_PRO_STAT15_VIEW',
                    type: 'number'
                }
            ]
        }, cfg)]);
    }
});