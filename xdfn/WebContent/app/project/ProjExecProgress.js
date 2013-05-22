/**
 * File: app/project/ProjExecProgress.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ProjExecProgress', {
    extend: 'xdfn.project.ui.ProjExecProgress',

    grid: null,
    
    initComponent: function() {
        var me = this;
        
        me.progressStore = Ext.create('xdfn.project.store.ProjExecProgressJsonStore');
        
        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        	errorSummary: false
        });
        
        me.callParent(arguments);
        
        me.down('button[text="增加记录"]').on('click', me.OnAddProgressBtnClick, me);
        me.down('button[text="删除记录"]').on('click', me.OnDeleteProgressBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportProgressBtnClick, me);
        me.rowEditing.on('edit', me.OnGridEdit, me);
        me.rowEditing.on('beforeedit', me.OnGridBeforeEdit, me);
    },
    
    OnGridBeforeEdit: function(editor, e, epts) {
    	xdfn.user.Rights.noRights('XMGL-ZXGL-11', function() {
    		editor.cancelEdit();
    	});
    },
    
    OnGridEdit: function(editor, e) {
    	var me = this;
    	
    	if (!e.record.dirty) return;
    	
    	var url = './proExec.do?method=modifyExecAzjd';
    	if (Ext.isEmpty(e.record.get('ID_VIEW'))) {
			var rows = me.grid.getSelectionModel().getSelection();
			e.record.set('ID_VIEW', rows[0].get('ID_VIEW'));
			url = './proExec.do?method=addExecAzjd';
		}
		e.record.commit();
		
    	Ext.Ajax.request({
    	    url: url,
    	    method: 'post',
    	    params: {
    		    ID: e.record.get('ID_VIEW'),
                V_JX_NAME: e.record.get('V_JX_NAME_VIEW'),
                N_DHTS: e.record.get('N_DHTS_VIEW'),
                N_AZTS: e.record.get('N_AZTS_VIEW'),
                N_SYXTS: e.record.get('N_SYXTS_VIEW'),
                N_GQTS: e.record.get('N_GQTS_VIEW'),
                V_REM: e.record.get('V_REM_VIEW')
    	    },
    	    success: function(response, opts) {
    	    	var result = Ext.JSON.decode(response.responseText);
    	    	e.record.set(result.data);
    	    	e.record.commit();
			},
			failure: function(response, opts) {
				Ext.Msg.alert('提示','提交失败！');
			}
    	});
    },
    
    OnAddProgressBtnClick: function(self, e, options) {
    	var me = this,
    	    rows = me.grid.getSelectionModel().getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-ZXGL-10', function() {
	    	if (rows.length > 0) {
	    		me.rowEditing.cancelEdit();
	    		me.progressStore.insert(0, {});
	    		me.rowEditing.startEdit(0, 0);
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的合同！');
	    	}
    	});
    },
    
    OnDeleteProgressBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-ZXGL-12', function() {    
	    	if (rows.length > 0) {
	    		if (Ext.isEmpty(rows[0].get('ID_VIEW'))) {
	    			var i = store.indexOf(rows[0]);
				    	    	    
	    	    	store.remove(rows);
	    	    	
	    	    	var count = store.getCount();
	    	    	
	    	    	if (count > 0) {
	    	    		sm.select((i == count)? --i : i);
	    	    	}
	    			return;
	    		}
	    		Ext.MessageBox.confirm('提示', '确定删除该进度记录吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除进度记录
	            		Ext.Ajax.request({
				    	    url: './proExec.do?method=delExecAzjd', //改为实际的删除请求url
				    	    method: 'get',
				    	    params: {
				    	    	ID: rows[0].get('ID_VIEW')
				    	    },
				    	    success: function(response, opts) {
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
	    		Ext.Msg.alert('提示','请选择要删除的进度记录！');
	    	}
    	});
    },
    
    OnExportProgressBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-ZXGL-13', function() {
    		me.progressStore.load({
       	    	limit: me.progressStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '风机安装进度表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});