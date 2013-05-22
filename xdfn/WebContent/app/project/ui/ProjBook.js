/**
 * File: app/project/ui/ProjBook.js
 * Author: liusha
 */

Ext.define('xdfn.project.ui.ProjBook', {
    extend: 'Ext.panel.Panel',

    //id: 'ProjBook',
    layout: {
        type: 'border'
    },
    closable: false,
    title: '项目标书',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'gridpanel',
                region: 'center',
                store: me.bookStore,
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
                        width: 200,
                        dataIndex: 'V_BID_CODE_VIEW',
                        text: '招标编号',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
	                        enforceMaxLength: true,
	                        maxLength: 60
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_BID_ADDR_VIEW',
                        text: '开标地点',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
	                        enforceMaxLength: true,
	                        maxLength: 80
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_BID_STATE_VIEW',
                        text: '投标状态',
                        editor: {
                        	xtype: 'combobox',
                        	allowBlank: false,
	                        editable: false,
	                        queryMode: 'local',
	                        displayField: 'V_COMBOX_NAME_VIEW',
	                        valueField: 'V_COMBOX_VALUE_VIEW',
	                        store: new Ext.data.ArrayStore({
					    	    model: 'Combox',
					    	    data: [
					    	        ['资格预审', '资格预审'],
					    	        ['挂网招标', '挂网招标'],
					    	        ['标书制作', '标书制作'],
					    	        ['等待开标', '等待开标'],
					    	        ['等待评标结果', '等待评标结果'],
					    	        ['中标', '中标'],
					    	        ['失标', '失标']
					    	    ]
					    	})
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        width: 150,
                        dataIndex: 'D_BID_DEATH_DATE_VIEW',
                        text: '标书购买截止时间',
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
                        xtype: 'datecolumn',
                        width: 150,
                        dataIndex: 'D_BID_OPEN_DATE_VIEW',
                        text: '开标日期',
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
                        width: 100,
                        dataIndex: 'V_DELEGATE_VIEW',
                        text: '投标授权代表',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
	                        enforceMaxLength: true,
	                        maxLength: 20
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 100,
                        dataIndex: 'V_TENDERS_VIEW',
                        text: '标书制作人',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
	                        enforceMaxLength: true,
	                        maxLength: 20
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 100,
                        dataIndex: 'V_AUDI_VIEW',
                        text: '本部标书审核人',
                        editor: {
                        	xtype: 'textfield',
                        	allowBlank: false,
	                        enforceMaxLength: true,
	                        maxLength: 20
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
                                text: '增加标书'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除标书'
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
                        store: me.bookStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});