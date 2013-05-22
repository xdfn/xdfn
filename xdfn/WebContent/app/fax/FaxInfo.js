/**
 * File: app/fax/FaxInfo.js
 * Author: liusha
 */
 
Ext.define('xdfn.fax.FaxInfo', {
    extend: 'xdfn.fax.ui.FaxInfo',

    initComponent: function() {
        var me = this;
        
        me.faxStore = Ext.create('xdfn.fax.store.FaxInfoJsonStore');
        me.fileStore = Ext.create('xdfn.fax.store.FaxFileJsonStore');
        
        me.callParent(arguments);
        
        me.down('button[text="增加传真"]').on('click', me.OnAddFaxBtnClick, me);
        me.down('button[text="修改传真"]').on('click', me.OnModifyFaxBtnClick, me);
        me.down('button[text="删除传真"]').on('click', me.OnDeleteFaxBtnClick, me);
        me.down('button[text="增加附件"]').on('click', me.OnAddFaxFileBtnClick, me);
        me.down('button[text="修改附件"]').on('click', me.OnModifyFaxFileBtnClick, me);
        me.down('button[text="删除附件"]').on('click', me.OnDeleteFaxFileBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportFaxInfoBtnClick, me);
        me.down('button[text="导出 "]').on('click', me.OnExportFaxFileBtnClick, me);
        me.down('gridpanel').on('select', me.OnFaxInfoGridSelect, me);
        me.faxStore.on('load', me.OnFaxStoreLoad, me);
    },
    
    OnFaxStoreLoad: function(store, records, successful, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.fileStore.getProxy(), {
    	    extraParams:{}
    	});
    	me.fileStore.loadRawData([]);
    },
    
    OnAddFaxBtnClick: function(self, e, options) {
    	var me = this;
    	xdfn.user.Rights.hasRights('XTGL-CZGG-2', function() {
	    	Ext.create('xdfn.fax.FaxInfoWindow', {
	    		url: './faxManage.do?method=addFax',
	    	    grid: self.up('gridpanel')
	    	}).show();
    	});
    },
    
    OnModifyFaxBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-CZGG-3', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.fax.FaxInfoWindow', {
	    	        title: '修改传真',
	    	        url: './faxManage.do?method=modifyFax',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './faxManage.do?method=findFaxById',
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
	    		Ext.Msg.alert('提示','请选择要修改的传真！');
	    	}
    	});
    },
    
    OnDeleteFaxBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-CZGG-4', function() {    
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该传真吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除传真
	            		Ext.Ajax.request({
				    	    url: './faxManage.do?method=deleteFax',
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
	    		Ext.Msg.alert('提示','请选择要删除的传真！');
	    	}
    	});
    },
    
    OnAddFaxFileBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = me.down('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-CZGG-6', function() {    
	    	if (rows.length > 0) {
	    		Ext.create('xdfn.fax.FaxFileWindow', {
	    			url: './faxManage.do?method=addAttach',
	    		    grid: self.up('gridpanel'),
	    		    ID: rows[0].get('ID_VIEW')
	    		}).show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的传真！');
	    	}
    	});
    },
    
    OnModifyFaxFileBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-CZGG-7', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.fax.FaxFileWindow', {
	    	        title: '修改附件',
	    	        url: './faxManage.do?method=modifyAttach',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './faxManage.do?method=findAttachById',
	                params: {
	                	ID: rows[0].get('ID_VIEW')
	                },
	                method: 'get',
	                success: function(form, action) {
	                	Ext.apply(form.findField('V_ATTACH_FILE'), {
	                	    allowBlank:true
	                	});
	            	    wForm.show();
	                },
	                failure: function(form, action) {
	            	    wForm.destroy();
	            	    Ext.Msg.alert('提示','无法修改！');
	                }
	            });
	    	} else {
	    		Ext.Msg.alert('提示','请选择要修改的附件！');
	    	}
    	});
    },
    
    OnDeleteFaxFileBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-CZGG-8', function() {    
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该附件吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除附件
	            		Ext.Ajax.request({
				    	    url: './faxManage.do?method=deleteAttach',
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
	    		Ext.Msg.alert('提示','请选择要删除的附件！');
	    	}
    	});
    },

    OnFaxInfoGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.fileStore.getProxy(), {
    	    extraParams:{
    	        ID: record.get('ID_VIEW')
    	    }
    	});
    	me.fileStore.loadPage(1);
    },
    
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	Ext.apply(me.faxStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.faxStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {    	
    	self.up('form').getForm().reset();
    },
    
    OnExportFaxInfoBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XTGL-CZGG-5', function() {
    		me.faxStore.load({
       	    	limit: me.faxStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '传真信息表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    		
    	});
    },
    
    OnExportFaxFileBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	//Ext.Msg.alert('提示','导出为excel文件！');
    	xdfn.user.Rights.hasRights('XTGL-CZGG-9', function() {
    		me.fileStore.load({
       	    	limit: me.fileStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '传真附件信息表'});
       	    		document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});