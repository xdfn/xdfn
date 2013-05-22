/**
 * File: app/project/ProjProduct.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ProjProduct', {
    extend: 'xdfn.project.ui.ProjProduct',

    grid: null,
    
    initComponent: function() {
        var me = this;
        
        me.prodStore = Ext.create('xdfn.project.store.ProductionJsonStore');
        
        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        	errorSummary: false
        });
        
        me.callParent(arguments);
        
        me.down('button[text="增加产品"]').on('click', me.OnAddProductionBtnClick, me);
        me.down('button[text="删除产品"]').on('click', me.OnDeleteProductionBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportProductionBtnClick, me);
        me.rowEditing.on('edit', me.OnGridEdit, me);
        me.rowEditing.on('beforeedit', me.OnGridBeforeEdit, me);
    },
    
    OnGridBeforeEdit: function(editor, e, eOpts) {
    	xdfn.user.Rights.noRights('XMGL-XMZL-27', function() {
    		editor.cancelEdit();
    	});
    },
    
    OnGridEdit: function(editor, e, eOpts) {
    	var me = this;
    	
    	if (!e.record.dirty) return;
    	
    	var url = './proExec.do?method=modifyZbjx';
    	if (Ext.isEmpty(e.record.get('ID_VIEW'))) {
			var rows = me.grid.getSelectionModel().getSelection();
			e.record.set('ID_VIEW', rows[0].get('ID_VIEW'));
			url = './proExec.do?method=addProZbjx';
		}
		e.record.commit();
		
    	Ext.Ajax.request({
    	    url: url,
    	    method: 'post',
    	    params: {
    		    ID: e.record.get('ID_VIEW'),
    		    V_JX: e.record.get('V_JX_VIEW'),
                N_DJRL: e.record.get('N_DJRL_VIEW'),
                N_NUM: e.record.get('N_NUM_VIEW'),
                N_PRICE: e.record.get('N_PRICE_VIEW'),
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
    
    OnAddProductionBtnClick: function(self, e, options) {
    	var me = this,
    	    sm = me.grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-26', function() {
	    	if (rows.length > 0) {
	    		me.rowEditing.cancelEdit();
	    		me.prodStore.insert(0, {});
	    		me.rowEditing.startEdit(0, 0);
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的项目！');
	    	}
    	});
    },
    
    OnDeleteProductionBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-28', function() {
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
	    		Ext.MessageBox.confirm('提示', '确定删除该产品吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除产品
	            		Ext.Ajax.request({
				    	    url: './proExec.do?method=deleteZbjx', //改为实际的删除请求url
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
	    		Ext.Msg.alert('提示','请选择要删除的产品！');
	    	}
    	});
    },
    
    OnExportProductionBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-XMZL-29', function() {
    		me.prodStore.load({
       	    	limit: me.prodStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '项目中标机型'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});