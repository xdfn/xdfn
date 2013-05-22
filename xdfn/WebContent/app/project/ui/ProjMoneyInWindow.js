/**
 * File: app/project/ui/ProjMoneyInWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjMoneyInWindow', {
    extend: 'Ext.window.Window',

    height: 128,
    width: 273,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'project_tabs',
    title: '增加款项',
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
                        name: 'V_NAME',
                        fieldLabel: '款项名称',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '输入款项名',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                        xtype: 'button',
                        margin: '5 10 10 85',
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