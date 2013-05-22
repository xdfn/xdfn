/**
 * File: app/project/ui/ProjOpen.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjOpen', {
    extend: 'Ext.panel.Panel',

    //id: 'ProjOpen',
    layout: {
        type: 'fit'
    },
    closable: false,
    title: '开标记录',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'gridpanel',
                store: me.openStore,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_MANU_VIEW',
                        text: '参加厂商名称',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
	                        enforceMaxLength: true,
	                        maxLength: 80
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_MACHINE_VIEW',
                        text: '投标机型',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
	                        enforceMaxLength: true,
	                        maxLength: 200
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        dataIndex: 'N_CAP_VIEW',
                        text: '单机容量(kw)',
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 0.01,
                        	minText: '该项为大于0的值',
                        	enforceMaxLength: true,
	                        maxLength: 10
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        dataIndex: 'N_SUM_NUM_VIEW',
                        text: '总台数',
                        editor: {
                        	xtype: 'numberfield',
                        	allowBlank: false,
                        	minValue: 1,
                        	minText: '该项为大于0的值',
                        	enforceMaxLength: true,
	                        maxLength: 10
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        align: 'right',
                        width: 180,
                        dataIndex: 'N_SUM_MONEY_VIEW',
                        text: '投标总报价（元）',
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
                        xtype: 'numbercolumn',
                        align: 'right',
                        width: 180,
                        dataIndex: 'N_SUM_PRICE_VIEW',
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
                        store: me.openStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});