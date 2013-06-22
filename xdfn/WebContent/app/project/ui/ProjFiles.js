/**
 * File: app/project/ui/ProjFiles.js
 * Author: liusha
 */

Ext.define('xdfn.project.ui.ProjFiles', {
    extend: 'Ext.panel.Panel',

    //id: 'ProjFiles',
    layout: {
        type: 'border'
    },
    closable: false,
    title: '项目往来档案',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'gridpanel',
                region: 'center',
                forceFit: true,
                store: me.filesStore,
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
                        dataIndex: 'D_DATE_VIEW',
                        text: '创建时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_TITLE_VIEW',
                        text: '往来主题'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_RECODER_VIEW',
                        text: '提供人'
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
                                text: '增加记录'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改记录'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除记录'
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
                        store: me.filesStore,
                        dock: 'bottom'
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                //height: 200,
                //collapsed: true,
                collapsible: true,
                titleCollapse: true,
                title: '档案清单',
                region: 'south',
                split: true,
                store: me.fileslistStore,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        hidden: true,
                        dataIndex: 'ID_VIEW',
                        hideable: false,
                        text: 'ID'
                    },
                    {
                        xtype: 'templatecolumn',
                        width: 200,
                        dataIndex: 'V_FILENAME_VIEW',
                        text: '档案名称',
                        tpl: '<a href="{V_FILE_ATT_VIEW}" target="_blank">{V_FILENAME_VIEW}</a>'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'V_CODE_VIEW',
                        text: '档案编号'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_TYPE_VIEW',
                        text: '档案类别'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_RECEIVER_VIEW',
                        text: '接收人'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_SENDER_VIEW',
                        text: '提交人'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_MEMO_VIEW',
                        text: '备注'
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
                                text: '增加档案'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改档案'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除档案'
                            }
                        ]
                    },
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: me.fileslistStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});