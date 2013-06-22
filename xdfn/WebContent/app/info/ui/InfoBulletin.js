/**
 * File: app/info/ui/InfoBulletin.js
 * Author: liusha
 */


Ext.define('xdfn.info.ui.InfoBulletin', {
    extend: 'Ext.panel.Panel',

    id: 'InfoBulletin',
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'info_tabs',
    title: '发布公告',

    initComponent: function() {
        var me = this;
        me.items = [
            {
            	xtype: 'form',
                height: 80,
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
                title: '查询公告',
                titleCollapse: true,
                //floatable: false,
                region: 'north',
                items: [
                    {
                    	xtype: 'textfield',
                        margin: '2 20 10 0',
                        name: 'V_TITLE',
                        fieldLabel: '公告标题'
                    },
                    {
                        xtype: 'datefield',
                        margin: '2 20 10 0',
                        name: 'D_DATE_START',
                        fieldLabel: '发布时间',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_DATE_START', end: 'D_DATE_END', parent: me},
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        editable: false
                    },
                    {
                        xtype: 'datefield',
                        margin: '2 20 10 0',
                        name: 'D_DATE_END',
                        fieldLabel: '到',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_DATE_START', end: 'D_DATE_END', parent: me},
                        labelWidth: 20,
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
                store: me.bullStore,
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
                        dataIndex: 'V_TITLE_VIEW',
                        text: '公告标题'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 200,
                        dataIndex: 'D_PUB_DATE_VIEW',
                        text: '发布时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PUBER_VIEW',
                        text: '发布人'
                    },
                    {
                        xtype: 'actioncolumn',
                        align: 'center',
                        header: '置顶',
                        items: [
	                        {
	                        	icon: 'resources/images/top.gif',
	                        	handler: function(view, rowIndex, colIndex, item, e) {
	                        		Ext.Msg.confirm('提示', '确定将该公告置顶吗？', function(id) {
	                        			if (id == 'yes') {
	                        				Ext.Ajax.request({
									    	    url: './infoPub.do?method=bulletinToTop',
									    	    method: 'get',
									    	    params: {
									    	    	ID: view.getStore().getAt(rowIndex).get('ID_VIEW')
									    	    },
									    	    success: function(response, opts) {
									    	    	Ext.Msg.alert('提示', '置顶成功！');
												},
												failure: function(response, opts) {
													Ext.Msg.alert('提示','置顶失败！');
												}
									    	});
	                        			}
	                        		});
	                        	}
	                        }
                        ]
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
                                text: '增加公告'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改公告'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除公告'
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
                        store: me.bullStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});