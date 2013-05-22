/**
 * File: app/service/ui/Service.js
 * Author: liusha
 */
 
Ext.define('xdfn.service.ui.Service', {
    extend: 'Ext.panel.Panel',

    id: 'Service',
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'service_tabs',
    title: '服务管理',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                height: 110,
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
                title: '查询服务记录',
                region: 'north',
                items: [
                    {
                        xtype: 'textfield',
                        margin: '2 20 10 0',
                        name: 'V_CONTRACT_NAME',
                        fieldLabel: '合同名称'
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
                        name: 'D_TIME_START',
                        fieldLabel: '回复时间',
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_TIME_START', end: 'D_TIME_END', parent: me},
                        editable: false
                    },
                    {
                        xtype: 'datefield',
                        margin: '2 20 10 0',
                        name: 'D_TIME_END',
                        fieldLabel: '到',
                        labelWidth: 20,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_TIME_START', end: 'D_TIME_END', parent: me},
                        editable: false
                    },
                    {
                        xtype: 'combobox',
                        margin: '2 20 10 0',
                        name: 'V_STATUS',
                        fieldLabel: '服务状态',
                        editable: false,
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: 'ServiceStatusStore'
                    },
                    {
                        xtype: 'combotree',
                        margin: '2 20 10 0',
                        name: 'V_OFFICE_BRANCH',
                        fieldLabel: '责任部门',
                        labelWidth: 70,
                        editable: false,
                        treeWidth: 220,
                        displayField: 'V_NODE_NAME_VIEW',
                        treeStore: 'DeptDutyTreeStore',
                        allowUnLeafClick: true,
                        leafClickDisable: true
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
                store: me.serviceStore,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        hidden: true,
                        dataIndex: 'ID_VIEW',
                        hideable: false,
                        text: 'ID'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 200,
                        dataIndex: 'D_CREATE_TIME_VIEW',
                        text: '服务记录时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_CONTRACT_NAME_VIEW',
                        text: '合同名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_TITLE_VIEW',
                        text: '服务主题'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_OFFICE_BRANCH_VIEW',
                        text: '责任部门'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_DUTYER_VIEW',
                        text: '责任领导'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_CUST_NAME_VIEW',
                        text: '客户名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_CUST_LINKER_VIEW',
                        text: '客户联系人'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_PHONE_VIEW',
                        text: '联系电话'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_FAX_VIEW',
                        text: '传真'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 200,
                        dataIndex: 'D_RESPONSE_TIME_VIEW',
                        text: '最迟回复时间',
                        format: 'Y年m月d日'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_STATUS_VIEW',
                        text: '服务状态'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_HANDLER_VIEW',
                        text: '第一责任人'
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
                                text: '增加记录'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改记录'
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
                        store: me.serviceStore,
                        dock: 'bottom'
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                height: 200,
                collapsible: true,
                title: '批示信息',
                region: 'south',
                split: true,
                store: me.psStore,
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
                        width: 400,
                        dataIndex: 'V_CONTENT_VIEW',
                        text: '批示内容'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 180,
                        dataIndex: 'D_PS_TIME_VIEW',
                        text: '批示时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PSER_VIEW',
                        text: '批示人'
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
                                text: '增加批示'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改批示'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除批示'
                            }
                        ]
                    },
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: me.psStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});