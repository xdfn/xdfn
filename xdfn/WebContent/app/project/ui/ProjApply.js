/**
 * File: app/project/ui/ProjApplyWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjApply', {
    extend: 'Ext.panel.Panel',

    id: 'ProjApply',
    layout: {
        type: 'fit'
    },
    autoShow: true,
    closable: false,
    title: '项目报送',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'gridpanel',
                store: me.applyStore,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        hidden: true,
                        dataIndex: 'ID_VIEW',
                        hideable: false,
                        text: 'ID'
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
                        width: 150,
                        dataIndex: 'V_OLD_TYPE_VIEW',
                        text: '原类型'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_TYPE_VIEW',
                        text: '报送类型'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_SUBMIT_MEMO_VIEW',
                        text: '报送说明'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_SUBMITTER_VIEW',
                        text: '报送人'
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
                                iconCls: 'apply_btn',
                                text: '项目报送'
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
                        store: me.applyStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});