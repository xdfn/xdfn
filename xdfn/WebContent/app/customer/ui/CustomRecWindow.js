/**
 * File: app/customer/ui/CustomRecWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.customer.ui.CustomRecWindow', {
    extend: 'Ext.window.Window',

    height: 530,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'customer_tabs',
    title: '增加记录',
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
                        xtype: 'datefield',
                        margin: '5 25 10 0',
                        name: 'D_REC_DATE',
                        fieldLabel: '接待日期',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_REC_DATE', end: 'D_LEAVE_DATE', parent: me}
                    },
                    {
                        xtype: 'datefield',
                        margin: '5 25 10 0',
                        name: 'D_LEAVE_DATE',
                        fieldLabel: '结束日期',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_REC_DATE', end: 'D_LEAVE_DATE', parent: me}
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_REC_LEVEL',
                        fieldLabel: '接待等级',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: 'RecLevelStore',
                        queryMode: 'local'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_PRO_ID',
                        fieldLabel: '关联项目',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        editable: false,
                        queryMode: 'local',
                        store: 'ProjListJsonStore'
                    },
                    {
                    	xtype: 'combotree',
                        treeStore: 'EmployeeTreeStore',
                        useArrows: true,
                        margin: '5 25 10 0',
                        name: 'V_APPLIER',
                        fieldLabel: '申请人',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        displayField: 'V_NODE_NAME_VIEW',
                        labelWidth: 60,
                        treeWidth: 210,
                        editable: false
                    },
                    {
                        xtype: 'combotree',
                        margin: '5 25 10 0',
                        name: 'V_CUS_BELONGED',
                        fieldLabel: '接待部门',
                        labelWidth: 70,
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        width: 214,
                        treeWidth: 220,
                        displayField: 'V_NODE_NAME_VIEW',
                        treeStore: 'DeptDutyTreeStore',
                        allowUnLeafClick: true,
                        leafClickDisable: true
                    },
                    {
                    	xtype: 'combotree',
                        treeStore: 'EmployeeTreeStore',
                        useArrows: true,
                        margin: '5 25 10 0',
                        name: 'V_RECER',
                        fieldLabel: '接待负责人',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        displayField: 'V_NODE_NAME_VIEW',
                        labelWidth: 70,
                        width: 214,
                        treeWidth: 210,
                        editable: false
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_REC_SUBJECT',
                        fieldLabel: '接待主题',
                        allowBlank: false,
                        blankText: '主题不能为空！',
                        emptyText: '请输入接待主题',
                        enforceMaxLength: true,
                        maxLength: 100
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_CUS_COMP',
                        fieldLabel: '客户单位',
                        allowBlank: false,
                        blankText: '客户单位不能为空！',
                        emptyText: '请输入客户单位',
                        enforceMaxLength: true,
                        maxLength: 100
                    },
                    {
                        xtype: 'textareafield',
                        margin: '5 100 10 0',
                        width: 455,
                        name: 'V_REC_CARD',
                        fieldLabel: '客户名片',
                        emptyText: '请输入客户名片（如客户人员情况）',
                        enforceMaxLength: true,
                        maxLength: 500
                    },
                    {
                        xtype: 'textareafield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_REC_LOG',
                        fieldLabel: '接待日志',
                        enforceMaxLength: true,
                        maxLength: 500
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 100 10 0',
                        width: 455,
                        name: 'V_REC_RESULT',
                        fieldLabel: '接待效果',
                        enforceMaxLength: true,
                        maxLength: 50
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