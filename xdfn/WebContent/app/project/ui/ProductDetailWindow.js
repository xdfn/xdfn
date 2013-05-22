/**
 * File: app/project/ui/ProductDetailWindow.js
 * Author: liusha
 */
Ext.define('xdfn.project.ui.ProductDetailWindow', {
    extend: 'Ext.window.Window',

    height: 502,
    width: 800,
    layout: {
        type: 'fit'
    },
    iconCls: 'contract_tabs',
    title: '产品明细',
    maximizable: true,
    minimizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    store: me.detailStore,
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
                            dataIndex: 'V_PARTS_TYPE_VIEW',
                            text: '类型',
	                        editor: {
	                        	xtype: 'textfield',
	                        	allowBlank: false,
		                        enforceMaxLength: true,
		                        maxLength: 20
	                        }
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 128,
                            dataIndex: 'V_PARTS_NAME_VIEW',
                            text: '名称',
	                        editor: {
	                        	xtype: 'textfield',
	                        	allowBlank: false,
		                        enforceMaxLength: true,
		                        maxLength: 50
	                        }
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 128,
                            dataIndex: 'V_PARTS_MODEL_VIEW',
                            text: '规格型号',
	                        editor: {
	                        	xtype: 'textfield',
	                        	allowBlank: false,
		                        enforceMaxLength: true,
		                        maxLength: 50
	                        }
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 128,
                            dataIndex: 'V_PARTS_UNIT_VIEW',
                            text: '单位',
	                        editor: {
	                        	xtype: 'textfield',
	                        	allowBlank: false,
		                        enforceMaxLength: true,
		                        maxLength: 2
	                        }
                        },
                        {
                            xtype: 'numbercolumn',
                            width: 128,
                            dataIndex: 'V_PARTS_NUM_VIEW',
                            text: '数量',
	                        editor: {
	                        	xtype: 'numberfield',
	                        	allowBlank: false,
		                        enforceMaxLength: true,
		                        maxLength: 10
	                        }
                        },
                        {
                            xtype: 'numbercolumn',
                            width: 128,
                            dataIndex: 'V_PARTS_PRICE_VIEW',
                            text: '出厂单价',
	                        editor: {
	                        	xtype: 'numberfield',
	                        	allowBlank: false,
		                        enforceMaxLength: true,
		                        maxLength: 18
	                        }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'V_VENDER1_VIEW',
                            text: '配置一',
	                        editor: {
	                        	xtype: 'textfield',
	                        	allowBlank: false,
		                        enforceMaxLength: true,
		                        maxLength: 50
	                        }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'V_VENDER2_VIEW',
                            text: '配置二',
	                        editor: {
	                        	xtype: 'textfield',
		                        enforceMaxLength: true,
		                        maxLength: 50
	                        }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'V_VENDER3_VIEW',
                            text: '配置三',
	                        editor: {
	                        	xtype: 'textfield',
		                        enforceMaxLength: true,
		                        maxLength: 50
	                        }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'V_VENDER4_VIEW',
                            text: '配置四',
	                        editor: {
	                        	xtype: 'textfield',
		                        enforceMaxLength: true,
		                        maxLength: 50
	                        }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'V_VENDER5_VIEW',
                            text: '配置五',
	                        editor: {
	                        	xtype: 'textfield',
		                        enforceMaxLength: true,
		                        maxLength: 50
	                        }
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
                                    text: '增加'
                                },
                                {
                                    xtype: 'tbseparator'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'remove_btn',
                                    text: '删除'
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
                            store: me.detailStore,
                            displayInfo: true,
                            dock: 'bottom'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});