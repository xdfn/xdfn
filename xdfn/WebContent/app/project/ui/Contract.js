/**
 * File: app/project/ui/Contract.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.Contract', {
    extend: 'Ext.panel.Panel',

    id: 'Contract',
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'contract_tabs',
    title: '合同管理',

    initComponent: function() {
        var me = this;
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
                        xtype: 'combobox',
                        margin: '2 20 10 0',
                        name: 'V_STATE',
                        fieldLabel: '签订状态',
                        editable: false,
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['未签订', '未签订'],
				    	        ['已签订', '已签订']
				    	    ]
				    	})
                    },
                    {
                        xtype: 'combobox',
                        margin: '2 20 10 0',
                        name: 'V_TRANS',
                        fieldLabel: '移交状态',
                        editable: false,
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['未移交', '未移交'],
				    	        ['已移交', '已移交']
				    	    ]
				    	})
                    },
                    {
                        xtype: 'combobox',
                        margin: '2 20 10 0',
                        name: 'V_HTZXZT',
                        fieldLabel: '执行状态',
                        labelWidth: 70,
                        editable: false,
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['未排产', '未排产'],
				    	        ['已排产', '已排产'],
				    	        ['开始发货', '开始发货'],
				    	        ['安装调试', '安装调试'],
				    	        ['未过240预验收', '未过240预验收'],
				    	        ['已过240预验收', '已过240预验收'],
				    	        ['进入质保期', '进入质保期'],
				    	        ['质保期到期', '质保期到期'],
				    	        ['已过质保期', '已过质保期'],
				    	        ['合同终止', '合同终止']
				    	    ]
				    	})
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
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'add_btn',
                                text: '增加合同'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改合同'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除合同'
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
                        store: me.conStore,
                        dock: 'bottom'
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                height: 200,
                collapsible: true,
                titleCollapse: true,
                title: '合同产品清单',
                region: 'south',
                split: true,
                store: me.prodStore,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_JX_VIEW',
                        text: '机型',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
	                        enforceMaxLength: true,
	                        maxLength: 80
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        dataIndex: 'N_DJRL_VIEW',
                        text: '单机容量(kw)',
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 0.001,
                        	minText: '该项为大于0的值',
                        	enforceMaxLength: true,
	                        maxLength: 10
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        dataIndex: 'N_NUM_VIEW',
                        text: '数量（台）',
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 0.001,
                        	minText: '该项为大于0的值',
                        	enforceMaxLength: true,
	                        maxLength: 10
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        width: 180,
                        dataIndex: 'N_PRICE_VIEW',
                        text: '总价（元）',
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 0.001,
                        	minText: '该项为大于0的值',
                        	enforceMaxLength: true,
	                        maxLength: 18
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        width: 180,
                        dataIndex: 'N_DWQWJG_VIEW',
                        text: '单位千瓦价格（元）'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 300,
                        dataIndex: 'V_MEMO_VIEW',
                        text: '备注',
                        editor: {
                        	xtype: 'textfield',
	                        enforceMaxLength: true,
	                        maxLength: 500
                        }
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
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'add_btn',
                                text: '增加产品'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '产品明细'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除产品'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'ext_xls',
                                text: '导出产品'
                            }
                        ]
                    },
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: me.prodStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});