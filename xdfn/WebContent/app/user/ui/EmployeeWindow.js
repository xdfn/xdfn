/**
 * File: app/user/ui/EmployeeWindow.js
 * Author: liusha
 */
 
 
Ext.define('xdfn.user.ui.EmployeeWindow', {
    extend: 'Ext.window.Window',

    height: 480,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'customer_tabs',
    title: '增加员工',
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
                        name: 'V_USER_ACC',
                        fieldLabel: '员工账号',
                        allowBlank: false,
                        blankText: '账号不能为空！',
                        emptyText: '请输入员工账号',
                        enforceMaxLength: true,
                        maxLength: 30
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_USER_NAME',
                        fieldLabel: '姓名',
                        allowBlank: false,
                        blankText: '姓名不能为空！',
                        emptyText: '请输入姓名',
                        enforceMaxLength: true,
                        maxLength: 60
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'C_GENDER',
                        fieldLabel: '性别',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['男', '男'],
				    	        ['女', '女']
				    	    ]
				    	})
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_IDCARD',
                        fieldLabel: '身份证',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入身份证',
                        regex: /^[\d]*$|^[\d]*[x]$/,
                        regexText: '输入格式不正确！',
                        enforceMaxLength: true,
                        maxLength: 18
                    },
                    {
                        xtype: 'datefield',
                        margin: '5 25 10 0',
                        name: 'D_BIRTHDAY',
                        fieldLabel: '生日',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d'
                    },
                    {
                        xtype: 'datefield',
                        margin: '5 25 10 0',
                        name: 'D_ENTRY_DATE',
                        fieldLabel: '入职日期',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        maxValue: new Date(),
                        maxText: '不能选择将来日期！',
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_ENTRY_DATE', end: 'D_EXP_DATE', parent: me}
                    },
                    {
                        xtype: 'datefield',
                        margin: '5 25 10 0',
                        name: 'D_EXP_DATE',
                        fieldLabel: '合同到期',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_ENTRY_DATE', end: 'D_EXP_DATE', parent: me}
                    },
                    {
                    	xtype: 'combotree',
                        treeStore: 'DeptDutyTreeStore',
                        useArrows: true,
                        allowUnLeafClick: true,
                        leafClickDisable: true,
                        margin: '5 25 10 0',
                        name: 'V_DEPT_ID',
                        fieldLabel: '所属部门',
                        displayField: 'V_NODE_NAME_VIEW',
					    valueField: 'ID_VIEW',
                        labelWidth: 60,
                        treeWidth: 220,
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false
                    },
                    {
                    	xtype: 'combotree',
                        treeStore: 'DeptDutyTreeStore',
                        useArrows: true,
                        margin: '5 25 10 0',
                        name: 'V_PST_ID',
                        fieldLabel: '职务',
                        displayField: 'V_NODE_NAME_VIEW',
					    valueField: 'ID_VIEW',
                        labelWidth: 60,
                        treeWidth: 230,
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_PHONE1',
                        fieldLabel: '手机1',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入手机号',
                        enforceMaxLength: true,
                        maxLength: 30,
                        regex: /^[\d]*$/,
                        regexText: '输入格式不正确！'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_PHONE2',
                        fieldLabel: '手机2',
                        enforceMaxLength: true,
                        maxLength: 30,
                        regex: /^[\d]*$/,
                        regexText: '输入格式不正确！'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_EMAIL',
                        fieldLabel: '电子邮箱',
                        vtype: 'email',
                        vtypeText: '输入格式不正确！',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_HOME_ADDR',
                        fieldLabel: '家庭住址',
                        enforceMaxLength: true,
                        maxLength: 200
                    },
                    {
                        xtype: 'textareafield',
                        margin: '5 25 10 0',
                        width: 455,
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