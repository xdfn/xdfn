/**
 * File: app/project/ProjMoneyPlan.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ProjMoneyPlan', {
    extend: 'xdfn.project.ui.ProjMoneyPlan',

    grid: null,
    
    detailTab: null,
    
    detailStore: null,
    
    initComponent: function() {
        var me = this;
        
        me.planStore = Ext.create('xdfn.project.store.ProjMoneyPlanJsonStore');
        
        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        	errorSummary: false
        });
        
        me.callParent(arguments);
        
        me.down('button[text="增加计划"]').on('click', me.OnAddMoneyPlanBtnClick, me);
        me.down('button[text="删除计划"]').on('click', me.OnDeleteMoneyPlanBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportMoneyPlanBtnClick, me);
        me.rowEditing.on('edit', me.OnGridEdit, me);
        me.rowEditing.on('beforeedit', me.OnGridBeforeEdit, me);
        //me.down('gridpanel').on('select', me.OnPlanGridSelect, me);
        me.down('pagingtoolbar').on('change', me.OnPagingToolBarChange, me);
    },
    
    OnGridBeforeEdit: function(editor, e, epts) {
    	xdfn.user.Rights.noRights('XMGL-HKGL-6', function() {
    		editor.cancelEdit();
    	});
    },
    
    OnPagingToolBarChange: function(self, pageData, eOpts) {
    	var me = this,
    	    sm = me.grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	if (rows.length > 0) {
    		me.detailStore.clearFilter();
		    me.detailStore.filter('V_NAME_VIEW', rows[0].get('V_NAME_VIEW'));
		    me.detailStore.group('V_NAME_VIEW');
    	} else {
    		me.detailStore.clearFilter();
    		me.detailStore.group('V_NAME_VIEW');
    	}
    	
    	me.planStore.group('V_NAME_VIEW');
    },
    
    OnGridEdit: function(editor, e) {
    	var me = this;
    	
    	if (!e.record.dirty) return;
    	
    	var url = './projectMgr.do?method=modifyHkjh';
    	if (Ext.isEmpty(e.record.get('ID_VIEW'))) {
			var rows = me.grid.getSelectionModel().getSelection();
			e.record.set('ID_VIEW', rows[0].get('ID_VIEW'));
			url = './projectMgr.do?method=addHkjh';
		}
		e.record.commit();
		
    	Ext.Ajax.request({
    	    url: url,
    	    method: 'post',
    	    params: {
    		    ID: e.record.get('ID_VIEW'),
                N_FHTS: e.record.get('N_FHTS_VIEW'),
                N_YSZK: e.record.get('N_YSZK_VIEW'),
                D_HKRQ: Ext.util.Format.date(e.record.get('D_HKRQ_VIEW'), 'Y-m-d'),
                V_HKZRR: e.record.get('V_HKZRR_VIEW'),
                V_REM: e.record.get('V_REM_VIEW')
    	    },
    	    success: function(response, opts) {
    	    	var result = Ext.JSON.decode(response.responseText);
    	    	e.record.set(result.data);
    	    	e.record.commit();
    	    	me.planStore.group('V_NAME_VIEW');
			},
			failure: function(response, opts) {
				Ext.Msg.alert('提示','提交失败！');
			}
    	});
    },
    
    OnAddMoneyPlanBtnClick: function(self, e, options) {
    	var me = this,
    	    rows = me.grid.getSelectionModel().getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-HKGL-5', function() {
	    	if (rows.length > 0) {
	    		me.rowEditing.cancelEdit();
	    		me.planStore.clearGrouping();
	    		me.planStore.insert(0, {});
	    		me.planStore.getAt(0).set('V_NAME_VIEW', rows[0].get('V_NAME_VIEW'));
	    		me.rowEditing.startEdit(0, 0);
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的指标！');
	    	}
    	});
    },
    
    OnDeleteMoneyPlanBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-HKGL-7', function() {    
	    	if (rows.length > 0) {
	    		if (Ext.isEmpty(rows[0].get('ID_VIEW'))) {
	    			me.rowEditing.cancelEdit();
	    			var i = store.indexOf(rows[0]);
				    	    	    
	    	    	store.remove(rows);
	    	    	
	    	    	var count = store.getCount();
	    	    	
	    	    	if (count > 0) {
	    	    		sm.select((i == count)? --i : i);
	    	    	}
	    			return;
	    		}
	    		Ext.MessageBox.confirm('提示', '确定删除该回款计划吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除回款计划
	            		Ext.Ajax.request({
				    	    url: './projectMgr.do?method=deleteHkjh',
				    	    method: 'get',
				    	    params: {
				    	    	ID: rows[0].get('ID_VIEW')
				    	    },
				    	    success: function(response, opts) {
				    	    	me.rowEditing.cancelEdit();
				    	    	var i = store.indexOf(rows[0]);
				    	    	    
				    	    	store.remove(rows);
				    	    	
				    	    	var count = store.getCount();
				    	    	
				    	    	if (count > 0) {
				    	    		sm.select((i == count)? --i : i);
				    	    	}
							},
							failure: function(response, opts) {
								Ext.Msg.alert('提示','删除失败！');
							}
				    	});
	                }
	            });
	    	} else {
	    		Ext.Msg.alert('提示','请选择要删除的回款计划！');
	    	}
    	});
    },
    
    OnPlanGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
    	me.up('tabpanel').setActiveTab(me.detailTab);
    	
	    me.detailStore.clearFilter();
	    me.detailStore.filter([
	        {property: "V_PLAN_ID_VIEW", value: record.get('ID_VIEW')},
	        {property: "V_NAME_VIEW", value: record.get('V_NAME_VIEW')}
	    ]);
	    me.detailStore.group('V_NAME_VIEW');
    },
    
    OnExportMoneyPlanBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-HKGL-8', function() {
    		me.planStore.load({
       	    	limit: me.planStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '项目回款计划'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});