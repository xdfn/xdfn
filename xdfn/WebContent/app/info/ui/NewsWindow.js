/**
 * File: app/info/ui/NewsWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.info.ui.NewsWindow', {
    extend: 'Ext.window.Window',

    height: 560,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'customer_tabs',
    title: '增加资讯',
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
                        fieldLabel: '资讯标题',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入资讯标题',
                        enforceMaxLength: true,
                        maxLength: 100
                    },
                    {
                        xtype: 'textareafield',
                        margin: '5 25 10 0',
                        width: 455,
                        height: 100,
                        name: 'V_SUMARRY',
                        fieldLabel: '资讯摘要',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入资讯内容',
                        enforceMaxLength: true,
                        maxLength: 300
                    },
                    {
                        xtype: 'htmleditor',
                        margin: '5 25 10 0',
                        width: 455,
                        height: 220,
                        name: 'V_CONTENT',
                        fieldLabel: '资讯内容',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入资讯内容'
                    },
                    {
                        xtype: 'textfield',
                        name: 'V_SOURCE',
                        fieldLabel: '信息来源',
                        margin: '5 25 10 0',
                        width: 455,
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入信息来源',
                        enforceMaxLength: true,
                        maxLength: 100
                    },
                    {
                        xtype: 'textfield',
                        name: 'V_PUBER',
                        fieldLabel: '发布人',
                        margin: '5 25 10 0',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入发布人',
                        enforceMaxLength: true,
                        maxLength: 20
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