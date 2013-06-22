/**
 * File: app/fax/ui/FaxInfo.js
 * Author: liusha
 */
 
Ext.define('xdfn.fax.ui.FaxInfo', {
    extend: 'Ext.panel.Panel',

    layout: {
        type: 'border'
    },
    id: 'FaxInfo',
    closable: true,
    iconCls: 'fax_tabs',
    title: '传真管理',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                height: 80,
                defaults: {
                    labelWidth: 60
                },
                layout: {
                    type: 'absolute'
                },
                bodyPadding: 10,
                bodyStyle: 'background-color:#d8e6f4',
                collapsed: true,
                collapsible: true,
                title: '查询传真',
                titleCollapse: true,
                //floatable: false,
                region: 'north',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'V_FAX_TITLE',
                        fieldLabel: '传真标题'
                    },
                    {
                        xtype: 'combobox',
                        name: 'V_FAX_TYPE',
                        fieldLabel: '传真类型',
                        editable: false,
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        store: 'FaxTypeStore',
                        x: 240,
                        y: 10
                    },
                    {
                        xtype: 'datefield',
                        name: 'D_FAX_START_DATE',
                        fieldLabel: '起始日期',
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_FAX_START_DATE', end: 'D_FAX_END_DATE', parent: me},
                        x: 470,
                        y: 10
                    },
                    {
                        xtype: 'datefield',
                        name: 'D_FAX_END_DATE',
                        fieldLabel: '到',
                        labelWidth: 20,
                        editable: false,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_FAX_START_DATE', end: 'D_FAX_END_DATE', parent: me},
                        x: 700,
                        y: 10
                    },
                    {
                        xtype: 'button',
                        iconCls: 'search_btn',
                        text: '查找',
                        x: 890,
                        y: 10
                    },
                    {
                        xtype: 'button',
                        iconCls: 'reset_btn',
                        text: '重置',
                        x: 950,
                        y: 10
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                floatable: false,
                region: 'center',
                split: true,
                store: me.faxStore,
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
                        dataIndex: 'V_FAX_NO_VIEW',
                        text: '传真编号'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 300,
                        dataIndex: 'V_FAX_TITLE_VIEW',
                        text: '传真标题'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_FAX_TYPE_VIEW',
                        text: '传真类型'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 150,
                        dataIndex: 'D_FAX_DATE_VIEW',
                        text: '传真日期',
                        format: 'Y年m月d日'
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
                                text: '增加传真'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改传真'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除传真'
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
                        store: me.faxStore,
                        dock: 'bottom'
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                height: 200,
                collapsible: true,
                titleCollapse: true,
                title: '传真附件',
                floatable: false,
                region: 'south',
                split: true,
                store: me.fileStore,
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
                        width: 300,
                        dataIndex: 'V_FAX_FILENAME_VIEW',
                        text: '附件文件名',
                        tpl: '<a href="{V_FILE_URL_VIEW}" target="_blank">{V_FAX_FILENAME_VIEW}</a>'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 300,
                        dataIndex: 'V_DETAIL_VIEW',
                        text: '附件说明'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 200,
                        dataIndex: 'D_UP_DATE_VIEW',
                        text: '上传时间',
                        format: 'Y年m月d日 H时i分s秒'
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
                                text: '增加附件'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'modify_btn',
                                text: '修改附件'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'remove_btn',
                                text: '删除附件'
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'ext_xls',
                                text: '导出 '
                            }
                        ]
                    },
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: me.fileStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});