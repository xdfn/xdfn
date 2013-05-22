/**
 * File: app/project/Contract.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.Contract', {
    extend: 'xdfn.project.ui.Contract',

    initComponent: function() {
        var me = this;

        me.conStore = Ext.create('xdfn.project.store.ContractJsonStore');  	
        me.prodStore = Ext.create('xdfn.project.store.ProductionJsonStore', {
    		proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=getConCqjbjList',
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
        
        me.down('button[text="增加合同"]').on('click', me.OnAddContractBtnClick, me);
        me.down('button[text="修改合同"]').on('click', me.OnModifyContractBtnClick, me);
        me.down('button[text="删除合同"]').on('click', me.OnDeleteContractBtnClick, me);
        me.down('button[text="增加产品"]').on('click', me.OnAddProductionBtnClick, me);
        me.down('button[text="产品明细"]').on('click', me.OnDetailProductionBtnClick, me);
        me.down('button[text="删除产品"]').on('click', me.OnDeleteProductionBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportContractBtnClick, me);
        me.down('button[text="导出产品"]').on('click', me.OnExportProductionBtnClick, me);
        me.down('gridpanel').on('select', me.OnContractGridSelect, me);
        me.down('gridpanel').on('itemdblclick', me.OnContractGridItemDbClick, me);
        me.rowEditing.on('edit', me.OnGridEdit, me);
        me.rowEditing.on('beforeedit', me.OnGridBeforeEdit, me);
        me.conStore.on('load', me.OnContractStoreLoad, me);
    },
    
    OnGridBeforeEdit: function(editor, e, eOpts) {
    	var me = this;
    	xdfn.user.Rights.noRights('XMGL-HTGL-7', function() {
    		me.rowEditing.cancelEdit();
    	});
    },
    
    OnContractStoreLoad: function(store, records, successful, eOpts) {
    	var me = this;
    	
		Ext.apply(me.prodStore.getProxy(), {
    	    extraParams:{}
    	});
    	me.prodStore.loadRawData([]);
    },
    
    OnAddContractBtnClick: function(self, e, options) {
    	var me = this;
    	xdfn.user.Rights.hasRights('XMGL-HTGL-2', function() {
			Ext.create('xdfn.project.ContractWindow', {
	    		url: './projectMgr.do?method=addContract',
	    	    grid: self.up('gridpanel')
	    	}).show();
    	});
    },
    
    OnContractGridItemDbClick: function (view, record, item, index, e, eOpts) {
    	var me = this;
    	
		var wForm = Ext.create('xdfn.project.ContractWindow', {
	        title: '查看合同',
	        enableSubmit: false
	    });
	    wForm.down('form').getForm().load({
            url: './projectMgr.do?method=findContractById',
            params: {
            	ID: record.get('ID_VIEW')
            },
            method: 'get',
            success: function(form, action) {
        	    wForm.show();
            },
            failure: function(form, action) {
        	    wForm.destroy();
        	    Ext.Msg.alert('提示','无法查看！');
            }
        });
    },
    
    OnModifyContractBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-HTGL-3', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.project.ContractWindow', {
	    	        title: '修改合同',
	    	        url: './projectMgr.do?method=modifyContract',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './projectMgr.do?method=findContractById',
	                params: {
	                	ID: rows[0].get('ID_VIEW')
	                },
	                method: 'get',
	                success: function(form, action) {
	            	    wForm.show();
	                },
	                failure: function(form, action) {
	            	    wForm.destroy();
	            	    Ext.Msg.alert('提示','无法修改！');
	                }
	            });
	    	} else {
	    		Ext.Msg.alert('提示','请选择要修改的合同！');
	    	}
    	});
    },
    
    OnDeleteContractBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-HTGL-4', function() {
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该合同吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除合同
		    			Ext.Ajax.request({
				    	    url: './projectMgr.do?method=deleteContract',
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
				    	    	} else {
				    	    		store.fireEvent('load', store);
				    	    	}
							},
							failure: function(response, opts) {
								Ext.Msg.alert('提示','删除失败！');
							}
				    	});
	                }
	            });
	    	} else {
	    		Ext.Msg.alert('提示','请选择要删除的合同！');
	    	}
    	});
    },
    
    OnGridEdit: function(editor, e, eOpts) {
    	var me = this;
    	
    	if (!e.record.dirty) return;
    	
    	var url = './projectMgr.do?method=modifyConCqjbj';
    	if (Ext.isEmpty(e.record.get('ID_VIEW'))) {
			e.record.set('ID_VIEW', me.ID);
			url = './projectMgr.do?method=addConCqjbj';
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
    	    grid = me.down('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-HTGL-6', function() {    
	    	if (rows.length > 0) {
	    		me.rowEditing.cancelEdit();
	    		me.prodStore.insert(0, {});
	    		me.rowEditing.startEdit(0, 0);
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的合同！');
	    	}
    	});
    },
    
    OnDeleteProductionBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-HTGL-8', function() {    
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
				    	    url: './projectMgr.do?method=deleteConCqjbj',
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
    
    OnDetailProductionBtnClick:  function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	if (rows.length > 0) {
    		Ext.create('xdfn.project.ProductDetailWindow', {
	    		ID: rows[0].get('ID_VIEW')
	    	}).show();
    	} else {
    		Ext.Msg.alert('提示','请先选择相应的产品！');
    	}
		
    },
    
    OnContractGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
    	me.ID = record.get('ID_VIEW');
    	Ext.apply(me.prodStore.getProxy(), {
    	    extraParams:{
    	        ID: me.ID
    	    }
    	});
    	me.prodStore.loadPage(1);
    },
    
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	Ext.apply(me.conStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.conStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {
    	self.up('form').getForm().reset();
    },
    
    OnExportContractBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-HTGL-5', function() {
    		me.conStore.load({
       	    	limit: me.conStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '合同信息表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    },
    
    OnExportProductionBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-HTGL-5', function() {
    		me.prodStore.load({
       	    	limit: me.prodStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '合同产品信息表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});