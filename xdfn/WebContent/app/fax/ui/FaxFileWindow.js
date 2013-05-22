/**
 * File: app/fax/ui/FaxFileWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.fax.ui.FaxFileWindow', {
    extend: 'Ext.window.Window',

    height: 268,
    width: 514,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'fax_tabs',
    title: '增加附件',
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
                        xtype: 'filefield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_ATTACH_FILE',
                        fieldLabel: '附件文件',
                        allowBlank: false,
                        blankText: '附件文件不能为空！',
                        emptyText: '请选择要上传附件文件',
                        buttonText: '选择文件...'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_FAX_FILENAME',
                        fieldLabel: '附件名称',
                        allowBlank: false,
                        blankText: '附件名称不能为空！',
                        emptyText: '请输入附件名称',
                        enforceMaxLength: true,
                        maxLength: 100
                    },
                    {
                        xtype: 'textareafield',
                        height: 85,
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_DETAIL',
                        fieldLabel: '附件说明',
                        enforceMaxLength: true,
                        maxLength: 200
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