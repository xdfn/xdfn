/**
 * File: app/project/ui/ProjMoneyPlan.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjMoneyPlan', {
    extend: 'Ext.panel.Panel',

    //id: 'ProjMoneyPlan',
    layout: {
        type: 'fit'
    },
    closable: false,
    title: '回款计划',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'gridpanel',
                store: me.planStore,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_NAME_VIEW',
                        text: '款项名称'
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        dataIndex: 'N_FHTS_VIEW',
                        text: '发货台数',
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 0,
                        	enforceMaxLength: true,
	                        maxLength: 5
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        width: 200,
                        dataIndex: 'N_YSZK_VIEW',
                        text: '应收账款（元）￥',
                        summaryType: 'sum',
                        summaryRenderer: function(value) {
                        	return '总金额：        ' +  Ext.util.Format.number(value, '0,000.00');
                        },
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 0.01,
                        	minText: '该项为大于0的值',
                        	enforceMaxLength: true,
	                        maxLength: 18
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        align: 'right',
                        width: 150,
                        dataIndex: 'N_RATIO_VIEW',
                        text: '回款比例(%)',
                        renderer: function(value){
                        	return value + '%';
                        },
                        summaryType: 'sum',
                        summaryRenderer: function(value) {
                        	return '总百分比：        ' +  value + '%';
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        align: 'right',
                        width: 120,
                        dataIndex: 'D_HKRQ_VIEW',
                        text: '回款日期',
                        format: 'Y年m月d日',
                        editor: {
                        	xtype: 'datefield',
                        	allowBlank: false,
                        	editable: false,
                        	format: 'Y年m月d日',
                        	submitFormat: 'Y-m-d'
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        align: 'right',
                        dataIndex: 'V_HKZRR_VIEW',
                        text: '回款责任人',
                        editor: {
                            xtype: 'combotree',
                            allowBlank: false,
                            emptyText: '请选择...',
                            editable: false,
                            displayField: 'V_NODE_NAME_VIEW',
                            treeStore: 'EmployeeTreeStore',
                            treeWidth: 210
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        align: 'right',
                        dataIndex: 'V_CJR_VIEW',
                        text: '创建人'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 300,
                        dataIndex: 'V_REM_VIEW',
                        text: '备注',
                        editor: {
                        	xtype: 'textfield',
	                        enforceMaxLength: true,
	                        maxLength: 500
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        align: 'right',
                        width: 200,
                        dataIndex: 'D_DATE_VIEW',
                        text: '添加时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        hidden: true,
                        dataIndex: 'ID_VIEW',
                        hideable: false,
                        text: 'ID'
                    }
                ],
                viewConfig: {

                },
                plugins: [
                    me.rowEditing
			    ],
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
                                text: '增加计划'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除计划'
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
                        store: me.planStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});