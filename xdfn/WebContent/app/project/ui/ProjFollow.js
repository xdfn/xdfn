/**
 * File: app/project/ui/ProjFlolow.js
 * Author: liusha
 */

Ext.define('xdfn.project.ui.ProjFollow', {
    extend: 'Ext.panel.Panel',

    //id: 'ProjFollow',
    layout: {
        type: 'border'
    },
    closable: false,
    title: '项目跟进',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'gridpanel',
                region: 'center',
                store: me.followStore,
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
                        width: 150,
                        dataIndex: 'D_FOLLOWUP_DATE_VIEW',
                        text: '跟进日期',
                        format: 'Y年m月d日'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_TITLE_VIEW',
                        text: '跟进主题'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_TYPE_VIEW',
                        text: '跟进类别'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_FOLLOWER_VIEW',
                        text: '跟进人'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_STATE_VIEW',
                        text: '总结状态'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 200,
                        dataIndex: 'D_SUMMARY_DATE_VIEW',
                        text: '总结时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_ANNO_STATE_VIEW',
                        text: '批示状态'
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
                        store: me.followStore,
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
                title: '批示信息',
                region: 'south',
                split: true,
                store: me.psStore,
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
                        width: 400,
                        dataIndex: 'V_CONTENT_VIEW',
                        text: '批示内容'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 180,
                        dataIndex: 'D_PS_TIME_VIEW',
                        text: '批示时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PSER_VIEW',
                        text: '批示人'
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
                                text: '增加批示'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改批示'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除批示'
                            }
                        ]
                    },
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: me.psStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});