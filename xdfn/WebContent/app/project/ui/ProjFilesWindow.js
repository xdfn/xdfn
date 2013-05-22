/**
 * File: app/project/ui/ProjFilesWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjFilesWindow', {
    extend: 'Ext.window.Window',

    height: 245,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'project_tabs',
    title: '增加往来记录',
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
                        fieldLabel: '往来主题',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入主题',
                        enforceMaxLength: true,
                        maxLength: 100
                    },
                    {
                        xtype: 'textareafield',
                        height: 110,
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_CONTENT',
                        fieldLabel: '往来纪要',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入纪要',
                        enforceMaxLength: true,
                        maxLength: 4000
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