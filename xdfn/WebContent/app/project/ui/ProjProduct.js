/**
 * File: app/project/ui/ProjProduct.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjProduct', {
    extend: 'Ext.panel.Panel',

    //id: 'ProjProduct',
    layout: {
        type: 'fit'
    },
    closable: false,
    title: '中标机型',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'gridpanel',
                store: me.prodStore,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_JX_VIEW',
                        text: '中标机型',
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
                        	minValue: 0.01,
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
                        dataIndex: 'N_PRICE_VIEW',
                        text: '总价（元）',
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
                                iconCls: 'remove_btn',
                                text: '删除产品'
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
                        store: me.prodStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});