/**
 * File: app/project/ui/ProjectWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjectWindow', {
    extend: 'Ext.window.Window',

    height: 566,
    width: 780,
    resizable: true,
    layout: {
        type: 'fit'
    },
    iconCls: 'project_tabs',
    title: '预报项目',
    modal: true,

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                defaults: {
                    labelWidth: 60
                },
                layout: {
                    type: 'auto'
                },
                bodyPadding: 10,
                bodyStyle: 'background-color:#d8e6f4;border:0px',
                items: [
                    {
                        xtype: 'fieldset',
                        height: 260,
                        defaults: {
                            labelWidth: 60
                        },
                        layout: {
                            type: 'absolute'
                        },
                        collapsible: true,
                        title: '项目基本信息',
                        flex: 1,
                        items: [
                            {
                                xtype: 'textfield',
                                margin: '5 25 10 0',
                                name: 'V_PRO_NO',
                                fieldLabel: '项目编号',
                                allowBlank: false,
                                blankText: '项目编号不能为空！',
                                emptyText: '请输入项目编号',
                                enforceMaxLength: true,
                                maxLength: 50,
                                x: 10,
                                y: 10
                            },
                            {
                                xtype: 'textfield',
                                margin: '5 25 10 0',
                                name: 'V_PRO_NAME',
                                fieldLabel: '项目名称',
                                allowBlank: false,
                                blankText: '项目名称不能为空！',
                                emptyText: '请输入项目名称',
                                enforceMaxLength: true,
                                maxLength: 300,
                                x: 250,
                                y: 10
                            },
                            {
                                xtype: 'combobox',
                                name: 'V_PRO_SOURCE',
                                fieldLabel: '信息来源',
                                //allowBlank: false,
                                //blankText: '不能为空！',
                                //emptyText: '请选择...',
                                editable: false,
                                queryMode: 'local',
                                displayField: 'V_COMBOX_NAME_VIEW',
                                valueField: 'V_COMBOX_VALUE_VIEW',
                                store: 'ProjSourceStore',
                                x: 490,
                                y: 15
                            },
                            {
                                xtype: 'combobox',
                                name: 'V_PRO_TYPE',
                                fieldLabel: '项目类别',
                                //allowBlank: false,
                                //blankText: '不能为空！',
                                //emptyText: '请选择...',
                                editable: false,
                                queryMode: 'local',
                                displayField: 'V_COMBOX_NAME_VIEW',
                                valueField: 'V_COMBOX_VALUE_VIEW',
                                store: 'ProjTypeStore',
                                x: 10,
                                y: 50
                            },
                            {
                                xtype: 'combotree',
                                name: 'V_OFFICE_BRANCH',
                                fieldLabel: '责任办事处',
                                //allowBlank: false,
                                //blankText: '不能为空！',
                                //emptyText: '请选择...',
                                editable: false,
                                treeWidth: 220,
		                        displayField: 'V_NODE_NAME_VIEW',
		                        valueField: 'ID_VIEW',
		                        treeStore: 'DeptDutyTreeStore',
		                        allowUnLeafClick: true,
		                        leafClickDisable: true,
                                x: 250,
                                y: 50
                            },
                            {
                                xtype: 'combotree',
                                name: 'V_PROVINCE',
                                fieldLabel: '风场所在省',
                                treeWidth: 150,
                                //allowBlank: false,
                                //blankText: '不能为空！',
                                //emptyText: '请选择...',
                                editable: false,
                                displayField: 'V_NODE_NAME_VIEW',
                                valueField: 'ID_VIEW',
                                treeStore: 'ZoneTreeStore',
                                x: 490,
                                y: 50
                            },
                            {
                                xtype: 'combotree',
                                name: 'V_INNER_MANAGER',
                                fieldLabel: '本部责任项目经理',
                                //allowBlank: false,
                                //blankText: '不能为空！',
                                //emptyText: '请选择...',
                                editable: false,
                                displayField: 'V_NODE_NAME_VIEW',
		                        valueField: 'ID_VIEW',
                                treeStore: 'EmployeeTreeStore',
                                treeWidth: 210,
                                x: 10,
                                y: 90
                            },
                            {
                                xtype: 'combotree',
                                name: 'V_OUT_MANAGER',
                                fieldLabel: '驻外办主任',
                                //allowBlank: false,
                                //blankText: '不能为空！',
                                //emptyText: '请选择...',
                                editable: false,
                                displayField: 'V_NODE_NAME_VIEW',
		                        valueField: 'ID_VIEW',
                                treeStore: 'EmployeeTreeStore',
                                treeWidth: 210,
                                x: 250,
                                y: 90
                            },
                            {
                                xtype: 'combotree',
                                name: 'V_OUT_MASTER',
                                fieldLabel: '驻外办项目负责人',
                                //allowBlank: false,
                                //blankText: '不能为空！',
                                //emptyText: '请选择...',
                                editable: false,
                                displayField: 'V_NODE_NAME_VIEW',
		                        valueField: 'ID_VIEW',
                                treeStore: 'EmployeeTreeStore',
                                treeWidth: 210,
                                x: 490,
                                y: 90
                            },
                            {
                                xtype: 'combobox',
                                name: 'V_FIN_CUSTOM',
                                fieldLabel: '最终用户（业主）',
                                //allowBlank: false,
                                //blankText: '不能为空！',
                                //emptyText: '请选择...',
                                editable: false,
                                queryMode: 'local',
                                displayField: 'V_COMBOX_NAME_VIEW',
                                valueField: 'V_COMBOX_VALUE_VIEW',
                                store: 'ClientListJsonStore',
                                x: 10,
                                y: 130
                            },
                            {
                                xtype: 'combobox',
                                name: 'V_PRO_PROCESS',
                                fieldLabel: '项目审批进度',
                                //allowBlank: false,
                                //blankText: '不能为空！',
                                //emptyText: '请选择...',
                                editable: false,
                                queryMode: 'local',
                                displayField: 'V_COMBOX_NAME_VIEW',
                                valueField: 'V_COMBOX_VALUE_VIEW',
                                store: 'ProjReviewStore',
                                x: 250,
                                y: 130
                            },
                            {
                                xtype: 'textfield',
                                name: 'V_OPPOENT',
                                fieldLabel: '主要竞争对手',
                                enforceMaxLength: true,
                                maxLength: 60,
                                x: 490,
                                y: 130
                            },
                            {
                                xtype: 'textareafield',
                                height: 50,
                                width: 700,
                                name: 'V_PRO_INFO',
                                fieldLabel: '项目基本信息',
                                //allowBlank: false,
                                //blankText: '不能为空！',
                                enforceMaxLength: true,
                                maxLength: 500,
                                x: 10,
                                y: 170
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        height: 200,
                        defaults: {
                            labelWidth: 60
                        },
                        layout: {
                            type: 'absolute'
                        },
                        collapsible: true,
                        title: '项目补充信息',
                        flex: 1,
                        items: [
                            {
                                xtype: 'combobox',
                                name: 'V_DESIGN',
                                fieldLabel: '设计院',
                                editable: false,
                                queryMode: 'local',
                                displayField: 'V_COMBOX_NAME_VIEW',
                                valueField: 'V_COMBOX_VALUE_VIEW',
                                store: 'DesignListJsonStore',
                                x: 10,
                                y: 10
                            },
                            {
                                xtype: 'textfield',
                                name: 'V_RECOM_MACHINE',
                                fieldLabel: '设计院推荐机型',
                                enforceMaxLength: true,
                                maxLength: 60,
                                x: 250,
                                y: 10
                            },
                            {
                                xtype: 'textfield',
                                name: 'V_RECOM_MANU',
                                fieldLabel: '设计院推荐厂家',
                                enforceMaxLength: true,
                                maxLength: 60,
                                x: 490,
                                y: 10
                            },
                            {
                                xtype: 'combobox',
                                name: 'V_WIND_TYPE',
                                fieldLabel: '风场类别',
                                editable: false,
                                queryMode: 'local',
                                displayField: 'V_COMBOX_NAME_VIEW',
                                valueField: 'V_COMBOX_VALUE_VIEW',
                                store: 'WindTypeStore',
                                x: 10,
                                y: 50
                            },
                            {
                                xtype: 'numberfield',
                                name: 'N_CAPACITY',
                                fieldLabel: '风场总容量（万）',
                                enforceMaxLength: true,
                                maxLength: 10,
                                x: 250,
                                y: 50
                            },
                            {
                                xtype: 'textfield',
                                name: 'V_WIND_ADDR',
                                fieldLabel: '风场地址',
                                enforceMaxLength: true,
                                maxLength: 60,
                                x: 490,
                                y: 50
                            },
                            {
                                xtype: 'numberfield',
                                name: 'N_AVG_WINDSPEED',
                                fieldLabel: '年平均风速(m/s)',
                                enforceMaxLength: true,
                                maxLength: 10,
                                x: 10,
                                y: 90
                            },
                            {
                                xtype: 'numberfield',
                                name: 'N_CHECK_HIGH',
                                fieldLabel: '测风高度（m）',
                                enforceMaxLength: true,
                                maxLength: 10,
                                x: 250,
                                y: 90
                            },
                            {
                                xtype: 'numberfield',
                                name: 'N_LIMIT_WINDSPEED',
                                fieldLabel: '极大风速(m/s)',
                                enforceMaxLength: true,
                                maxLength: 10,
                                x: 490,
                                y: 90
                            },
                            {
                                xtype: 'numberfield',
                                name: 'N_MAX_WINDSPEED',
                                fieldLabel: '最大风速(m/s)',
                                enforceMaxLength: true,
                                maxLength: 10,
                                x: 10,
                                y: 130
                            },
                            {
                                xtype: 'numberfield',
                                name: 'N_ALTITUDE',
                                fieldLabel: '海拔高度（m）',
                                enforceMaxLength: true,
                                maxLength: 10,
                                x: 250,
                                y: 130
                            },
                            {
                                xtype: 'numberfield',
                                name: 'N_AIR_DENS',
                                fieldLabel: '空气密度（kg/m3）',
                                enforceMaxLength: true,
                                maxLength: 10,
                                x: 490,
                                y: 130
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        margin: '5 10 10 566',
                        width: 60,
                        iconCls: 'ok_btn',
                        text: '提交'
                    },
                    {
                        xtype: 'button',
                        margin: '5 25 10 0',
                        width: 60,
                        iconCls: 'stop_btn',
                        text: '关闭'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});