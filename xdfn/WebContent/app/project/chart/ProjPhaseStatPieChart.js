/**
 * File: app/project/chart/ProjPhaseStatPieChart.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.chart.ProjPhaseStatPieChart', {
    extend: 'Ext.chart.Chart',

    animate: true,
    insetPadding: 20,
    legend: {
        position: 'bottom'
    },
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            series: [
                {
                    type: 'pie',
                    showInLegend: true,
                    field: [
                        'N_PRO_STAT1_VIEW'
                    ],
                    donut: 20,
                    label: {
			            field: 'V_CATEGORY_VIEW',
			            display: 'rotate',
			            contrast: true,
			            font: '14px Arial'
			        },
			        highlight: {
			            segment: {
			                margin: 20
			            }
			        },
			        tips: {
			            trackMouse: true,
			            width: 140,
			            height: 28,
			            renderer: function(storeItem, item) {
			            	// calculate and display percentage on hover
			                var total = 0;
			                me.store.each(function(rec) {
			                    total += rec.get('N_PRO_STAT1_VIEW');
			                });
			                this.setTitle(storeItem.get('V_CATEGORY_VIEW') + ': ' + Math.round(storeItem.get('N_PRO_STAT1_VIEW') / total * 100) + '%');
			            }
			        }
                }
            ]
        });

        me.callParent(arguments);
    }
});