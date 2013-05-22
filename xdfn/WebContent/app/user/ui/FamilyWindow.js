/**
 * File: app/user/ui/FamilyWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.user.ui.FamilyWindow', {
    extend: 'Ext.window.Window',

    height: 300,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'customer_tabs',
    title: '增加家属',
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
                        name: 'V_FAMILY_NAME',
                        fieldLabel: '家属姓名',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入家属姓名',
                        enforceMaxLength: true,
                        maxLength: 60
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_RELA',
                        fieldLabel: '家属关系',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        enforceMaxLength: true,
                        maxLength: 10,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['父亲', '父亲'],
				    	        ['母亲', '母亲'],
				    	        ['兄弟', '兄弟'],
				    	        ['姐妹', '姐妹'],
				    	        ['妻子', '妻子'],
				    	        ['子女', '子女']
				    	    ]
				    	}),
                        queryMode: 'local',
                        editable: false
                    },
                    {
                        xtype: 'textareafield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_ADDRESS',
                        fieldLabel: '联系方式',
                        enforceMaxLength: true,
                        maxLength: 200
                    },
                    {
                        xtype: 'textareafield',
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