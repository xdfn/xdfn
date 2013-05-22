/**
 * File: app/customer/CustomInfo.js
 * Author: liusha
 */

 
Ext.define('xdfn.customer.CustomInfo', {
    extend: 'xdfn.customer.ui.CustomInfo',

    initComponent: function() {
        var me = this;
        
        me.custStore = Ext.create('xdfn.customer.store.CustomInfoJsonStore');
        me.linkStore = Ext.create('xdfn.customer.store.CustomLinkJsonStore');
        
        me.callParent(arguments);
        
        me.down('button[text="增加客户"]').on('click', me.OnAddCustomBtnClick, me);
        me.down('button[text="修改客户"]').on('click', me.OnModifyCustomBtnClick, me);
        me.down('button[text="删除客户"]').on('click', me.OnDeleteCustomBtnClick, me);
        me.down('button[text="增加联系人"]').on('click', me.OnAddLinkBtnClick, me);
        me.down('button[text="修改联系人"]').on('click', me.OnModifyLinkBtnClick, me);
        me.down('button[text="删除联系人"]').on('click', me.OnDeleteLinkBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportCustomerBtnClick, me);
        me.down('button[text="导出 "]').on('click', me.OnExportLinkBtnClick, me);
        me.down('gridpanel').on('select', me.OnCustomerGridSelect, me);
        me.down('gridpanel').on('itemdblclick', me.OnCustomerGridItemDbClick, me);
        me.down('gridpanel[title="客户联系人"]').on('itemdblclick', me.OnLinkGridItemDbClick, me);
        me.custStore.on('load', me.OnCustomStoreLoad, me);
    },
    
    OnCustomStoreLoad: function(store, records, successful, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.linkStore.getProxy(), {
    	    extraParams:{}
    	});
    	me.linkStore.loadRawData([]);
    },
    
    OnAddCustomBtnClick: function(self, e, options) {
    	var me = this;
    	xdfn.user.Rights.hasRights('KHGL-KHXX-2', function() {
	    	Ext.create('xdfn.customer.CustomInfoWindow', {
	    		url: './cusManage.do?method=addCusInfo',
	    	    grid: self.up('gridpanel')
	    	}).show();
    	});
    },
    
    OnCustomerGridItemDbClick: function (view, record, item, index, e, eOpts) {
    	var me = this;
    	
    	var wForm = Ext.create('xdfn.customer.CustomInfoWindow', {
	        title: '查看客户',
	        enableSubmit: false
	    });
	    wForm.down('form').getForm().load({
            url: './cusManage.do?method=findCusById',
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
    
    OnModifyCustomBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('KHGL-KHXX-3', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.customer.CustomInfoWindow', {
	    	        title: '修改客户',
	    	        url: './cusManage.do?method=modifyCusInfo',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './cusManage.do?method=findCusById',
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
	    		Ext.Msg.alert('提示','请选择要修改的客户！');
	    	}
    	});
    },
    
    OnDeleteCustomBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('KHGL-KHXX-4', function() {    
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该客户吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除客户
	            		Ext.Ajax.request({
				    	    url: './cusManage.do?method=deleteCus',
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
	    		Ext.Msg.alert('提示','请选择要删除的客户！');
	    	}
    	});
    },
    
    OnAddLinkBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = me.down('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('KHGL-KHXX-6', function() {    
	    	if (rows.length > 0) {
	    		Ext.create('xdfn.customer.CustomLinkWindow', {
	    		    url: './cusManage.do?method=addCusRela',
	    	        grid: self.up('gridpanel'),
	    	        ID: rows[0].get('ID_VIEW')
	    	    }).show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的客户！');
	    	}
    	});
    },
    
    OnLinkGridItemDbClick: function (view, record, item, index, e, eOpts) {
    	var me = this;
    	    
		var wForm = Ext.create('xdfn.customer.CustomLinkWindow', {
	        title: '查看联系人',
	        enableSubmit: false
	    });
	    wForm.down('form').getForm().load({
            url: './cusManage.do?method=findCusLinkById',
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
    
    OnModifyLinkBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('KHGL-KHXX-7', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.customer.CustomLinkWindow', {
	    	        title: '修改联系人',
	    	        url: './cusManage.do?method=modifyCusRela',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './cusManage.do?method=findCusLinkById',
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
	    		Ext.Msg.alert('提示','请选择要修改的联系人！');
	    	}
    	});
    },
    
    OnDeleteLinkBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('KHGL-KHXX-8', function() {    
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该联系人吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除联系人
	            		Ext.Ajax.request({
				    	    url: './cusManage.do?method=delCusRela',
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
	    		Ext.Msg.alert('提示','请选择要删除的联系人！');
	    	}
    	});
    },
        
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	Ext.apply(me.custStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.custStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {    	
    	self.up('form').getForm().reset();
    },
    
    OnCustomerGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.linkStore.getProxy(), {
    	    extraParams:{
    	        ID: record.get('ID_VIEW')
    	    }
    	});
    	me.linkStore.loadPage(1);
    },
    
    OnExportCustomerBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('KHGL-KHXX-5', function() {
    		me.custStore.load({
       	    	limit: me.custStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '客户信息表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    },
    
    OnExportLinkBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('KHGL-KHXX-9', function() {
    		me.linkStore.load({
       	    	limit: me.linkStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '客户联系人信息表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});