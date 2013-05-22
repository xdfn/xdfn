/**
 * File: app/project/ui/ProjExecSchedule.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjExecSchedule', {
    extend: 'Ext.panel.Panel',

    id: 'ProjExecSchedule',
    layout: {
        type: 'fit'
    },
    closable: false,
    title: '排产/存栈记录表',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'gridpanel',
                store: me.schStore,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_JX_NAME_VIEW',
                        text: '机型名称',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
	                        enforceMaxLength: true,
	                        maxLength: 50
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        dataIndex: 'N_S_SUM_VIEW',
                        text: '排产台数',
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 0,
	                        enforceMaxLength: true,
	                        maxLength: 5
                        },
                        summaryType: 'sum',
                        summaryRenderer: function(value) {
                        	return '总台数：        ' +  value;
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        dataIndex: 'N_F_SUM_VIEW',
                        text: '存栈台数',
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 0,
	                        enforceMaxLength: true,
	                        maxLength: 5
                        },
                        summaryType: 'sum',
                        summaryRenderer: function(value) {
                        	return '总台数：        ' +  value;
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        align: 'right',
                        width: 120,
                        dataIndex: 'D_DISP_DATE_VIEW',
                        text: '交货日期',
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
                        dataIndex: 'D_DATE_VIEW',
                        text: '添加时间',
                        width: 200,
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
					    ftype: 'summary'
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
                                text: '增加记录'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除记录'
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
                        store: me.schStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});