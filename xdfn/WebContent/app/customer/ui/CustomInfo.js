/**
 * File: app/customer/ui/CustomInfo.js
 * Author: liusha
 */
 
Ext.define('xdfn.customer.ui.CustomInfo', {
    extend: 'Ext.panel.Panel',

    layout: {
        type: 'border'
    },
    id: 'CustomInfo',
    iconCls: 'customer_tabs',
    closable: true,
    title: '客户信息',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                height: 116,
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
                titleCollapse: true,
                title: '查询客户',
                floatable: false,
                region: 'north',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'V_CUSTOM_NAME',
                        fieldLabel: '客户名称'
                    },
                    {
                    	xtype: 'combotree',
                        treeStore: 'ZoneTreeStore',
                        useArrows: true,
                        fieldLabel: '所属区域',
                        name: 'V_ZONE',
                        displayField: 'V_NODE_NAME_VIEW',
                        labelWidth: 60,
                        editable: false,
                        x: 240,
                        y: 10
                    },
                    {
                        xtype: 'combobox',
                        name: 'V_TYPE_BELONG',
                        fieldLabel: '归属类型',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        editable: false,
                        queryMode: 'local',
                        store: 'CustomBelongStore',
                        x: 470,
                        y: 10
                    },
                    {
                        xtype: 'combobox',
                        name: 'V_TYPE_TRADE',
                        fieldLabel: '客户性质',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        editable: false,
                        queryMode: 'local',
                        store: 'TradeTypeStore',
                        x: 10,
                        y: 50
                    },
                    {
                        xtype: 'combobox',
                        name: 'V_PHASE',
                        fieldLabel: '所处阶段',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        editable: false,
                        store: 'CustomPhaseStore',
                        x: 240,
                        y: 50
                    },
                    {
                        xtype: 'combobox',
                        name: 'V_LEVEL',
                        fieldLabel: '客户等级',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        editable: false,
                        queryMode: 'local',
                        store: 'CustomLevelStore',
                        x: 470,
                        y: 50
                    },
                    {
                        xtype: 'button',
                        iconCls: 'search_btn',
                        text: '查找',
                        x: 710,
                        y: 50
                    },
                    {
                        xtype: 'button',
                        iconCls: 'reset_btn',
                        text: '重置',
                        x: 770,
                        y: 50
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                floatable: false,
                region: 'center',
                split: true,
                store: me.custStore,
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
                        dataIndex: 'V_CUSTOM_NAME_VIEW',
                        text: '客户名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 120,
                        dataIndex: 'V_ZONE_VIEW',
                        text: '所属区域'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 120,
                        dataIndex: 'V_TYPE_BELONG_VIEW',
                        text: '归属类型'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_PARENT_NAME_VIEW',
                        text: '上级单位'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 120,
                        dataIndex: 'V_TYPE_TRADE_VIEW',
                        text: '客户性质'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PHASE_VIEW',
                        text: '所处阶段'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_LEVEL_VIEW',
                        text: '客户等级'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_REL_AGENT_VIEW',
                        text: '关联代理'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_PHONE_VIEW',
                        text: '电话'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_FAX_VIEW',
                        text: '传真'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_POST_CODE_VIEW',
                        text: '邮编'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_WEB_VIEW',
                        text: '网址'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_EMAIL_VIEW',
                        text: '电子邮件'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_ADDRESS_VIEW',
                        text: '地址'
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
                                text: '增加客户'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改客户'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除客户'
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
                        dock: 'bottom',
                        store: me.custStore
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                height: 200,
                collapsible: true,
                title: '客户联系人',
                floatable: false,
                region: 'south',
                split: true,
                store: me.linkStore,
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
                        dataIndex: 'V_TRUE_NAME_VIEW',
                        text: '联系人名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PST_VIEW',
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
                        width: 120,
                        dataIndex: 'V_PHONE3_VIEW',
                        text: '固定电话'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 120,
                        dataIndex: 'V_FAX_VIEW',
                        text: '传真'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_EMAIL_VIEW',
                        text: '电子邮件'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 120,
                        dataIndex: 'V_QQ_VIEW',
                        text: 'QQ'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_MSN_VIEW',
                        text: 'MSN'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_ADDRESS_VIEW',
                        text: '地址'
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
                                text: '增加联系人'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改联系人'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除联系人'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'ext_xls',
                                text: '导出 '
                            }
                        ]
                    },
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        dock: 'bottom',
                        store: me.linkStore
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});