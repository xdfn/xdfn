/**
 * File: app/customer/ui/CustomReceive.js
 * Author: liusha
 */
 
Ext.define('xdfn.customer.ui.CustomReceive', {
    extend: 'Ext.panel.Panel',

    id: 'CustomReceive',
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'customer_tabs',
    title: '客户接待',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                height: 75,
                layout: {
                    type: 'absolute'
                },
                bodyPadding: 5,
                bodyStyle: 'background-color:#d8e6f4',
                collapsed: true,
                collapsible: true,
                title: '查询客户接待',
                titleCollapse: true,
                //floatable: false,
                region: 'north',
                items: [
                    {
                        xtype: 'textareafield',
                        height: 21,
                        width: 240,
                        name: 'V_CUS_COMP',
                        fieldLabel: '客户单位',
                        labelWidth: 60,
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: 'datefield',
                        margin: '0 5 0 10',
                        name: 'D_DATE_START',
                        fieldLabel: '起始日期',
                        labelWidth: 60,
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_DATE_START', end: 'D_DATE_END', parent: me},
                        x: 260,
                        y: 10
                    },
                    {
                        xtype: 'datefield',
                        margin: '0 5 0 10',
                        name: 'D_DATE_END',
                        fieldLabel: '到',
                        labelWidth: 20,
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_DATE_START', end: 'D_DATE_END', parent: me},
                        x: 490,
                        y: 10
                    },
                    {
                        xtype: 'button',
                        iconCls: 'search_btn',
                        text: '查找',
                        x: 690,
                        y: 10
                    },
                    {
                        xtype: 'button',
                        iconCls: 'reset_btn',
                        text: '重置',
                        x: 750,
                        y: 10
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                region: 'center',
                store: me.recStore,
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
                        dataIndex: 'D_REC_DATE_VIEW',
                        text: '接待日期',
                        format: 'Y年m月d日',
                        width: 120
                    },
                    {
                        xtype: 'datecolumn',
                        dataIndex: 'D_LEAVE_DATE_VIEW',
                        text: '结束日期',
                        format: 'Y年m月d日',
                        width: 120
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_REC_LEVEL_VIEW',
                        text: '接待等级'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_REC_SUBJECT_VIEW',
                        text: '接待主题',
                        width: 200
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_CUS_COMP_VIEW',
                        text: '客户单位',
                        width: 150
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_REC_CARD_VIEW',
                        text: '客户名片',
                        width: 120
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_REC_LOG_VIEW',
                        text: '接待日志',
                        width: 150
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_REC_RESULT_VIEW',
                        text: '接待效果'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_APPLIER_VIEW',
                        text: '申请人'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_CUS_BELONGED_VIEW',
                        text: '接待部门'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_RECER_VIEW',
                        text: '接待负责人'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PRO_NAME_VIEW',
                        text: '关联项目'
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
                        store: me.recStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});