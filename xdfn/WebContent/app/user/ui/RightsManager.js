/**
 * File: app/user/ui/RightsManager.js
 * Author: liusha
 */
 
Ext.define('xdfn.user.ui.RightsManager', {
    extend: 'Ext.panel.Panel',

    id: 'RightsManager',
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'person_tabs',
    title: '权限管理',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'gridpanel',
                id: 'RightGrid',
                width: 352,
                collapsible: true,
                title: '权限信息',
                titleCollapse: true,
                region: 'west',
                split: true,
                multiSelect: true,
                selType: 'checkboxmodel',
                store: me.rightStore,
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
                        dataIndex: 'V_RIGHT_NAME_VIEW',
                        text: '权限名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_RIGHT_DESC_VIEW',
                        text: '权限描述'
                    },
                    {
                        xtype: 'gridcolumn',
                        hidden: true,
                        dataIndex: 'V_RIGHT_GROUP_VIEW',
                        hideable: false,
                        text: '权限组'
                    }
                ],
                viewConfig: {
                	
                },
                features: [
                    {
                        ftype: 'grouping',
                        groupHeaderTpl: '{name} ({rows.length})',
                        enableGroupingMenu: false,
                        enableNoGroups: false,
                        hideGroupedHeader: true
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        height: 27,
                        dock: 'bottom',
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'reset_btn',
                                text: '刷新'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'border'
                },
                region: 'center',
                items: [
                    {
                        xtype: 'form',
                        height: 80,
                        defaults: {
                            labelWidth: 60
                        },
                        layout: {
                            type: 'absolute'
                        },
                        bodyPadding: 10,
                        bodyStyle: 'background-color:#d8e6f4',
                        collapsed: true,
                        collapsible: true,
                        title: '查询用户',
                        titleCollapse: true,
                        //floatable: false,
                        region: 'north',
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'V_USER_NAME',
                                fieldLabel: '用户姓名',
                                enforceMaxLength: true,
                                maxLength: 60
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
	                            width: 260,
	                            x: 240,
	                            y: 10
	                        },
                            {
                                xtype: 'button',
                                iconCls: 'search_btn',
                                text: '查找',
                                x: 515,
                                y: 10
                            },
                            {
                                xtype: 'button',
                                iconCls: 'reset_btn',
                                text: '重置',
                                x: 575,
                                y: 10
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        id: 'UserGrid',
                        floatable: false,
                        region: 'center',
                        split: true,
                        store: me.userStore,
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                hidden: true,
                                dataIndex: 'V_USER_FK_VIEW',
                                hideable: false,
                                text: '用户关联外键'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'V_USER_NAME_VIEW',
                                text: '姓名'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 150,
                                dataIndex: 'V_USER_ACC_VIEW',
                                text: '用户账号'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 200,
                                dataIndex: 'V_DEPT_NAME_VIEW',
                                text: '所属部门'
                            }
                        ],
                        viewConfig: {
                            
                        },
                        dockedItems: [
                            {
                                xtype: 'pagingtoolbar',
                                displayInfo: true,
                                store: me.userStore,
                                dock: 'bottom'
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        id: 'UserRightGrid',
                        height: 300,
                        collapsible: true,
                        titleCollapse: true,
                        title: '用户权限',
                        //floatable: false,
                        region: 'south',
                        split: true,
                        multiSelect: true,
                        selType: 'checkboxmodel',
                        store: me.userightStore,
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
                                dataIndex: 'V_RIGHT_NAME_VIEW',
                                text: '权限名称'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 200,
                                dataIndex: 'V_RIGHT_DESC_VIEW',
                                text: '权限描述'
                            },
		                    {
		                        xtype: 'gridcolumn',
		                        hidden: true,
		                        dataIndex: 'V_RIGHT_GROUP_VIEW',
		                        hideable: false,
		                        text: '权限组'
		                    }
                        ],
                        viewConfig: {
                        	
                        },
		                features: [
		                    {
		                        ftype: 'grouping',
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
                                        text: '增加权限'
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'remove_btn',
                                        text: '删除权限'
                                    }
                                ]
                            },
                            {
                                xtype: 'pagingtoolbar',
                                displayInfo: true,
                                store: me.userightStore,
                                dock: 'bottom'
                            }
                        ]
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});