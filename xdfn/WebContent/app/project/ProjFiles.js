/**
 * File: app/project/ProjFiles.js
 * Author: liusha
 */

Ext.define('xdfn.project.ProjFiles', {
    extend: 'xdfn.project.ui.ProjFiles',

    grid: null,
        
    initComponent: function() {
        var me = this;
        
        me.filesStore = Ext.create('xdfn.project.store.ProjFilesJsonStore');
        
        me.fileslistStore = Ext.create('xdfn.project.store.ProjFilesListJsonStore');
        
        me.callParent(arguments);
        
        me.down('button[text="增加记录"]').on('click', me.OnAddProjFilesBtnClick, me);
        me.down('button[text="修改记录"]').on('click', me.OnModifyProjFilesBtnClick, me);
        me.down('button[text="删除记录"]').on('click', me.OnDeleteProjFilesBtnClick, me);
        me.down('button[text="增加档案"]').on('click', me.OnAddFilesBtnClick, me);
        me.down('button[text="修改档案"]').on('click', me.OnModifyFilesBtnClick, me);
        me.down('button[text="删除档案"]').on('click', me.OnDeleteFilesBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportFilesBtnClick, me);
        me.down('gridpanel').on('select', me.OnProjFilesGridSelect, me);
        me.filesStore.on('load', me.OnFilesStoreLoad, me);
    },
    
    OnFilesStoreLoad: function(store, records, successful, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.fileslistStore.getProxy(), {
    	    extraParams:{}
    	});
    	me.fileslistStore.loadRawData([]);
    },
    
    OnAddProjFilesBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = me.grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-15', function() {
	    	if (rows.length > 0) {
	    		Ext.create('xdfn.project.ProjFilesWindow', {
		    		url: './projectMgr.do?method=addProWlda',
		    	    grid: grid,
		    	    ID: rows[0].get('ID_VIEW')
		    	}).show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的项目！');
	    	}
    	});
    },
    
    OnModifyProjFilesBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-16', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.project.ProjFilesWindow', {
	    	        title: '修改往来记录',
	    	        url: './projectMgr.do?method=modifyProWlda',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './projectMgr.do?method=findProWldaById',
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
	    		Ext.Msg.alert('提示','请选择要修改的往来记录！');
	    	}
    	});
    },
    
    OnDeleteProjFilesBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-17', function() {
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该往来记录吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除往来记录
		    			Ext.Ajax.request({
				    	    url: './projectMgr.do?method=deleteProWlda',
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
	    		Ext.Msg.alert('提示','请选择要删除的往来记录！');
	    	}
    	});
    },
    
    OnAddFilesBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = me.down('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-19', function() {    
	    	if (rows.length > 0) {
	    		Ext.create('xdfn.project.ProjFilesListWindow', {
	    		    url: './projectMgr.do?method=addProFile',
	    	        grid: self.up('gridpanel'),
	    	        ID: rows[0].get('ID_VIEW')
	    	    }).show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的往来记录！');
	    	}
    	});
    },
    
    OnModifyFilesBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-20', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.project.ProjFilesListWindow', {
	    	        title: '修改档案',
	    	        url: './projectMgr.do?method=modifyProFile',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './projectMgr.do?method=findProFileById',
	                params: {
	                	ID: rows[0].get('ID_VIEW')
	                },
	                method: 'get',
	                success: function(form, action) {
	                	Ext.apply(form.findField('V_FILE_ATT'), {
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
	    		Ext.Msg.alert('提示','请选择要修改的档案！');
	    	}
    	});
    },
    
    OnDeleteFilesBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-21', function() {    
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该档案吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除档案
	            		Ext.Ajax.request({
				    	    url: './projectMgr.do?method=deleteProFile',
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
	    		Ext.Msg.alert('提示','请选择要删除的档案！');
	    	}
    	});
    },
    
    OnProjFilesGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.fileslistStore.getProxy(), {
    	    extraParams:{
    	        ID: record.get('ID_VIEW')
    	    }
    	});
    	me.fileslistStore.loadPage(1);
    },
    
    OnExportFilesBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-XMZL-18', function() {
    		me.filesStore.load({
       	    	limit: me.filesStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '项目中标前往来文档'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});