/**
 * File: app/info/InfoNews.js
 * Author: liusha
 */

Ext.define('xdfn.info.InfoNews', {
    extend: 'xdfn.info.ui.InfoNews',

    initComponent: function() {
        var me = this;
        
        me.newsStore = Ext.create('xdfn.info.store.NewsJsonStore');
        
        me.callParent(arguments);
        
        me.down('button[text="增加资讯"]').on('click', me.OnAddNewsBtnClick, me);
        me.down('button[text="修改资讯"]').on('click', me.OnModifyNewsBtnClick, me);
        me.down('button[text="删除资讯"]').on('click', me.OnDeleteNewsBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportNewsBtnClick, me);
    },
    
    OnAddNewsBtnClick: function(self, e, options) {
    	var me = this;
    	xdfn.user.Rights.hasRights('XTGL-FBZX-2', function() {
	    	Ext.create('xdfn.info.NewsWindow', {
	    		url: './infoPub.do?method=addNews',
	    	    grid: self.up('gridpanel')
	    	}).show();
    	});
    },
    
    OnModifyNewsBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	
    	xdfn.user.Rights.hasRights('XTGL-FBZX-3', function() {
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.info.NewsWindow', {
	    	        title: '修改资讯',
	    	        url: './infoPub.do?method=modifyNews',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './infoPub.do?method=findNewsById',
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
	    		Ext.Msg.alert('提示','请选择要修改的资讯！');
	    	}
    	});
    },
    
    OnDeleteNewsBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	
    	xdfn.user.Rights.hasRights('XTGL-FBZX-4', function() {
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该资讯吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除资讯
	            		Ext.Ajax.request({
				    	    url: './infoPub.do?method=deleteNews',
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
	    		Ext.Msg.alert('提示','请选择要删除的资讯！');
	    	}
    	});
    },
    
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	Ext.apply(me.newsStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.newsStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {    	
    	self.up('form').getForm().reset();
    },
    
    OnExportNewsBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XTGL-FBZX-5', function() {
    		me.newsStore.load({
       	    	limit: me.newsStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '最新资讯'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});