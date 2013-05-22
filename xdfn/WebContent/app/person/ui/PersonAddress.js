/**
 * File: app/person/ui/PersonAddress.js
 * Author: liusha
 */

Ext.define('xdfn.person.ui.PersonAddress', {
    extend: 'Ext.panel.Panel',

    id: 'PersonAddress',
    closable: true,
    border: false,
    iconCls: 'person_tabs',
    layout: {
        type: 'fit'
    },
    title: '通讯录',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'tabpanel',
                activeTab: 0,
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'fit'
                        },
                        title: '公司通讯录',
                        items: [
				            {
				                xtype: 'gridpanel',
				                store: me.addrStore,
				                flex: 1,
				                border: false,
				                columns: [
				                    {
				                        xtype: 'gridcolumn',
				                        dataIndex: 'V_USER_NAME_VIEW',
				                        text: '姓名'
				                    },
				                    {
				                        xtype: 'gridcolumn',
				                        dataIndex: 'V_DEPT_NAME_VIEW',
				                        text: '所属部门'
				                    },
				                    {
				                        xtype: 'gridcolumn',
				                        dataIndex: 'V_PST_NAME_VIEW',
				                        text: '职务'
				                    },
				                    {
				                        xtype: 'gridcolumn',
				                        dataIndex: 'V_PHONE1_VIEW',
				                        text: '电话1'
				                    },
				                    {
				                        xtype: 'gridcolumn',
				                        dataIndex: 'V_PHONE2_VIEW',
				                        text: '电话2'
				                    },
				                    {
				                        xtype: 'gridcolumn',
				                        width: 200,
				                        dataIndex: 'V_EMAIL_VIEW',
				                        text: '电子邮箱'
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
					                            xtype: 'textfield',
					                            width: 150,
					                            fieldLabel: '姓名',
					                            name: 'V_USER_NAME',
					                            labelWidth: 36,
					                            margins: 5
					                        },
					                        {
					                        	xtype: 'combotree',
					                            treeStore: 'DeptDutyTreeStore',
					                            useArrows: true,
					                            allowUnLeafClick: true,
					                            leafClickDisable: true,
					                            name: 'V_DEPT_ID',
					                            fieldLabel: '所属部门',
					                            displayField: 'V_NODE_NAME_VIEW',
					                            valueField: 'ID_VIEW',
					                            labelWidth: 60,
					                            editable: false,
					                            width: 260
					                        },
					                        {
					                            xtype: 'button',
					                            iconCls: 'search_btn',
					                            name: 'H_SEARCH',
					                            text: '查找',
					                            margins: 5
					                        },
                                            {
                                                xtype: 'button',
                                                iconCls: 'reset_btn',
                                                name: 'H_RESET',
                                                text: '重置',
                                                margins: 5
                                            },
					                        {
					                            xtype: 'button',
					                            iconCls: 'ext_xls',
					                            name: 'H_EXPORT_XLS',
					                            text: '导出',
					                            margins: 5
					                        }
					                    ]
					                },
					                {
					                    xtype: 'pagingtoolbar',
					                    displayInfo: true,
					                    store: me.addrStore,
					                    dock: 'bottom'
					                }
				                ]
				            }
				        ]
                    },
                    {
                        xtype: 'panel',
                        title: '个人通讯录',
                        hidden: true
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});