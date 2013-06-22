/**
 * File: app/project/ui/ProjMoney.js
 * Author: liusha
 */

Ext.define('xdfn.project.ui.ProjMoney', {
    extend: 'Ext.panel.Panel',

    id: 'ProjMoney',
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'money_tabs',
    title: '回款管理',

    initComponent: function() {
        var me = this;
        
        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        	errorSummary: false
        });
        
        me.items = [
            {
                xtype: 'form',
                defaults: {
                    labelWidth: 60
                },
                layout: {
                    type: 'column'
                },
                bodyPadding: 10,
                bodyStyle: 'background-color:#d8e6f4',
                collapsed: true,
                collapsible: true,
                titleCollapse: true,
                //floatable: false,
                title: '查询合同',
                region: 'north',
                items: [
                    {
                        xtype: 'textfield',
                        margin: '2 20 10 0',
                        name: 'V_CON_CODE',
                        fieldLabel: '合同编号'
                    },
                    {
                        xtype: 'textfield',
                        margin: '2 20 10 0',
                        name: 'V_CON_NAME',
                        fieldLabel: '合同名称'
                    },
                    {
                        xtype: 'textfield',
                        margin: '2 20 10 0',
                        name: 'V_PRO_NO',
                        fieldLabel: '项目编号'
                    },
                    {
                        xtype: 'textfield',
                        margin: '2 20 10 0',
                        name: 'V_PRO_NAME',
                        fieldLabel: '项目名称'
                    },
                    {
                        xtype: 'textfield',
                        margin: '2 20 10 0',
                        name: 'V_CUST_NAME',
                        fieldLabel: '客户名称'
                    },
                    {
                        xtype: 'datefield',
                        margin: '2 10 10 0',
                        name: 'D_SIGN_DATE_START',
                        fieldLabel: '签订时间',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_SIGN_DATE_START', end: 'D_SIGN_DATE_END', parent: me},
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        editable: false
                    },
                    {
                        xtype: 'datefield',
                        margin: '2 20 10 0',
                        name: 'D_SIGN_DATE_END',
                        fieldLabel: '到',
                        labelWidth: 20,
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_SIGN_DATE_START', end: 'D_SIGN_DATE_END', parent: me},
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        editable: false
                    },
                    {
                        xtype: 'button',
                        margin: '2 10 10 0',
                        iconCls: 'search_btn',
                        text: '查找'
                    },
                    {
                        xtype: 'button',
                        margin: '2 20 10 0',
                        iconCls: 'reset_btn',
                        text: '重置'
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                region: 'center',
                store: me.conStore,
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
                        width: 150,
                        dataIndex: 'V_CON_CODE_VIEW',
                        text: '合同编号'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_CON_NAME_VIEW',
                        text: '合同名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_PRO_NAME_VIEW',
                        text: '项目名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_CUST_NAME_VIEW',
                        text: '客户名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_STATE_VIEW',
                        text: '签订状态'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_TRANS_VIEW',
                        text: '移交状态'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 180,
                        dataIndex: 'D_PRE_SIGN_DATE_VIEW',
                        text: '签订预测时间',
                        format: 'Y年m月d日'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 180,
                        dataIndex: 'D_SIGN_DATE_VIEW',
                        text: '签订时间',
                        format: 'Y年m月d日'
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        dataIndex: 'N_XSTS_VIEW',
                        text: '销收台数'
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        dataIndex: 'N_HTTS_VIEW',
                        text: '合同台数'
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        dataIndex: 'N_HTZJ_VIEW',
                        text: '合同总价（元）'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_HTJX_VIEW',
                        width: 180,
                        text: '合同机型'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_SW_ZZR_VIEW',
                        text: '商务部分制作人'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_XY_ZZR_VIEW',
                        text: '技术协议制作人'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_HTZRR_VIEW',
                        text: '合同跟进责任人'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_GSBSC_VIEW',
                        text: '归属办事处'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_HTPS_VIEW',
                        text: '合同评审'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_ZBQ_VIEW',
                        text: '质保期'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_HTZXZT_VIEW',
                        text: '合同执行状态'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_HZQK_VIEW',
                        text: '核准情况'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_BZJ_VIEW',
                        text: '履约保函/保证金'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_SHZRR_VIEW',
                        text: '售后责任人'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 200,
                        dataIndex: 'D_UPDATE_DATE_VIEW',
                        text: '更新时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_CJR_VIEW',
                        text: '创建人'
                    }
                ],
                viewConfig: {

                },
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: me.conStore,
                        dock: 'bottom'
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: {
			        type: 'border'
			    },
                bodyStyle: 'border:0px',
                height: 320,
                collapsible: true,
                titleCollapse: true,
                title: '回款信息',
                region: 'south',
                split: true,
                items: [
                    {
		                xtype: 'gridpanel',
		                width: 450,
		                forceFit: true,
		                collapsible: true,
		                title: '回款指标',
		                titleCollapse: true,
		                region: 'west',
		                split: true,
		                store: me.inStore,
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
		                        dataIndex: 'V_NAME_VIEW',
		                        text: '款项名称'
		                    },
		                    {
		                    	xtype: 'gridcolumn',
		                        align: 'right',
		                        dataIndex: 'V_PERCENT_VIEW',
		                        text: '所占比例(%)',
		                        renderer: function(value){
		                        	return value + '%';
		                        },
		                        editor: {
		                        	xtype: 'numberfield',
		                        	allowBlank: false,
		                        	minValue: 0,
		                        	maxValue: 100
		                        }
		                    },
		                    {
		                        xtype: 'numbercolumn',
		                        align: 'right',
		                        width: 300,
		                        dataIndex: 'N_SUM_VIEW',
		                        text: '金额（元）￥',
		                        summaryType: 'sum',
		                        summaryRenderer: function(value) {
		                        	return '总金额：        ' +  Ext.util.Format.number(value, '0,000.00');
		                        },
		                        editor: {
		                        	xtype: 'numberfield',
		                        	allowBlank: false,
                        	        enforceMaxLength: true,
	                                maxLength: 18
		                        }
		                    },
		                    {
		                        xtype: 'datecolumn',
		                        align: 'right',
		                        dataIndex: 'D_DATE_VIEW',
		                        text: '添加时间',
		                        format: 'Y年m月d日 H时i分s秒'
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
		                        height: 27,
		                        dock: 'top',
		                        items: [
		                            {
		                                xtype: 'button',
		                                iconCls: 'add_btn',
		                                text: '增加款项'
		                            },
		                            {
		                                xtype: 'button',
		                                iconCls: 'remove_btn',
		                                text: '删除款项'
		                            }
		                        ]
		                    },
		                    {
		                        xtype: 'pagingtoolbar',
		                        displayInfo: true,
		                        store: me.inStore,
		                        dock: 'bottom'
		                    }
		                ]
		            },
		            {
		            	xtype: 'tabpanel',
		                layout: {
					        type: 'fit'
					    },
		                bodyStyle: 'border:0px',
		                activeTab: 0,
		                region: 'center'
		            }
                ]
            }
        ];
        me.callParent(arguments);
    }
});