/**
 * File: app/customer/ui/CustomLinkWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.customer.ui.CustomLinkWindow', {
    extend: 'Ext.window.Window',

    height: 380,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'customer_tabs',
    title: '增加联系人',
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
                        name: 'V_TRUE_NAME',
                        fieldLabel: '联系人',
                        allowBlank: false,
                        blankText: '联系人不能为空！',
                        emptyText: '请输入联系人姓名',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_PST',
                        fieldLabel: '职位',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入联系人职位',
                        enforceMaxLength: true,
                        maxLength: 30
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_PHONE1',
                        fieldLabel: '手机1',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入手机号码',
                        enforceMaxLength: true,
                        maxLength: 20,
                        regex: /^[\d]*$/,
                        regexText: '输入格式不正确！'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_PHONE2',
                        fieldLabel: '手机2',
                        enforceMaxLength: true,
                        maxLength: 20,
                        regex: /^[\d]*$/,
                        regexText: '输入格式不正确！'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_PHONE3',
                        fieldLabel: '固定电话',
                        enforceMaxLength: true,
                        maxLength: 20,
                        regex: /^[\d-]*$/,
                        regexText: '输入格式不正确！'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_FAX',
                        fieldLabel: '传真',
                        enforceMaxLength: true,
                        maxLength: 20,
                        regex: /^[\d-]*$/,
                        regexText: '输入格式不正确！'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 100 10 0',
                        width: 455,
                        name: 'V_EMAIL',
                        fieldLabel: 'Email',
                        enforceMaxLength: true,
                        maxLength: 50,
                        vtype: 'email',
                        vtypeText: '输入格式不正确！'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_QQ',
                        fieldLabel: 'QQ',
                        enforceMaxLength: true,
                        maxLength: 20,
                        regex: /^[\d]*$/,
                        regexText: '输入格式不正确！'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 215,
                        name: 'V_MSN',
                        fieldLabel: 'MSN',
                        enforceMaxLength: true,
                        maxLength: 45
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_ADDRESS',
                        fieldLabel: '地址',
                        enforceMaxLength: true,
                        maxLength: 100
                    },
                    {
                        xtype: 'textareafield',
                        margin: '5 25 10 0',
                        width: 455,
                        height: 50,
                        name: 'V_MEMO',
                        fieldLabel: '备注',
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