/**
 * File: app/project/ProjFlolow.js
 * Author: liusha
 */

Ext.define('xdfn.project.ProjFollow', {
    extend: 'xdfn.project.ui.ProjFollow',

    grid: null,
        
    initComponent: function() {
        var me = this;
        
        me.followStore = Ext.create('xdfn.project.store.ProjFollowJsonStore');
        me.psStore = Ext.create('xdfn.project.store.PSListJsonStore');
        
        me.callParent(arguments);
        
        me.down('button[text="增加记录"]').on('click', me.OnAddProjFollowBtnClick, me);
        me.down('button[text="修改记录"]').on('click', me.OnModifyProjFollowBtnClick, me);
        me.down('button[text="删除记录"]').on('click', me.OnDeleteProjFollowBtnClick, me);
        me.down('button[text="增加批示"]').on('click', me.OnAddPSBtnClick, me);
        me.down('button[text="修改批示"]').on('click', me.OnModifyPSBtnClick, me);
        me.down('button[text="删除批示"]').on('click', me.OnDeletePSBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportFollowBtnClick, me);
        me.down('gridpanel').on('select', me.OnProjFollowGridSelect, me);
        me.down('gridpanel').on('itemdblclick', me.OnProjFollowGridItemDbClick, me);
        me.followStore.on('load', me.OnFollowStoreLoad, me);
    },
    
    OnFollowStoreLoad: function(store, records, successful, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.psStore.getProxy(), {
	        extraParams:{}
	    });
	    me.psStore.loadRawData([]);
    },
    
    OnAddProjFollowBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = me.grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-8', function() {
	    	if (rows.length > 0) {
	    		Ext.create('xdfn.project.ProjFollowWindow', {
		    		url: './projectMgr.do?method=addProFollow',
		    	    grid: grid,
		    	    ID: rows[0].get('ID_VIEW')
		    	}).show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的项目！');
	    	}
    	});
    },
    
    OnProjFollowGridItemDbClick: function (view, record, item, index, e, eOpts) {
    	var me = this;
    	
		var wForm = Ext.create('xdfn.project.ProjFollowWindow', {
	        title: '查看跟进记录',
	        enableSubmit: false
	    });
	    wForm.down('form').getForm().load({
            url: './projectMgr.do?method=findProFollowById',
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
    
    OnModifyProjFollowBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-9', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.project.ProjFollowWindow', {
	    	        title: '修改跟进记录',
	    	        url: './projectMgr.do?method=modifyProFollow',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './projectMgr.do?method=findProFollowById',
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
	    		Ext.Msg.alert('提示','请选择要修改的跟进记录！');
	    	}
    	});
    },
    
    OnDeleteProjFollowBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-10', function() {
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该跟进记录吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除跟进记录
		    			Ext.Ajax.request({
				    	    url: './projectMgr.do?method=deleteProFollow',
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
	    		Ext.Msg.alert('提示','请选择要删除的跟进记录！');
	    	}
    	});
    },
    
    OnAddPSBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = me.down('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-12', function() {    
	    	if (rows.length > 0) {
	    		Ext.create('xdfn.project.PSWindow', {
	    		    url: './projectMgr.do?method=addProFollowPS',
	    	        grid: self.up('gridpanel'),
	    	        ID: rows[0].get('ID_VIEW')
	    	    }).show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的跟进记录！');
	    	}
    	});
    },
    
    OnModifyPSBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-13', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.project.PSWindow', {
	    	        title: '修改批示',
	    	        url: './projectMgr.do?method=modifyProFollowPS',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './projectMgr.do?method=findProFollowPSById',
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
	    		Ext.Msg.alert('提示','请选择要修改的批示！');
	    	}
    	});
    },
    
    OnDeletePSBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-14', function() {    
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该批示吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除批示
	            		Ext.Ajax.request({
				    	    url: './projectMgr.do?method=deleteProFollowPS',
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
	    		Ext.Msg.alert('提示','请选择要删除的批示！');
	    	}
    	});
    },
    
    OnProjFollowGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.psStore.getProxy(), {
    	    extraParams:{
    	        ID: record.get('ID_VIEW')
    	    }
    	});
    	me.psStore.loadPage(1);
    },
    
    OnExportFollowBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-XMZL-11', function() {
    		me.followStore.load({
       	    	limit: me.followStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '项目跟进信息表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});