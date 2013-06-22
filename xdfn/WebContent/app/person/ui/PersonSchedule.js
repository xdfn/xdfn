/**
 * File: app/person/ui/PersonSchedule.js
 * Author: liusha
 */

Ext.define('xdfn.person.ui.PersonSchedule', {
    extend: 'Ext.panel.Panel',

    id: 'PersonSchedule',
    layout: {
        type: 'fit'
    },
    closable: true,
    border: false,
    iconCls: 'person_tabs',
    title: '个人日程',

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
                            type: 'border'
                        },
                        title: '日程列表',
                        items: [
                            {
                                xtype: 'form',
                                height: 150,
                                layout: {
                                    type: 'fit'
                                },
                                bodyPadding: 5,
                                bodyStyle: 'background-color:#d8e6f4',
                                collapsed: true,
                                collapsible: true,
                                title: '查询日程',
                                titleCollapse: true,
                                //floatable: false,
                                region: 'north',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        defaults: {
                                            labelWidth: 60
                                        },
                                        layout: {
                                            type: 'absolute'
                                        },
                                        title: '查询条件',
                                        items: [
                                            {
                                                xtype: 'textareafield',
                                                height: 21,
                                                width: 240,
                                                name: 'V_TITLE',
                                                fieldLabel: '日程标题'
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
                                                x: 240,
                                                y: 0
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
                                                x: 470,
                                                y: 0
                                            },
                                            {
						                        xtype: 'combobox',
						                        margin: '0 5 0 10',
						                        width: 260,
						                        name: 'V_PROJECT_NO',
						                        fieldLabel: '关联项目',
						                        editable: false,
						                        displayField: 'V_COMBOX_NAME_VIEW',
						                        valueField: 'V_COMBOX_VALUE_VIEW',
						                        queryMode: 'local',
						                        store: 'ProjListJsonStore',
						                        x: 660,
                                                y: 0
						                    },
                                            {
                                                xtype: 'combobox',
                                                width: 150,
                                                name: 'V_TYPE_SHIYOU',
                                                fieldLabel: '事由类型',
                                                displayField: 'V_COMBOX_NAME_VIEW',
                                                valueField: 'V_COMBOX_VALUE_VIEW',
                                                store: 'ShiyouStore',
                                                editable: false,
                                                x: 0,
                                                y: 40
                                            },
                                            {
                                                xtype: 'combobox',
                                                width: 150,
                                                name: 'V_TYPE_BELONG',
                                                fieldLabel: '归属类型',
                                                displayField: 'V_COMBOX_NAME_VIEW',
                                                valueField: 'V_COMBOX_VALUE_VIEW',
                                                store: 'ScheduleBelongStore',
                                                editable: false,
                                                x: 160,
                                                y: 40
                                            },
                                            {
                                                xtype: 'combobox',
                                                width: 150,
                                                name: 'V_LEVEL',
                                                fieldLabel: '等级状态',
                                                displayField: 'V_COMBOX_NAME_VIEW',
                                                valueField: 'V_COMBOX_VALUE_VIEW',
                                                store: 'ScheduleLevelStore',
                                                editable: false,
                                                x: 320,
                                                y: 40
                                            },
                                            {
                                                xtype: 'combobox',
                                                width: 150,
                                                name: 'V_REPORT',
                                                fieldLabel: '报表类别',
                                                displayField: 'V_COMBOX_NAME_VIEW',
                                                valueField: 'V_COMBOX_VALUE_VIEW',
                                                store: 'ReportStore',
                                                editable: false,
                                                x: 480,
                                                y: 40
                                            },
                                            {
                                                xtype: 'combobox',
                                                width: 150,
                                                name: 'V_FINISH',
                                                fieldLabel: '完成状态',
                                                displayField: 'V_COMBOX_NAME_VIEW',
                                                valueField: 'V_COMBOX_VALUE_VIEW',
                                                store: 'FinishStore',
                                                editable: false,
                                                x: 640,
                                                y: 40
                                            },
                                            {
                                                xtype: 'button',
                                                width: 60,
                                                iconCls: 'search_btn',
                                                text: '查找',
                                                x: 820,
                                                y: 40
                                            },
                                            {
                                                xtype: 'button',
                                                width: 60,
                                                iconCls: 'reset_btn',
                                                text: '重置',
                                                x: 890,
                                                y: 40
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                region: 'center',
                                store: me.schStore,
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'ID_VIEW',
                                        text: 'ID',
                                        hideable: false,
                                        hidden: true
                                    },
                                    {
                                        xtype: 'datecolumn',
                                        dataIndex: 'D_DATETIME_VIEW',
                                        text: '日程时间',
                                        width: 200,
                                        format: 'Y年m月d日 H时i分s秒'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'V_TITLE_VIEW',
                                        width: 200,
                                        text: '标题'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'V_CONTENT_VIEW',
                                        width: 200,
                                        text: '日程内容'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'V_TYPE_SHIYOU_VIEW',
                                        text: '事由类型'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'V_TYPE_BELONG_VIEW',
                                        text: '归属类型'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'V_LEVEL_VIEW',
                                        text: '等级'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'V_REPORT_VIEW',
                                        text: '报表类型'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'V_FINISH_VIEW',
                                        text: '完成状态'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'V_WORK_SUMMARY_VIEW',
                                        text: '工作总结'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'V_APPROVE_VIEW',
                                        text: '批示',
                                        hideable: false,
                                        hidden: true
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'V_VERIFY_VIEW',
                                        text: '审核结果',
                                        hideable: false,
                                        hidden: true
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
                                                text: '写日程'
                                            },
                                            {
                                                xtype: 'tbseparator'
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'modify_btn',
                                                text: '改日程'
                                            },
                                            {
                                                xtype: 'tbseparator'
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'remove_btn',
                                                text: '删除日程'
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
                                        store: me.schStore,
                                        dock: 'bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        title: '日程图表',
                        hidden: true
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});