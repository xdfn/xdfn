/**
 * File: app/project/ui/PSWindow.js
 * Author: liusha.
 */
 
Ext.define('xdfn.project.ui.PSWindow', {
    extend: 'Ext.window.Window',

    height: 245,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'customer_tabs',
    title: '增加批示',
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
                        xtype: 'textareafield',
                        height: 137,
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_CONTENT',
                        fieldLabel: '批示',
                        allowBlank: false,
                        blankText: '不能为空！',
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