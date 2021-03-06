/**
 * File: app/user/ui/EmployeeManager.js
 * Author: liusha
 */
 
Ext.define('xdfn.user.ui.EmployeeManager', {
    extend: 'Ext.panel.Panel',

    id: 'EmployeeManager',
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'customer_tabs',
    title: '员工管理',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'treepanel',
                width: 220,
                collapsible: true,
                title: '公司组织机构',
                titleCollapse: true,
                useArrows: true,
                rootVisible: false,
                autoScroll : true,
                region: 'west',
                split: true,
                displayField: 'V_NODE_NAME_VIEW',
                store: me.deptStore,
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
                                text: '增加'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除'
                            }
                        ]
                    },
                    {
                        xtype: 'toolbar',
                        height: 27,
                        dock: 'bottom',
                        items: [
                            {
                                xtype: 'tbtext',
                                text: '组织结构管理'
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
                        	type: 'column'
                        },
                        bodyPadding: 10,
                        bodyStyle: 'background-color:#d8e6f4',
                        collapsed: true,
                        collapsible: true,
                        title: '查询员工',
                        titleCollapse: true,
                        //floatable: false,
                        region: 'north',
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'V_USER_NAME',
                                fieldLabel: '员工姓名',
                                margin: '2 20 10 0',
                                enforceMaxLength: true,
                                maxLength: 30
                            },
                            {
                                xtype: 'textfield',
                                name: 'V_MOBILE',
                                fieldLabel: '手机号码',
                                margin: '2 20 10 0',
                                enforceMaxLength: true,
                                maxLength: 20
                            },
                            {
                                xtype: 'button',
                                iconCls: 'search_btn',
                                margin: '2 10 10 0',
                                text: '查找'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'reset_btn',
                                margin: '2 10 10 0',
                                text: '重置'
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        floatable: false,
                        region: 'center',
                        split: true,
                        store: me.empStore,
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
                                hidden: true,
                                dataIndex: 'V_USER_FK_VIEW',
                                hideable: false,
                                text: '用户关联外键'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 120,
                                dataIndex: 'V_USER_ACC_VIEW',
                                text: '用户账号'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'V_USER_NAME_VIEW',
                                text: '姓名'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'C_GENDER_VIEW',
                                text: '性别'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 180,
                                dataIndex: 'V_IDCARD_VIEW',
                                text: '身份证'
                            },
                            {
                                xtype: 'datecolumn',
                                width: 120,
                                dataIndex: 'D_BIRTHDAY_VIEW',
                                text: '生日',
                                format: 'Y年m月d日'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'V_DEPT_NAME_VIEW',
                                text: '部门'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'V_PST_NAME_VIEW',
                                text: '职务'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 120,
                                dataIndex: 'V_PHONE1_VIEW',
                                text: '手机1'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 120,
                                dataIndex: 'V_PHONE2_VIEW',
                                text: '手机2'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 150,
                                dataIndex: 'V_EMAIL_VIEW',
                                text: '电子邮箱'
                            },
                            {
                                xtype: 'datecolumn',
                                width: 120,
                                dataIndex: 'D_ENTRY_DATE_VIEW',
                                text: '入职日期',
                                format: 'Y年m月d日'
                            },
                            {
                                xtype: 'datecolumn',
                                width: 120,
                                dataIndex: 'D_EXP_DATE_VIEW',
                                text: '合同到期日期',
                                format: 'Y年m月d日'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 200,
                                dataIndex: 'V_HOME_ADDR_VIEW',
                                text: '家庭住址'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'V_PHOTO_URL_VIEW',
                                text: '照片'
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
                                        text: '增加员工'
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'modify_btn',
                                        text: '修改员工'
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'remove_btn',
                                        text: '删除员工'
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'reset_btn',
                                        text: '重置密码'
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
                                store: me.empStore,
                                dock: 'bottom'
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        height: 200,
                        collapsible: true,
                        titleCollapse: true,
                        title: '员工家属',
                        //floatable: false,
                        region: 'south',
                        split: true,
                        store: me.familyStore,
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
                                dataIndex: 'V_FAMILY_NAME_VIEW',
                                text: '家属姓名'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 120,
                                dataIndex: 'V_RELA_VIEW',
                                text: '家属关系'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 300,
                                dataIndex: 'V_ADDRESS_VIEW',
                                text: '联系方式'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 200,
                                dataIndex: 'V_MEMO_VIEW',
                                text: '备注'
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
                                        text: '增加家属'
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'modify_btn',
                                        text: '修改家属'
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'remove_btn',
                                        text: '删除家属'
                                    },
		                            {
		                                xtype: 'tbseparator'
		                            },
		                            {
		                                xtype: 'button',
		                                iconCls: 'ext_xls',
		                                text: '导出家属'
		                            }
                                ]
                            },
                            {
                                xtype: 'pagingtoolbar',
                                displayInfo: true,
                                store: me.familyStore,
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