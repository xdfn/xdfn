/**
 * File: app/project/ProjBook.js
 * Author: liusha
 */

Ext.define('xdfn.project.ProjBook', {
    extend: 'xdfn.project.ui.ProjBook',

    grid: null,
        
    initComponent: function() {
        var me = this;
        
        me.bookStore = Ext.create('xdfn.project.store.ProjBookJsonStore');
        
        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        	errorSummary: false
        });
        
        me.callParent(arguments);
        
        me.down('button[text="增加标书"]').on('click', me.OnAddProjBookBtnClick, me);
        me.down('button[text="删除标书"]').on('click', me.OnDeleteProjBookBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportBookBtnClick, me);
        me.rowEditing.on('edit', me.OnGridEdit, me);
        me.rowEditing.on('beforeedit', me.OnGridBeforeEdit, me);
    },
    
    OnGridBeforeEdit: function(editor, e, epts) {
    	xdfn.user.Rights.noRights('XMGL-XMZL-23', function() {
    		editor.cancelEdit();
    	});
    },
    
    OnGridEdit: function(editor, e) {
    	var me = this;
    	
    	if (!e.record.dirty) return;
    	
    	var url = './proExec.do?method=modifyBidbook';
    	if (Ext.isEmpty(e.record.get('ID_VIEW'))) {
    		var rows = me.grid.getSelectionModel().getSelection();
			e.record.set('ID_VIEW', rows[0].get('ID_VIEW'));
			url = './proExec.do?method=addBidbook';
		}
		
    	e.record.commit();
    	
    	Ext.Ajax.request({
    	    url: url,
    	    method: 'post',
    	    params: {
    		    ID: e.record.get('ID_VIEW'),
    		    V_BID_CODE: e.record.get('V_BID_CODE_VIEW'),
                V_BID_ADDR: e.record.get('V_BID_ADDR_VIEW'),
                V_BID_STATE: e.record.get('V_BID_STATE_VIEW'),
                D_BID_DEATH_DATE: Ext.util.Format.date(e.record.get('D_BID_DEATH_DATE_VIEW'), 'Y-m-d'),
                D_BID_OPEN_DATE: Ext.util.Format.date(e.record.get('D_BID_OPEN_DATE_VIEW'), 'Y-m-d'),
                V_DELEGATE: e.record.get('V_DELEGATE_VIEW'),
                V_TENDERS: e.record.get('V_TENDERS_VIEW'),
                V_AUDI: e.record.get('V_AUDI_VIEW')
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
    
    OnAddProjBookBtnClick: function(self, e, options) {
    	var me = this,
    	    sm = me.grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-22', function() {
	    	if (rows.length > 0) {
	    		me.rowEditing.cancelEdit();
	    		me.bookStore.insert(0, {});
	    		me.rowEditing.startEdit(0, 0);
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的项目！');
	    	}
    	});
    },
    
    OnDeleteProjBookBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-24', function() {
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
	    		Ext.MessageBox.confirm('提示', '确定删除该标书吗？', function(id) {
	            	if (id == 'yes') {
		    			Ext.Ajax.request({
				    	    url: './proExec.do?method=deleteBidbook',
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
	    		Ext.Msg.alert('提示','请选择要删除的标书！');
	    	}
    	});
    },
       
    OnExportBookBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-XMZL-25', function() {
    		me.bookStore.load({
       	    	limit: me.bookStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '项目标书'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});