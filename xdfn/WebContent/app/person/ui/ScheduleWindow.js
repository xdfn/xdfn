/**
 * File: app/person/ui/ScheduleWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.person.ui.ScheduleWindow', {
    extend: 'Ext.window.Window',

    height: 562,
    width: 514,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'person_tabs',
    title: '写日程',
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
                    type: 'column'
                },
                bodyPadding: 10,
                bodyStyle: 'background-color:#d8e6f4;border:0px',
                items: [
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_TYPE_SHIYOU',
                        fieldLabel: '事由类型',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        queryMode: 'local',
                        store: 'ShiyouStore'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_TYPE_BELONG',
                        fieldLabel: '归属类型',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        queryMode: 'local',
                        store: 'ScheduleBelongStore'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_LEVEL',
                        fieldLabel: '等级',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        queryMode: 'local',
                        store: 'ScheduleLevelStore'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_REPORT',
                        fieldLabel: '报表类别',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        queryMode: 'local',
                        store: 'ReportStore'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 100 10 0',
                        width: 306,
                        name: 'V_PRO_ID',
                        fieldLabel: '关联项目',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        emptyText: '请选择...',
                        queryMode: 'local',
                        store: 'ProjListJsonStore'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_TITLE',
                        fieldLabel: '标题',
                        allowBlank: false,
                        blankText: '标题不能为空！',
                        emptyText: '请输入日程标题',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                        xtype: 'textareafield',
                        height: 177,
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_CONTENT',
                        fieldLabel: '日程内容',
                        allowBlank: false,
                        blankText: '内容不能为空！',
                        enforceMaxLength: true,
                        maxLength: 500
                    },
                    {
                        xtype: 'textareafield',
                        height: 114,
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_WORK_SUMMARY',
                        fieldLabel: '工作总结',
                        enforceMaxLength: true,
                        maxLength: 500
                    },
                    {
                        xtype: 'button',
                        margin: '5 10 10 325',
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