/**
 * File: app/project/chart/ProjPhaseStatBarChart.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.chart.ProjPhaseStatBarChart', {
    extend: 'Ext.chart.Chart',

    animate: true,
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
                    position: 'left',
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
                    position: 'bottom',
                    minimum: 0,
                    title: '项目数'
                }
            ],
            series: [
                {
                    type: 'bar',
                    axis: 'left',
                    xField: 'V_CATEGORY_VIEW',
                    yField: [
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
                    title: ['项目预报','项目跟进','重点项目','项目投标','项目不投标','项目中标','项目失标','合同管理','合同执行','合同废除','过240','质保期','已过质保期'],
                    label: {
                    	field: [
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
                    	display: 'outside'
                    	
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});