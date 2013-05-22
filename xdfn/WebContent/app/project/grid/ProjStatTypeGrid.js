/**
 * File: app/project/grid/ProjStatTypeGrid.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.grid.ProjStatTypeGrid', {
    extend: 'Ext.grid.Panel',


    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'V_CATEGORY_VIEW',
                    text: '统计分类'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT1_VIEW',
                    align: 'right',
                    text: '国内项目'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT2_VIEW',
                    align: 'right',
                    text: '国外项目'
                }
            ],
            viewConfig: {

            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    store: me.store,
                    dock: 'bottom'
                }
            ]
        });

        me.callParent(arguments);
    }
});