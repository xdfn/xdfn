/**
 * File: app/project/ui/ContractWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ContractWindow', {
    extend: 'Ext.window.Window',

    height: 590,
    width: 756,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'contract_tabs',
    title: '增加合同',
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
                        name: 'V_CON_CODE',
                        fieldLabel: '合同编号',
                        allowBlank: false,
                        blankText: '编号不能为空！',
                        emptyText: '请输入合同编号',
                        enforceMaxLength: true,
                        maxLength: 40
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_CON_NAME',
                        fieldLabel: '合同名称',
                        allowBlank: false,
                        blankText: '账号不能为空！',
                        emptyText: '请输入合同名称',
                        enforceMaxLength: true,
                        maxLength: 100
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
                        maxLength: 100
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 0 0',
                        name: 'V_STATE',
                        fieldLabel: '签订状态',
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
				    	        ['未签订', '未签订'],
				    	        ['已签订', '已签订']
				    	    ]
				    	})
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 0 0',
                        name: 'V_TRANS',
                        fieldLabel: '移交状态',
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
				    	        ['未移交', '未移交'],
				    	        ['已移交', '已移交']
				    	    ]
				    	})
                    },
                    {
                        xtype: 'datefield',
                        margin: '5 25 0 0',
                        name: 'D_PRE_SIGN_DATE',
                        fieldLabel: '签订预测时间',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        enforceMaxLength: true,
                        maxLength: 30,
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d'
                    },
                    {
                        xtype: 'numberfield',
                        margin: '5 25 0 0',
                        name: 'N_XSTS',
                        fieldLabel: '销收台数',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入',
                        enforceMaxLength: true,
                        maxLength: 5
                    },
                    {
                        xtype: 'numberfield',
                        margin: '5 25 0 0',
                        name: 'N_HTTS',
                        fieldLabel: '合同台数',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入',
                        enforceMaxLength: true,
                        maxLength: 5
                    },
                    {
                        xtype: 'numberfield',
                        margin: '5 25 0 0',
                        name: 'N_HTZJ',
                        fieldLabel: '合同总价',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入',
                        enforceMaxLength: true,
                        maxLength: 18
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 0 0',
                        name: 'V_SW_ZZR',
                        fieldLabel: '商务部分制作人',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 0 0',
                        name: 'V_XY_ZZR',
                        fieldLabel: '技术协议制作人',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 0 0',
                        name: 'V_HTZRR',
                        fieldLabel: '合同跟进责任人',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'combotree',
                        margin: '5 25 0 0',
                        name: 'V_GSBSC',
                        fieldLabel: '归属办事处',
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
                        xtype: 'combobox',
                        margin: '5 25 0 0',
                        name: 'V_HTPS',
                        fieldLabel: '合同评审',
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
				    	        ['已开', '已开'],
				    	        ['未开', '未开']
				    	    ]
				    	})
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 0 0',
                        name: 'V_BZJ',
                        fieldLabel: '履约保函/保证金',
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
				    	        ['已办理', '已办理'],
				    	        ['未办理', '未办理']
				    	    ]
				    	})
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 0 0',
                        name: 'V_HZQK',
                        fieldLabel: '核准情况',
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
				    	        ['已核准', '已核准'],
				    	        ['未核准', '未核准']
				    	    ]
				    	})
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 0 0',
                        name: 'V_HTZXZT',
                        fieldLabel: '合同执行状态',
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
				    	        ['未排产', '未排产'],
				    	        ['已排产', '已排产'],
				    	        ['开始发货', '开始发货'],
				    	        ['安装调试', '安装调试'],
				    	        ['未过240预验收', '未过240预验收'],
				    	        ['已过240预验收', '已过240预验收'],
				    	        ['进入质保期', '进入质保期'],
				    	        ['质保期到期', '质保期到期'],
				    	        ['已过质保期', '已过质保期'],
				    	        ['合同终止', '合同终止']
				    	    ]
				    	})
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 0 0',
                        name: 'V_ZBQ',
                        fieldLabel: '质保期',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 0 0',
                        name: 'V_PRO_ID',
                        fieldLabel: '关联项目',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        queryMode: 'local',
                        store: 'ProjListJsonStore'
                    },
                    {
                        xtype: 'datefield',
                        margin: '5 25 0 0',
                        name: 'D_SIGN_DATE',
                        fieldLabel: '签订时间',
                        emptyText: '请选择...',
                        enforceMaxLength: true,
                        maxLength: 30,
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 0 0',
                        name: 'V_SHZRR',
                        fieldLabel: '售后责任人',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 696,
                        name: 'V_HTJX',
                        fieldLabel: '合同机型',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入合同机型',
                        enforceMaxLength: true,
                        maxLength: 500
                    },
                    {
                        xtype: 'textareafield',
                        height: 100,
                        margin: '5 25 10 0',
                        width: 696,
                        name: 'V_HTZDTK',
                        fieldLabel: '合同重点条款',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入合同重点条款',
                        enforceMaxLength: true,
                        maxLength: 3000
                    },
                    {
                        xtype: 'textareafield',
                        height: 61,
                        margin: '5 25 10 0',
                        width: 696,
                        name: 'V_MEMO',
                        fieldLabel: '备注',
                        enforceMaxLength: true,
                        maxLength: 2000
                    },
                    {
                        xtype: 'button',
                        margin: '5 10 10 550',
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