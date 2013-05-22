/**
 * File: app/customer/CustomReceive.js
 * Author: liusha
 */
 
Ext.define('xdfn.customer.CustomReceive', {
    extend: 'xdfn.customer.ui.CustomReceive',

    initComponent: function() {
        var me = this;

        me.recStore = Ext.create('xdfn.customer.store.CustomReceiveJsonStore');
        
        me.callParent(arguments);
        
        me.down('button[text="增加记录"]').on('click', me.OnAddRecBtnClick, me);
        me.down('button[text="修改记录"]').on('click', me.OnModifyRecBtnClick, me);
        me.down('button[text="删除记录"]').on('click', me.OnDeleteRecBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportCustomerRecBtnClick, me);
        me.down('gridpanel').on('itemdblclick', me.OnRecGridItemDbClick, me);
    },
    
    OnAddRecBtnClick: function(self, e, options) {
    	var me = this;
    	xdfn.user.Rights.hasRights('KHGL-KHJD-2', function() {
	    	Ext.create('xdfn.customer.CustomRecWindow', {
	    		url: './cusManage.do?method=addCusRec',
	    	    grid: self.up('gridpanel')
	    	}).show();
    	});
    },
    
    OnRecGridItemDbClick: function (view, record, item, index, e, eOpts) {
    	var me = this;
    	
		var wForm = Ext.create('xdfn.customer.CustomRecWindow', {
	        title: '查看记录',
	        enableSubmit: false
	    });
	    wForm.down('form').getForm().load({
            url: './cusManage.do?method=findCusRecById',
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
    
    OnModifyRecBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('KHGL-KHJD-3', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.customer.CustomRecWindow', {
	    	        title: '修改记录',
	    	        url: './cusManage.do?method=modifyCusRec',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './cusManage.do?method=findCusRecById',
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
	    		Ext.Msg.alert('提示','请选择要修改的记录！');
	    	}
    	});
    },
    
    OnDeleteRecBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('KHGL-KHJD-4', function() {    
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该记录吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除记录
	            		Ext.Ajax.request({
				    	    url: './cusManage.do?method=deleteCusRec',
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
	    		Ext.Msg.alert('提示','请选择要删除的记录！');
	    	}
    	});
    },
    
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	Ext.apply(me.recStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.recStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {    	
    	self.up('form').getForm().reset();
    },
    
    OnExportCustomerRecBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('KHGL-KHJD-5', function() {
    		me.recStore.load({
       	    	limit: me.recStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '客户接待信息表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});