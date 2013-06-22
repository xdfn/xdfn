/**
 * File: app/info/ui/News.js
 * Author: liusha
 */

Ext.define('xdfn.info.ui.News', {
    extend: 'Ext.panel.Panel',

    id: 'News',
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'info_tabs',
    title: '最新资讯',

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
                    type: 'column'
                },
                bodyPadding: 10,
                bodyStyle: 'background-color:#d8e6f4',
                collapsed: true,
                collapsible: true,
                title: '查询资讯',
                titleCollapse: true,
                //floatable: false,
                region: 'north',
                items: [
                    {
                    	xtype: 'textfield',
                        margin: '2 20 10 0',
                        name: 'V_TITLE',
                        fieldLabel: '资讯标题'
                    },
                    {
                        xtype: 'datefield',
                        margin: '2 20 10 0',
                        name: 'D_DATE_START',
                        fieldLabel: '发布时间',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_DATE_START', end: 'D_DATE_END', parent: me},
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        editable: false
                    },
                    {
                        xtype: 'datefield',
                        margin: '2 20 10 0',
                        name: 'D_DATE_END',
                        fieldLabel: '到',
                        vtype: 'dateRange',
                        dateRange: {begin: 'D_DATE_START', end: 'D_DATE_END', parent: me},
                        labelWidth: 20,
                        format: 'Y年m月d日',
                        submitFormat: 'Y-m-d',
                        editable: false
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
                forceFit: true,
                store: me.newsStore,
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
                        dataIndex: 'V_TITLE_VIEW',
                        text: '资讯标题',
                        tpl: '<a href="infoPub.do?method=newsById&ID={ID_VIEW}" target="_blank">{V_TITLE_VIEW}</a><br/><br/><span style="color:blue">摘要：</span>{V_SUMARRY_VIEW}'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 200,
                        dataIndex: 'V_SOURCE_VIEW',
                        text: '资讯来源'
                    },
                    {
                        xtype: 'datecolumn',
                        width: 200,
                        align: 'right',
                        dataIndex: 'D_PUB_DATE_VIEW',
                        text: '发布时间',
                        format: 'Y年m月d日 H时i分s秒'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PUBER_VIEW',
                        text: '发布人'
                    }
                ],
                viewConfig: {

                },
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: me.newsStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});