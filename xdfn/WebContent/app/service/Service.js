/**
 * File: app/service/Service.js
 * Author: liusha
 */
 
Ext.define('xdfn.service.Service', {
    extend: 'xdfn.service.ui.Service',

    initComponent: function() {
        var me = this;

        me.serviceStore = Ext.create('xdfn.service.store.ServiceJsonStore');
        
        me.psStore = Ext.create('xdfn.project.store.PSListJsonStore', {
    		proxy: {
                type: 'ajax',
                url: './serRec.do?method=getPishiList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });
        
        me.callParent(arguments);
        
        me.down('button[text="增加记录"]').on('click', me.OnAddServiceBtnClick, me);
        me.down('button[text="修改记录"]').on('click', me.OnModifyServiceBtnClick, me);
        me.down('button[text="删除记录"]').on('click', me.OnDeleteServiceBtnClick, me);
        me.down('button[text="增加批示"]').on('click', me.OnAddPSBtnClick, me);
        me.down('button[text="修改批示"]').on('click', me.OnModifyPSBtnClick, me);
        me.down('button[text="删除批示"]').on('click', me.OnDeletePSBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportProjectBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('gridpanel').on('select', me.OnServiceGridSelect, me);
        me.down('gridpanel').on('itemdblclick', me.OnServiceGridItemDbClick, me);
        me.serviceStore.on('load', me.OnServiceStoreLoad, me);
    },
    
    OnServiceStoreLoad: function(store, records, successful, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.psStore.getProxy(), {
    	    extraParams:{}
    	});
    	me.psStore.loadRawData([]);
    },
    
    OnAddServiceBtnClick: function(self, e, options) {
    	var me = this;
    	xdfn.user.Rights.hasRights('FWGL-FWJL-2', function() {
	    	Ext.create('xdfn.service.ServiceWindow', {
	    		url: './serRec.do?method=add',
	    	    grid: self.up('gridpanel')
	    	}).show();
    	});
    },
    
    OnServiceGridItemDbClick: function (view, record, item, index, e, eOpts) {
    	var me = this;
    	    
	    var wForm = Ext.create('xdfn.service.ServiceWindow', {
	        title: '查看服务记录',
	        enableSubmit: false
	    });
	    wForm.down('form').getForm().load({
            url: './serRec.do?method=findById',
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
    
    OnModifyServiceBtnClick: function(self, e, options) {
    	var me = this,
        grid = self.up('gridpanel'),
        sm = grid.getSelectionModel(),
        rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('FWGL-FWJL-3', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.service.ServiceWindow', {
	    	        title: '修改服务记录',
	    	        url: './serRec.do?method=modify',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './serRec.do?method=findById',
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
	    		Ext.Msg.alert('提示','请选择要修改的服务记录！');
	    	}
    	});
    },
    
    OnDeleteServiceBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('FWGL-FWJL-4', function() {
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该服务记录吗？', function(id) {
	            	if (id == 'yes') {
		    			Ext.Ajax.request({
				    	    url: './serRec.do?method=delete', //改为实际的删除请求url
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
	    		Ext.Msg.alert('提示','请选择要删除的服务记录！');
	    	}
    	});
    },
    
    OnAddPSBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = me.down('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('FWGL-FWJL-6', function() {    
	    	if (rows.length > 0) {
	    		Ext.create('xdfn.project.PSWindow', {
	    		    url: './serRec.do?method=addPishi',
	    	        grid: self.up('gridpanel'),
	    	        ID: rows[0].get('ID_VIEW')
	    	    }).show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的服务记录！');
	    	}
    	});
    },
    
    OnModifyPSBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('FWGL-FWJL-7', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.project.PSWindow', {
	    	        title: '修改批示',
	    	        url: './serRec.do?method=modifyPishi',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './serRec.do?method=findPishiById',
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
    	    
    	xdfn.user.Rights.hasRights('FWGL-FWJL-8', function() {    
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该批示吗？', function(id) {
	            	if (id == 'yes') {
	            		Ext.Ajax.request({
				    	    url: './serRec.do?method=deletePishi', //改为实际的删除请求url
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
    
    OnServiceGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.psStore.getProxy(), {
    	    extraParams:{
    	        ID: record.get('ID_VIEW')
    	    }
    	});
    	me.psStore.loadPage(1);
    },
    
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	Ext.apply(me.serviceStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.serviceStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {
    	self.up('form').getForm().reset();
    },
    
    OnExportProjectBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('FWGL-FWJL-5', function() {
    		me.serviceStore.load({
       	    	limit: me.serviceStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '服务记录信息表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});