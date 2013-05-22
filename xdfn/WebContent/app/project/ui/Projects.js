/**
 * File: app/project/ui/Projects.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.Projects', {
    extend: 'Ext.panel.Panel',
    
    id: 'Projects',
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'project_tabs',
    title: '项目总览',

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
                titleCollapse: true,
                floatable: false,
                title: '查询项目',
                region: 'north',
                items: [
                    {
                        xtype: 'textfield',
                        margin: '2 20 10 0',
                        name: 'V_PRO_NO',
                        fieldLabel: '项目编号'
                    },
                    {
                        xtype: 'textfield',
                        margin: '2 20 10 0',
                        name: 'V_PRO_NAME',
                        fieldLabel: '项目名称'
                    },
                    {
                        xtype: 'datefield',
                        margin: '2 10 10 0',
                        name: 'D_PRO_PRE_TIME_START',
                        fieldLabel: '预报时间',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_PRO_PRE_TIME_START', end: 'D_PRO_PRE_TIME_END', parent: me},
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        editable: false
                    },
                    {
                        xtype: 'datefield',
                        margin: '2 20 10 0',
                        name: 'D_PRO_PRE_TIME_END',
                        fieldLabel: '到',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_PRO_PRE_TIME_START', end: 'D_PRO_PRE_TIME_END', parent: me},
                        labelWidth: 20,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        editable: false
                    },
                    {
                        xtype: 'combobox',
                        margin: '2 20 10 0',
                        width: 150,
                        name: 'V_PRO_SOURCE',
                        fieldLabel: '信息来源',
                        editable: false,
                        queryMode: 'local',
                        store: 'ProjSourceStore',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW'
                    },
                    {
                        xtype: 'combobox',
                        margin: '2 20 10 0',
                        width: 180,
                        name: 'V_PRO_TYPE',
                        fieldLabel: '项目类别',
                        editable: false,
                        queryMode: 'local',
                        store: 'ProjTypeStore',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW'
                    },
                    {
                        xtype: 'combotree',
                        margin: '2 20 10 0',
                        name: 'V_OFFICE_BRANCH',
                        fieldLabel: '归属办事处',
                        labelWidth: 70,
                        editable: false,
                        width: 180,
                        treeWidth: 150,
                        displayField: 'V_NODE_NAME_VIEW',
                        valueField: 'ID_VIEW',
                        treeStore: 'BansTreeStore'
                    },
                    {
                    	xtype: 'combotree',
                        treeStore: 'ZoneTreeStore',
                        useArrows: true,
                        fieldLabel: '风场所在省',
                        name: 'V_PROVINCE',
                        displayField: 'V_NODE_NAME_VIEW',
                        valueField: 'ID_VIEW',
                        labelWidth: 70,
                        width: 180,
                        treeWidth: 150,
                        editable: false,
                        margin: '2 20 10 0'
                    },
                    {
                        xtype: 'combobox',
                        margin: '2 20 10 0',
                        width: 200,
                        name: 'V_PRO_PHASE',
                        fieldLabel: '项目所处阶段',
                        labelWidth: 80,
                        editable: false,
                        queryMode: 'local',
                        store: 'ProjPhaseStore',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW'
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
                store: me.projStore,
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
                        dataIndex: 'V_PRO_NO_VIEW',
                        text: '项目编号'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_PRO_NAME_VIEW',
                        text: '项目名称'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 200,
                        dataIndex: 'D_PRO_PRE_TIME_VIEW',
                        text: '预报时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 200,
                        dataIndex: 'D_LAST_UPDATE_VIEW',
                        text: '项目更新时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PRO_PHASE_VIEW',
                        text: '项目所处阶段'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PRO_PORER_VIEW',
                        text: '预报人'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PRO_SOURCE_VIEW',
                        text: '信息来源'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PRO_TYPE_VIEW',
                        text: '项目类别'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_OFFICE_BRANCH_VIEW',
                        text: '责任办事处'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PROVINCE_VIEW',
                        text: '风场所在省'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_INNER_MANAGER_VIEW',
                        text: '本部责任项目经理'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_OUT_MANAGER_VIEW',
                        text: '驻外办主任'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_OUT_MASTER_VIEW',
                        text: '驻外办项目负责人'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_FIN_CUSTOM',
                        text: '最终用户（业主）'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_DESIGN_VIEW',
                        text: '设计院'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_WIND_ADDR_VIEW',
                        text: '风场地址'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_WIND_TYPE_VIEW',
                        text: '风场类别'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PRO_PROCESS_VIEW',
                        text: '项目审批进度'
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
                                text: '预报项目'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改项目'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除项目'
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
                        store: me.projStore,
                        dock: 'bottom'
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                bodyStyle: 'border:0px',
                height: 240,
                collapsible: true,
                title: '项目附属信息',
                activeTab: 0,
                region: 'south',
                split: true
            }
        ];
        me.callParent(arguments);
    }
});