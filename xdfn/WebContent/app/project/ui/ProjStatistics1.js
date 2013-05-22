/**
 * File: app/project/ui/ProjStatistics1.js
 * Author: liusha
 */

Ext.define('xdfn.project.ui.ProjStatistics1', {
    extend: 'Ext.panel.Panel',

    id: 'ProjStatistics',
    closable: true,
    border: false,
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'project_tabs',
    title: '项目统计',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    width: 296,
                    layout: {
                        type: 'column'
                    },
                    bodyPadding: 10,
                    bodyStyle: 'background-color:#d8e6f4',
                    collapsed: false,
                    collapsible: true,
                    title: '统计条件',
                    titleCollapse: true,
                    region: 'west',
                    items: [
                        {
                            xtype: 'fieldset',
                            margin: '0 20 10 0',
                            width: 276,
                            defaults: {
                                labelWidth: 60
                            },
                            layout: {
                                type: 'column'
                            },
                            title: '统计时段',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    width: 276,
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            name: 'V_BY_TYPE',
                                            boxLabel: '按年份',
                                            checked: true
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'V_BY_TYPE',
                                            boxLabel: '按季度'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'V_BY_TYPE',
                                            boxLabel: '按月份'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'V_BY_TYPE',
                                            boxLabel: '按周'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'D_START_TIME',
                                    fieldLabel: '起始时间',
                                    editable: false,
                                    format: 'Y年m月d日',
                                    submitFormat: 'Y-m-d'
                                },
                                {
                                    xtype: 'datefield',
                                    margin: '0 0 10 0',
                                    name: 'D_END_TIME',
                                    fieldLabel: '结束时间',
                                    editable: false,
                                    format: 'Y年m月d日',
                                    submitFormat: 'Y-m-d'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margin: '0 20 10 0',
                            width: 276,
                            title: '统计选项',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    name: 'V_PRO_STAT_OPTS',
                                    defaultType: 'radio',
                                    allowBlank: false,
                                    layout: {
                                        type: 'anchor'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            name: 'V_PRO_STAT_TYPE',
                                            inputValue: '1',
                                            boxLabel: '项目类别'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'V_PRO_STAT_TYPE',
                                            inputValue: '2',
                                            boxLabel: '归属办事处'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'V_PRO_STAT_TYPE',
                                            inputValue: '3',
                                            boxLabel: '风场所在省'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'V_PRO_STAT_TYPE',
                                            inputValue: '4',
                                            boxLabel: '项目所处阶段',
                                            checked: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            margin: '0 10 10 140',
                            iconCls: 'stat_btn',
                            text: '统计'
                        },
                        {
                            xtype: 'button',
                            margin: '0 0 10 0',
                            iconCls: 'reset_btn',
                            text: '重置'
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    activeTab: 0,
                    bodyStyle: 'border: 0px',
                    floatable: false,
                    region: 'center',
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'fit'
                            },
                            title: '统计列表',
                            items: [
                                {
					                xtype: 'gridpanel',
					                store: me.statStore,
					                columns: [
					                    {
					                        xtype: 'gridcolumn',
					                        dataIndex: 'V_CATEGORY_VIEW',
					                        text: '统计分类'
					                    }
					                ],
					                viewConfig: {
					
					                },
		                            dockedItems: [
		                                {
						                    xtype: 'pagingtoolbar',
						                    displayInfo: true,
						                    store: me.statStore,
						                    dock: 'bottom'
						                },
		                                {
		                                    xtype: 'toolbar',
		                                    dock: 'top',
		                                    items: [
		                                        {
		                                            xtype: 'button',
		                                            iconCls: 'printer_btn',
		                                            text: '打印'
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
		                                }
		                            ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'fit'
                            },
                            title: '统计图表',
                            items: [
	                            {
	                            	xtype: 'chart',
	                            	store: me.statStore,
	                            	animate: true,
								    insetPadding: 20,
								    legend: {
								        position: 'bottom'
								    },
	                            	axes: [
	                            	    
	                            	],
	                            	series: [
	                            	    
	                            	]
	                            }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'splitbutton',
                                            //enableToggle: true,
                                            iconCls: 'stat_btn',
                                            text: '图表类型',
                                            menu: {
                                                xtype: 'menu',
                                                width: 120,
                                                items: [
                                                    {
                                                        xtype: 'menuitem',
                                                        iconCls: 'line_btn',
                                                        text: '折线图'
                                                    },
                                                    {
                                                        xtype: 'menuitem',
                                                        iconCls: 'col_btn',
                                                        text: '柱状图'
                                                    },
                                                    {
                                                        xtype: 'menuitem',
                                                        iconCls: 'bar_btn',
                                                        text: '条状图'
                                                    },
                                                    {
                                                        xtype: 'menuitem',
                                                        iconCls: 'pie_btn',
                                                        text: '饼状图'
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'tbseparator'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'printer_btn',
                                            text: '打印'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});