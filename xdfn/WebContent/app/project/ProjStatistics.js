/**
 * File: app/project/ProjStatistics.js
 * Author: liusha
 */

Ext.define('xdfn.project.ProjStatistics', {
    extend: 'xdfn.project.ui.ProjStatistics',

    initComponent: function() {
        var me = this;
        
        me.statStore = Ext.create('xdfn.project.store.ProjStatJsonStore');
        me.pieStore = Ext.create('xdfn.project.store.ProjStatJsonStore');
        me.pieStore.getProxy().setReader({
            type: 'json',
            root: 'pie'
        });
        
        me.callParent(arguments);
        
        me.gridPanel = me.down('panel[title="统计列表"]');
        me.chartPanel = me.down('panel[title="统计图表"]');
        me.chartPanel.add(Ext.create('xdfn.project.chart.ProjPhaseStatLineChart', {
            store: me.statStore
        }));
        
        me.down('button[text="统计"]').on('click', me.OnStatBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportStatBtnClick, me);
        me.down('menuitem[text="折线图"]').on('click', me.OnLineChartBtnClick, me);
        me.down('menuitem[text="柱状图"]').on('click', me.OnColumnChartBtnClick, me);
        me.down('menuitem[text="条状图"]').on('click', me.OnBarChartBtnClick, me);
        me.down('menuitem[text="饼状图"]').on('click', me.OnPieChartBtnClick, me);
        
    },
    
    OnStatBtnClick: function(self, e, options) {
    	var me = this;
    	
    	//判断权限
    	xdfn.user.Rights.hasRights('100002011', function() {
    		var form = self.up('form').getForm();
	    	if (!form.isValid()) return;
	    	form.submit({
	    	    waitMsg : '正在统计...',
				waitTitle : '提示',
	    	    url: './app/data/grid_proj_stat.json',
	    	    success : function(form, action) {
	    	    	me.down('tabpanel').setActiveTab(me.chartPanel);
	    	    	me.statStore.loadData(action.result.data);
	    	    	me.pieStore.loadData(action.result.pie);
	    	    	switch (form.findField('V_PRO_STAT_OPTS').getChecked()[0].getGroupValue()) {
	    	    		case '1':
	    	    		    me.gridPanel.removeAll();
					    	me.gridPanel.add(Ext.create('xdfn.project.grid.ProjStatTypeGrid', {
					            store: me.statStore
					        }));
	    	    		    break;
	    	    		case '2':
	    	    		    break;
	    	    		case '3':
	    	    		    break;
	    	    		case '4':
	    	    		    me.gridPanel.removeAll();
					    	me.gridPanel.add(Ext.create('xdfn.project.grid.ProjStatPhaseGrid', {
					            store: me.statStore
					        }));
	    	    		    break;
	    	    	};
				},
				failure : function(form, action) {
					me.statStore.loadData([]);
				}
	    	});
	    	Ext.apply(me.statStore.getProxy(), {
	    	     extraParams: form.getValues()
	    	});
    	});
    },
    
    OnResetBtnClick: function(self, e, options) {
    	self.up('form').getForm().reset();
    },
    
    OnLineChartBtnClick: function(self, e, options) {
    	var me = this;
    	    
    	me.chartPanel.removeAll();
    	me.chartPanel.add(Ext.create('xdfn.project.chart.ProjPhaseStatLineChart', {
            store: me.statStore
        }));
    },
    
    OnColumnChartBtnClick: function(self, e, options) {
    	var me = this;
    	    
    	me.chartPanel.removeAll();
    	me.chartPanel.add(Ext.create('xdfn.project.chart.ProjPhaseStatColumnChart', {
            store: me.statStore
        }));
    },
    
    OnBarChartBtnClick: function(self, e, options) {
    	var me = this;
    	    
    	me.chartPanel.removeAll();
    	me.chartPanel.add(Ext.create('xdfn.project.chart.ProjPhaseStatBarChart', {
            store: me.statStore
        }));
    },
    
    OnPieChartBtnClick: function(self, e, options) {
    	var me = this;
    	
    	me.chartPanel.removeAll();
    	me.chartPanel.add(Ext.create('xdfn.project.chart.ProjPhaseStatPieChart', {
            store: me.pieStore
        }));
    },
    
    OnExportStatBtnClick: function(self, e, options) {
    	//导出为excel文件
    	Ext.Msg.alert('提示','导出为excel文件！');
    }
});