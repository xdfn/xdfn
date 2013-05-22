/**
 * File: app/service/ui/ServiceWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.service.ui.ServiceWindow', {
    extend: 'Ext.window.Window',

    height: 530,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'customer_tabs',
    title: '增加服务记录',
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
                        name: 'V_CONTRACT_NAME',
                        fieldLabel: '合同名称',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入合同名称',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_TITLE',
                        fieldLabel: '服务主题',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入服务主题',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                        xtype: 'combotree',
                        margin: '5 25 0 0',
                        labelWidth: 70,
                        name: 'V_OFFICE_BRANCH',
                        fieldLabel: '责任部门',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        width: 215,
                        treeWidth: 220,
                        displayField: 'V_NODE_NAME_VIEW',
                        treeStore: 'DeptDutyTreeStore',
                        allowUnLeafClick: true,
                        leafClickDisable: true
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_DUTYER',
                        fieldLabel: '责任领导',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入责任人',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_CUST_NAME',
                        fieldLabel: '客户名称',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入客户名称',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 0 0',
                        name: 'V_CUST_LINKER',
                        fieldLabel: '客户联系人',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入联系人',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'datefield',
                        margin: '5 25 10 0',
                        name: 'D_RESPONSE_TIME',
                        fieldLabel: '最迟回复时间',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_STATUS',
                        fieldLabel: '服务状态',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: 'ServiceStatusStore'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_PHONE',
                        fieldLabel: '联系电话',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入电话',
                        enforceMaxLength: true,
                        maxLength: 30,
                        regex: /^[\d-]*$/,
                        regexText: '输入格式不正确！'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_FAX',
                        fieldLabel: '传真',
                        enforceMaxLength: true,
                        maxLength: 30,
                        regex: /^[\d-]*$/,
                        regexText: '输入格式不正确！'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_HANDLER',
                        fieldLabel: '第一责任人',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'textareafield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_DES',
                        fieldLabel: '问题描述',
                        allowBlank: false,
                        blankText: '不能为空！',
                        enforceMaxLength: true,
                        maxLength: 2000
                    },
                    {
                        xtype: 'textareafield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_REPLY',
                        fieldLabel: '问题回复',
                        enforceMaxLength: true,
                        maxLength: 2000
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