/**
 * File: app/project/ui/ProjStanding.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjStanding', {
    extend: 'Ext.panel.Panel',

    //id: 'ProjStanding',
    layout: {
        type: 'border'
    },
    closable: false,
    title: '投标台账',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'gridpanel',
                region: 'center',
                store: me.standStore,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        hidden: true,
                        dataIndex: 'ID_VIEW',
                        hideable: false,
                        text: 'ID'
                    },
                    {
                        xtype: 'gridcolumn',
                        hidden: true,
                        hideable: false,
                        dataIndex: 'V_TYPE_VIEW',
                        text: '费用类型'
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'N_SUM_VIEW',
                        width: 180,
                        align: 'right',
                        text: '费用金额（元）',
                        summaryType: 'sum',
                        summaryRenderer: function(value) {
                        	return '合计：        ' +  Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PAY_STATUS_VIEW',
                        text: '支付情况'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 120,
                        dataIndex: 'D_PAY_DATE_VIEW',
                        text: '支付日期',
                        format: 'Y年m月d日'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PAY_MODE_VIEW',
                        text: '支付方式'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PAYEE_VIEW',
                        text: '收款单位'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PAYER_VIEW',
                        text: '付款人'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_INVOICE_VIEW',
                        text: '发票情况'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_SUBMIT_PAY_VIEW',
                        text: '报销情况'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 300,
                        dataIndex: 'V_REMARK_VIEW',
                        text: '补充说明'
                    }
                ],
                viewConfig: {

                },
                features: [
                    {
                        ftype: 'groupingsummary',
                        groupHeaderTpl: '{name} ({rows.length})',
                        enableGroupingMenu: false,
                        enableNoGroups: false,
                        hideGroupedHeader: true
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'add_btn',
                                text: '增加台账'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改台账'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除台账'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'ext_xls',
                                text: '导出'
                            }
                        ]
                    },
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: me.standStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});