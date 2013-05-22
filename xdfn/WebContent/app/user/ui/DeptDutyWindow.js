/**
 * File: app/user/ui/DeptDutyWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.user.ui.DeptDutyWindow', {
    extend: 'Ext.window.Window',

    height: 163,
    width: 289,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'customer_tabs',
    title: '增加部门或职务',
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
                        name: 'N_NODE_TYPE',
                        fieldLabel: '类型',
                        editable: false,
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['部门', 1],
				    	        ['职务', 2]
				    	    ]
				    	})
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 100 10 0',
                        name: 'V_NODE_NAME',
                        fieldLabel: '名称',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入名称',
                        enforceMaxLength: true,
                        maxLength: 30
                    },
                    {
                        xtype: 'button',
                        margin: '5 10 10 85',
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