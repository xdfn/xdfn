/**
 * File: app/fax/ui/FaxInfoWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.fax.ui.FaxInfoWindow', {
    extend: 'Ext.window.Window',

    height: 312,
    width: 514,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'fax_tabs',
    title: '增加传真',
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
                        name: 'V_FAX_NO',
                        fieldLabel: '传真编号',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入传真编号',
                        enforceMaxLength: true,
                        maxLength: 40
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_FAX_TYPE',
                        fieldLabel: '传真类型',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: 'FaxTypeStore'
                    },
                    {
                        xtype: 'datefield',
                        margin: '5 25 10 0',
                        name: 'D_FAX_DATE',
                        fieldLabel: '传真日期',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择传真日期...',
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_FAX_TITLE',
                        fieldLabel: '传真标题',
                        allowBlank: false,
                        blankText: '标题不能为空！',
                        emptyText: '请输入传真标题',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                        xtype: 'textareafield',
                        height: 85,
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_MEMO',
                        fieldLabel: '备注',
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