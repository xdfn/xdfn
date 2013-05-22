/**
 * File: app/project/ui/ProjStandingWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjStandingWindow', {
    extend: 'Ext.window.Window',

    height: 399,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'project_tabs',
    title: '增加台账',
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
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_TYPE',
                        fieldLabel: '费用类型',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['保证金', '保证金'],
				    	        ['购买标书费', '购买标书费'],
				    	        ['中标服务费', '中标服务费'],
				    	        ['标书印刷费', '标书印刷费'],
				    	        ['资格预审印刷费', '资格预审印刷费'],
				    	        ['招标网注册费', '招标网注册费'],
				    	        ['其他', '其他']
				    	    ]
				    	}),
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW'
                    },
                    {
                        xtype: 'numberfield',
                        margin: '5 25 10 0',
                        name: 'N_SUM',
                        fieldLabel: '费用金额',
                        allowBlank: false,
                        blankText: '不能为空！',
                        minValue: 0,
                        enforceMaxLength: true,
                        maxLength: 18
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_PAY_STATUS',
                        fieldLabel: '支付情况',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['已付', '已付'],
				    	        ['未付', '未付']
				    	    ]
				    	}),
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_PAY_MODE',
                        fieldLabel: '支付方式',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['电汇', '电汇'],
				    	        ['保函', '保函'],
				    	        ['现金', '现金']
				    	    ]
				    	}),
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW'
                    },
                    {
                        xtype: 'datefield',
                        margin: '5 25 10 0',
                        name: 'D_PAY_DATE',
                        fieldLabel: '支付日期',
                        format: 'Y年m月d日',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_PAYEE',
                        fieldLabel: '收款单位',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入收款单位',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_PAYER',
                        fieldLabel: '付款人',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入付款人',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_INVOICE',
                        fieldLabel: '发票情况',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['已回', '已回'],
				    	        ['未回', '未回'],
				    	        ['无', '无']
				    	    ]
				    	}),
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_SUBMIT_PAY',
                        fieldLabel: '报销情况',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['已报销', '已报销'],
				    	        ['未报销', '未报销'],
				    	        ['无', '无']
				    	    ]
				    	}),
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW'
                    },
                    {
                        xtype: 'textareafield',
                        height: 110,
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_REMARK',
                        fieldLabel: '补充说明',
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