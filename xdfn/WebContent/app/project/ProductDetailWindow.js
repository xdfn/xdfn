/**
 * File: app/project/ProductDetailWindow.js
 * Author: liusha
 */
Ext.define('xdfn.project.ProductDetailWindow', {
    extend: 'xdfn.project.ui.ProductDetailWindow',

    ID: null,
    
    url: null,
    
    initComponent: function() {
        var me = this;
        
        me.detailStore = Ext.create('xdfn.project.store.ProductDetailJsonStore', {
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=getProDetailList&ID=' + me.ID,
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
        
        me.down('button[text="增加"]').on('click', me.OnAddProductDetailBtnClick, me);
        me.down('button[text="删除"]').on('click', me.OnDeleteProductDetailBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportProductDetailBtnClick, me);
        me.rowEditing.on('edit', me.OnGridEdit, me);
        me.rowEditing.on('beforeedit', me.OnGridBeforeEdit, me);
    },
    
    OnGridBeforeEdit: function(e, epts) {
    	var me = this;
    	xdfn.user.Rights.noRights('XMGL-HTGL-10', function() {
    		me.rowEditing.cancelEdit();
    	});
    },
    
    OnGridEdit: function(editor, e) {
    	var me = this;
    	
    	if (!e.record.dirty) return;
    	
    	var url = './projectMgr.do?method=modifyProDetail';
    	if (Ext.isEmpty(e.record.get('ID_VIEW'))) {
			e.record.set('ID_VIEW', me.ID);
			url = './projectMgr.do?method=addProDetail';
		}
		
    	e.record.commit();
    	
    	Ext.Ajax.request({
    	    url: url,
    	    method: 'post',
    	    params: {
    		    ID: e.record.get('ID_VIEW'),
    		    V_PARTS_TYPE: e.record.get('V_PARTS_TYPE_VIEW'),
                V_PARTS_NAME: e.record.get('V_PARTS_NAME_VIEW'),
                V_PARTS_MODEL: e.record.get('V_PARTS_MODEL_VIEW'),
                V_PARTS_UNIT: e.record.get('V_PARTS_UNIT_VIEW'),
                V_PARTS_NUM: e.record.get('V_PARTS_NUM_VIEW'),
                V_PARTS_PRICE: e.record.get('V_PARTS_PRICE_VIEW'),
                V_VENDER1: e.record.get('V_VENDER1_VIEW'),
                V_VENDER2: e.record.get('V_VENDER2_VIEW'),
                V_VENDER3: e.record.get('V_VENDER3_VIEW'),
                V_VENDER4: e.record.get('V_VENDER4_VIEW'),
                V_VENDER5: e.record.get('V_VENDER5_VIEW')
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
    
    OnAddProductDetailBtnClick: function(self, e, options) {
    	var me = this;
    	
    	xdfn.user.Rights.hasRights('XMGL-HTGL-9', function() {
			me.rowEditing.cancelEdit();
			me.detailStore.insert(0, {});
			me.rowEditing.startEdit(0, 0);
    	});
    },
    
    OnDeleteProductDetailBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-HTGL-11', function() {    
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
	    		Ext.MessageBox.confirm('提示', '确定删除该产品明细吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除产品明细
	            		Ext.Ajax.request({
				    	    url: './projectMgr.do?method=deleteProDetail', //改为实际的删除请求url
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
	    		Ext.Msg.alert('提示','请选择要删除的产品明细！');
	    	}
    	});
    },
    
    OnExportProductDetailBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-HTGL-12', function() {
    		me.detailStore.load({
       	    	limit: me.detailStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '合同产品明细表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});