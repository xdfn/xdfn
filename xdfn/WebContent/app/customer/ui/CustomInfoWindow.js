/**
 * File: app/customer/ui/CustomInfoWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.customer.ui.CustomInfoWindow', {
    extend: 'Ext.window.Window',

    height: 565,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'customer_tabs',
    title: '增加客户',
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
                        name: 'V_CUSTOM_NAME',
                        fieldLabel: '客户名称',
                        allowBlank: false,
                        blankText: '客户名称不能为空！',
                        emptyText: '请输入客户名称',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                    	xtype: 'combotree',
                        treeStore: 'ZoneTreeStore',
                        useArrows: true,
                        fieldLabel: '所属区域',
                        name: 'V_ZONE',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        displayField: 'V_NODE_NAME_VIEW',
                        labelWidth: 60,
                        editable: false,
                        margin: '5 25 10 0'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_TYPE_BELONG',
                        fieldLabel: '归属类型',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        queryMode: 'local',
                        store: 'CustomBelongStore'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_TYPE_TRADE',
                        fieldLabel: '客户性质',
                        //allowBlank: false,
                        //blankText: '不能为空！',
                        //emptyText: '请选择...',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        queryMode: 'local',
                        store: 'TradeTypeStore'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_PHASE',
                        fieldLabel: '所处阶段',
                        //allowBlank: false,
                        //blankText: '不能为空！',
                        //emptyText: '请选择...',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        queryMode: 'local',
                        store: 'CustomPhaseStore'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 100 10 0',
                        name: 'V_LEVEL',
                        fieldLabel: '客户等级',
                        //allowBlank: false,
                        //blankText: '不能为空！',
                        //emptyText: '请选择...',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        queryMode: 'local',
                        store: 'CustomLevelStore'
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 100 10 0',
                        width: 455,
                        name: 'V_PARENT_NAME',
                        fieldLabel: '上级单位',
                        enforceMaxLength: true,
                        maxLength: 50,
                        //allowBlank: false,
                        //blankText: '不能为空！',
                        //emptyText: '请选择...',
                        editable: true,
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['华能集团', '华能集团'],
				    	        ['大唐集团', '大唐集团'],
				    	        ['中广核', '中广核'],
				    	        ['华电集团', '华电集团'],
				    	        ['国华', '国华'],
				    	        ['中电投集团', '中电投集团'],
				    	        ['中国风电', '中国风电'],
				    	        ['国电集团', '国电集团'],
				    	        ['华润', '华润'],
				    	        ['新天绿色能源', '新天绿色能源'],
				    	        ['三峡集团', '三峡集团'],
				    	        ['天润', '天润'],
				    	        ['中海油', '中海油'],
				    	        ['中水顾问', '中水顾问'],
				    	        ['中水建', '中水建'],
				    	        ['其他', '其他'],
				    	        ['无', '无']
				    	    ]
				    	})
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 100 10 0',
                        width: 455,
                        name: 'V_REL_AGENT',
                        fieldLabel: '关联代理',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_PHONE',
                        fieldLabel: '电话',
                        //allowBlank: false,
                        //blankText: '电话不能为空！',
                        enforceMaxLength: true,
                        regex: /^[\d-,]*$/,
                        regexText: '输入格式不正确！',
                        //emptyText: '请输入电话号码',
                        maxLength: 30
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_FAX',
                        fieldLabel: '传真',
                        enforceMaxLength: true,
                        regex: /^[\d-,]*$/,
                        regexText: '输入格式不正确！',
                        maxLength: 30
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 100 10 0',
                        width: 215,
                        name: 'V_POST_CODE',
                        fieldLabel: '邮编',
                        enforceMaxLength: true,
                        regex: /^[\d]*$/,
                        regexText: '输入格式不正确！',
                        maxLength: 10
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 100 10 0',
                        width: 455,
                        name: 'V_EMAIL',
                        fieldLabel: '电子邮箱',
                        enforceMaxLength: true,
                        vtype: 'email',
                        vtypeText: '输入格式不正确！',
                        maxLength: 50
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 100 10 0',
                        width: 455,
                        name: 'V_WEB',
                        fieldLabel: '网址',
                        enforceMaxLength: true,
                        maxLength: 100
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_ADDRESS',
                        fieldLabel: '地址',
                        //allowBlank: false,
                        //blankText: '地址不能为空！',
                        //emptyText: '请输入客户联系地址',
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