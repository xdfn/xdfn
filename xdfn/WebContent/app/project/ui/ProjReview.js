/**
 * File: app/project/ui/ProjReview.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjReview', {
    extend: 'Ext.panel.Panel',

    id: 'ProjReview',
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'project_tabs',
    title: '项目审核',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                height: 110,
                defaults: {
                    labelWidth: 60
                },
                layout: {
                    type: 'column'
                },
                bodyPadding: 10,
                bodyStyle: 'background-color:#d8e6f4',
                collapsed: true,
                collapsible: true,
                titleCollapse: true,
                floatable: false,
                title: '查询审核信息',
                region: 'north',
                items: [
                    {
                        xtype: 'textfield',
                        margin: '2 10 10 0',
                        name: 'V_PRO_NO',
                        fieldLabel: '项目编号'
                    },
                    {
                        xtype: 'textfield',
                        margin: '2 10 10 0',
                        name: 'V_PRO_NAME',
                        fieldLabel: '项目名称'
                    },
                    {
                        xtype: 'datefield',
                        margin: '2 10 10 0',
                        name: 'D_APPLY_DATE_START',
                        fieldLabel: '报送时间',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_APPLY_DATE_START', end: 'D_APPLY_DATE_END', parent: me},
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        editable: false
                    },
                    {
                        xtype: 'datefield',
                        margin: '2 20 10 0',
                        name: 'D_APPLY_DATE_END',
                        fieldLabel: '到',
                        labelWidth: 20,
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_APPLY_DATE_START', end: 'D_APPLY_DATE_END', parent: me},
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        editable: false
                    },
                    {
                        xtype: 'combobox',
                        margin: '2 20 10 0',
                        name: 'V_REVIEW_STATUS',
                        fieldLabel: '审核状态',
                        editable: false,
                        queryMode: 'local',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: new Ext.data.ArrayStore({
				    	    model: 'Combox',
				    	    data: [
				    	        ['未审核', '未审核'],
				    	        ['已同意', '已同意'],
				    	        ['未通过', '未通过']
				    	    ]
				    	})
                    },
                    {
                        xtype: 'button',
                        margin: '2 10 10 0',
                        iconCls: 'search_btn',
                        text: '查找'
                    },
                    {
                        xtype: 'button',
                        margin: '2 20 10 0',
                        iconCls: 'reset_btn',
                        text: '重置'
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                region: 'center',
                store: me.reviewStore,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        hidden: true,
                        dataIndex: 'ID_VIEW',
                        hideable: false,
                        text: 'ID'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_PRO_NAME_VIEW',
                        text: '项目名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_OLD_TYPE_VIEW',
                        text: '原所处阶段'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_TYPE_VIEW',
                        text: '报送阶段'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 200,
                        dataIndex: 'D_SUBMIT_DATE_VIEW',
                        text: '报送时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_SUBMITTER_VIEW',
                        text: '报送人'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_DEPT_NAME_VIEW',
                        text: '所属部门'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_SUBMIT_MEMO_VIEW',
                        text: '报送说明'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_REVIEW_STATUS_VIEW',
                        text: '审核状态',
                        renderer: function(value){
                        	if (value == '已同意') {
                        		return '<span style="color:green">' + value + '</span>';
                        	}
                        	else if (value == '未通过') {
                        		return '<span style="color:red">' + value + '</span>';
                        	}
                        	else if (value == '未审核') {
                        		return '<span style="color:orange">' + value + '</span>';
                        	}
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        width: 200,
                        dataIndex: 'D_REVIEW_DATE_VIEW',
                        text: '审核时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_REVIEW_MEMO_VIEW',
                        text: '审核说明'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_REVIEWER_VIEW',
                        text: '审核人'
                    }
                ],
                viewConfig: {

                },
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'add_btn',
                                text: '审核项目'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除审核'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'ext_xls',
                                text: '导出'
                            }
                        ]
                    },
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: me.reviewStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});