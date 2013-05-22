/**
 * File: app/project/ProjMoneyDetail.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ProjMoneyDetail', {
    extend: 'xdfn.project.ui.ProjMoneyDetail',
    
    grid: null,
    
    initComponent: function() {
        var me = this;
        
        me.detailStore = Ext.create('xdfn.project.store.ProjMoneyDetailJsonStore');
        
        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        	errorSummary: false
        });
        
        me.callParent(arguments);
        
        me.down('button[text="增加回款"]').on('click', me.OnAddMoneyDetailBtnClick, me);
        me.down('button[text="删除回款"]').on('click', me.OnDeleteMoneyDetailBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportMoneyDetailBtnClick, me);
        me.rowEditing.on('edit', me.OnGridEdit, me);
        me.rowEditing.on('beforeedit', me.OnGridBeforeEdit, me);
        me.down('pagingtoolbar').on('change', me.OnPagingToolBarChange, me);
    },
    
    OnGridBeforeEdit: function(editor, e, epts) {
    	xdfn.user.Rights.noRights('XMGL-HKGL-10', function() {
    		editor.cancelEdit();
    	});
    },
    
    OnPagingToolBarChange: function(self, pageData, eOpts) {
    	var me = this;
    	me.detailStore.group('V_NAME_VIEW');
    },
    
    OnGridEdit: function(editor, e) {
    	var me = this;
    	
    	if (!e.record.dirty) return;
    	
    	var url = './projectMgr.do?method=modifyHkmx';
    	if (Ext.isEmpty(e.record.get('ID_VIEW'))) {
			var rows = me.grid.getSelectionModel().getSelection();
			e.record.set('V_PLAN_ID_VIEW', rows[0].get('ID_VIEW'));
			url = './projectMgr.do?method=addHkmx';
		}
		e.record.commit();
		
    	Ext.Ajax.request({
    	    url: url,
    	    method: 'post',
    	    params: {
    		    V_PLAN_ID: e.record.get('V_PLAN_ID_VIEW'), //计划ID
    		    ID: e.record.get('ID_VIEW'),
                N_FHTS: e.record.get('N_FHTS_VIEW'),
                N_SJHKJE: e.record.get('N_SJHKJE_VIEW'),
                D_SJHKRQ: Ext.util.Format.date(e.record.get('D_SJHKRQ_VIEW'), 'Y-m-d'),
                V_HKR: e.record.get('V_HKR_VIEW'),
                V_REM: e.record.get('V_REM_VIEW')
    	    },
    	    success: function(response, opts) {
    	    	var result = Ext.JSON.decode(response.responseText);
    	    	e.record.set(result.data);
    	    	e.record.commit();
    	    	me.detailStore.group('V_NAME_VIEW');
			},
			failure: function(response, opts) {
				Ext.Msg.alert('提示','提交失败！');
			}
    	});
    },
    
    OnAddMoneyDetailBtnClick: function(self, e, options) {
    	var me = this,
    	    rows = me.grid.getSelectionModel().getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-HKGL-9', function() {
	    	if (rows.length > 0) {
	    		me.rowEditing.cancelEdit();
	    		me.detailStore.clearGrouping();
	    		me.detailStore.insert(0, {});
	    		me.detailStore.getAt(0).set('V_NAME_VIEW', rows[0].get('V_NAME_VIEW'));
	    		me.rowEditing.startEdit(0, 0);
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的计划！');
	    	}
    	});
    },
    
    OnDeleteMoneyDetailBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-HKGL-11', function() {    
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
	    		Ext.MessageBox.confirm('提示', '确定删除该回款吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除回款
	            		Ext.Ajax.request({
				    	    url: './projectMgr.do?method=deleteHkmx',
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
	    		Ext.Msg.alert('提示','请选择要删除的回款！');
	    	}
    	});
    },
    
    OnExportMoneyDetailBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-HKGL-12', function() {
    		me.detailStore.load({
       	    	limit: me.detailStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '项目回款明细'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});