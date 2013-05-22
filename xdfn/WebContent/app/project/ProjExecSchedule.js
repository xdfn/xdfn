/**
 * File: app/project/ProjExecSchedule.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ProjExecSchedule', {
    extend: 'xdfn.project.ui.ProjExecSchedule',

    grid: null,
    
    initComponent: function() {
        var me = this;
        
        me.schStore = Ext.create('xdfn.project.store.ProjExecListJsonStore', {
            proxy: {
                type: 'ajax',
                url: './proExec.do?method=getExecScheList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });
        
        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        	errorSummary: false
        });
        
        me.callParent(arguments);
        
        me.down('button[text="增加记录"]').on('click', me.OnAddScheduleBtnClick, me);
        me.down('button[text="删除记录"]').on('click', me.OnDeleteScheduleBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportScheduleBtnClick, me);
        me.rowEditing.on('edit', me.OnGridEdit, me);
        me.rowEditing.on('beforeedit', me.OnGridBeforeEdit, me);
    },
    
    OnGridBeforeEdit: function(editor, e, epts) {
    	xdfn.user.Rights.noRights('XMGL-ZXGL-7', function() {
    		editor.cancelEdit();
    	});
    },
    
    OnGridEdit: function(editor, e) {
    	var me = this;
    	
    	if (!e.record.dirty) return;
    	
    	var url = './proExec.do?method=modifyExecSche';
    	if (Ext.isEmpty(e.record.get('ID_VIEW'))) {
			var rows = me.grid.getSelectionModel().getSelection();
			e.record.set('ID_VIEW', rows[0].get('ID_VIEW'));
			url = './proExec.do?method=addExecSche';
		}
		e.record.commit();
		
    	Ext.Ajax.request({
    	    url: url,
    	    method: 'post',
    	    params: {
    		    ID: e.record.get('ID_VIEW'),
                V_JX_NAME: e.record.get('V_JX_NAME_VIEW'),
                N_S_SUM: e.record.get('N_S_SUM_VIEW'),
                N_F_SUM: e.record.get('N_F_SUM_VIEW'),
                D_DISP_DATE: Ext.util.Format.date(e.record.get('D_DISP_DATE_VIEW'), 'Y-m-d'),
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
    
    OnAddScheduleBtnClick: function(self, e, options) {
    	var me = this,
    	    rows = me.grid.getSelectionModel().getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-ZXGL-6', function() {
	    	if (rows.length > 0) {
	    		me.rowEditing.cancelEdit();
	    		me.schStore.insert(0, {});
	    		me.rowEditing.startEdit(0, 0);
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的合同！');
	    	}
    	});
    },
    
    OnDeleteScheduleBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-ZXGL-8', function() {    
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
	    		Ext.MessageBox.confirm('提示', '确定删除该排产记录吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除排产记录
	            		Ext.Ajax.request({
				    	    url: './proExec.do?method=delExecSche', //改为实际的删除请求url
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
	    		Ext.Msg.alert('提示','请选择要删除的排产记录！');
	    	}
    	});
    },
    
    OnExportScheduleBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-ZXGL-9', function() {
    		me.schStore.load({
       	    	limit: me.schStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '排产记录表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});