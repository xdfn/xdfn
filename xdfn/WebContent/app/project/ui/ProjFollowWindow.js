/**
 * File: app/project/ui/ProjFollowWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjFollowWindow', {
    extend: 'Ext.window.Window',

    height: 340,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'customer_tabs',
    title: '增加跟进记录',
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
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_TITLE',
                        fieldLabel: '跟进主题',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入主题',
                        enforceMaxLength: true,
                        maxLength: 100
                    },
                    {
                        xtype: 'textareafield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_REMARK',
                        fieldLabel: '跟进纪要',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入纪要',
                        enforceMaxLength: true,
                        maxLength: 500
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_TYPE',
                        fieldLabel: '跟进类别',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: 'ProjFollowTypeStore'
                    },
                    {
                        xtype: 'datefield',
                        margin: '5 25 10 0',
                        name: 'D_FOLLOWUP_DATE',
                        fieldLabel: '跟进日期',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d'
                    },
                    {
                        xtype: 'textareafield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_MEMO',
                        fieldLabel: '效果及总结',
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
                        margin: '5 10 10 0',
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