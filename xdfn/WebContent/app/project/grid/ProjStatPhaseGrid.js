/**
 * File: app/project/grid/ProjStatPhaseGrid.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.grid.ProjStatPhaseGrid', {
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
                    text: '项目预报'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT2_VIEW',
                    align: 'right',
                    text: '项目跟进'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT3_VIEW',
                    align: 'right',
                    text: '重点项目'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT4_VIEW',
                    align: 'right',
                    text: '项目投标'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT5_VIEW',
                    align: 'right',
                    text: '项目不投标'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT6_VIEW',
                    align: 'right',
                    text: '项目中标'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT7_VIEW',
                    align: 'right',
                    text: '项目失标'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT8_VIEW',
                    align: 'right',
                    text: '合同管理'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT9_VIEW',
                    align: 'right',
                    text: '合同执行'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT10_VIEW',
                    align: 'right',
                    text: '合同废除'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT11_VIEW',
                    align: 'right',
                    text: '过240'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT12_VIEW',
                    align: 'right',
                    text: '质保期'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'N_PRO_STAT13_VIEW',
                    align: 'right',
                    text: '已过质保期'
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