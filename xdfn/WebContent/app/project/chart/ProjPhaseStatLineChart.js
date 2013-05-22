/**
 * File: app/project/chart/ProjPhaseStatLineChart.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.chart.ProjPhaseStatLineChart', {
    extend: 'Ext.chart.Chart',

    animate: true,
    autoRender: true,
    insetPadding: 20,
    legend: {
        position: 'bottom'
    },
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            axes: [
                {
                    type: 'Category',
                    fields: [
                        'V_CATEGORY_VIEW'
                    ],
                    position: 'bottom',
                    title: '统计时段'
                },
                {
                    type: 'Numeric',
                    fields: [
                        'N_PRO_STAT1_VIEW',
                        'N_PRO_STAT2_VIEW',
                        'N_PRO_STAT3_VIEW',
                        'N_PRO_STAT4_VIEW',
                        'N_PRO_STAT5_VIEW',
                        'N_PRO_STAT6_VIEW',
                        'N_PRO_STAT7_VIEW',
                        'N_PRO_STAT8_VIEW',
                        'N_PRO_STAT9_VIEW',
                        'N_PRO_STAT10_VIEW',
                        'N_PRO_STAT11_VIEW',
                        'N_PRO_STAT12_VIEW',
                        'N_PRO_STAT13_VIEW'
                    ],
                    minimum: 0,
                    position: 'left',
                    title: '项目数'
                }
            ],
            series: [
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT1_VIEW'
                    ],
                    title: ['项目预报'],
                    showInLegend: true,
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT2_VIEW'
                    ],
                    title: ['项目跟进'],
                    showInLegend: true,
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT3_VIEW'
                    ],
                    title: ['重点项目'],
                    showInLegend: true,
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT4_VIEW'
                    ],
                    title: '项目投标',
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT5_VIEW'
                    ],
                    title: '项目不投标',
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT6_VIEW'
                    ],
                    title: '项目中标',
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT7_VIEW'
                    ],
                    title: '项目失标',
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT8_VIEW'
                    ],
                    title: '合同管理',
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT9_VIEW'
                    ],
                    title: '合同执行',
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT10_VIEW'
                    ],
                    title: '合同废除',
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT11_VIEW'
                    ],
                    title: '过240',
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT12_VIEW'
                    ],
                    title: '质保期',
                    smooth: false
                },
                {
                    type: 'line',
                    highlight: {
		                size: 7,
		                radius: 7
		            },
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
                        'N_PRO_STAT13_VIEW'
                    ],
                    title: '已过质保期',
                    smooth: false
                }
            ]
        });

        me.callParent(arguments);
    }
});