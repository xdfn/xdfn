/**
 * File: app/project/ProjOpen.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ProjOpen', {
    extend: 'xdfn.project.ui.ProjOpen',

    grid: null,
    
    initComponent: function() {
        var me = this;
        
        me.openStore = Ext.create('xdfn.project.store.ProjOpenJsonStore');
        
        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        	errorSummary: false
        });
        
        me.callParent(arguments);
        
        me.down('button[text="增加记录"]').on('click', me.OnAddProjOpenBtnClick, me);
        me.down('button[text="删除记录"]').on('click', me.OnDeleteProjOpenBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportProjOpenBtnClick, me);
        me.rowEditing.on('edit', me.OnGridEdit, me);
        me.rowEditing.on('beforeedit', me.OnGridBeforeEdit, me);
    },
    
    OnGridBeforeEdit: function(editor, e, epts) {
    	xdfn.user.Rights.noRights('XMGL-XMZL-31', function() {
    		editor.cancelEdit();
    	});
    },
    
    OnGridEdit: function(editor, e) {
    	var me = this;
    	
    	if (!e.record.dirty) return;
    	
    	var url = './proExec.do?method=modifyKbjl';
    	if (Ext.isEmpty(e.record.get('ID_VIEW'))) {
			var rows = me.grid.getSelectionModel().getSelection();
			e.record.set('ID_VIEW', rows[0].get('ID_VIEW'));
			url = './proExec.do?method=addProKbjl';
		}
		e.record.commit();
		
    	Ext.Ajax.request({
    	    url: url,
    	    method: 'post',
    	    params: {
    		    ID: e.record.get('ID_VIEW'),
    		    V_MANU: e.record.get('V_MANU_VIEW'),
                V_MACHINE: e.record.get('V_MACHINE_VIEW'),
                N_CAP: e.record.get('N_CAP_VIEW'),
                N_SUM_NUM: e.record.get('N_SUM_NUM_VIEW'),
                N_SUM_MONEY: e.record.get('N_SUM_MONEY_VIEW'),
                V_MEMO: e.record.get('V_MEMO_VIEW')
    	    },
    	    success: function(response, opts) {
    	    	var result = Ext.JSON.decode(response.responseText); //服务端返回新建ID
    	    	e.record.set(result.data);
    	    	e.record.commit();
			},
			failure: function(response, opts) {
				Ext.Msg.alert('提示','提交失败！');
			}
    	});
    },
    
    OnAddProjOpenBtnClick: function(self, e, options) {
    	var me = this,
    	    sm = me.grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-30', function() {
	    	if (rows.length > 0) {
	    		me.rowEditing.cancelEdit();
	    		me.openStore.insert(0, {});
	    		me.rowEditing.startEdit(0, 0);
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的项目！');
	    	}
    	});
    },
    
    OnDeleteProjOpenBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-32', function() {
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
	    		Ext.MessageBox.confirm('提示', '确定删除该记录吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除记录
	            		Ext.Ajax.request({
				    	    url: './proExec.do?method=deleteKbjl', //改为实际的删除请求url
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
	    		Ext.Msg.alert('提示','请选择要删除的记录！');
	    	}
    	});
    },
    
    OnExportProjOpenBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-XMZL-33', function() {
    		me.openStore.load({
       	    	limit: me.openStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '项目开标记录'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});