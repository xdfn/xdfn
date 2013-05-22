/**
 * File: app/info/InfoBulletin.js
 * Author: liusha
 */

Ext.define('xdfn.info.InfoBulletin', {
    extend: 'xdfn.info.ui.InfoBulletin',

    initComponent: function() {
        var me = this;
        
        me.bullStore = Ext.create('xdfn.info.store.BulletinJsonStore');
        
        me.callParent(arguments);
        
        me.down('button[text="增加公告"]').on('click', me.OnAddBulletinBtnClick, me);
        me.down('button[text="修改公告"]').on('click', me.OnModifyBulletinBtnClick, me);
        me.down('button[text="删除公告"]').on('click', me.OnDeleteBulletinBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportBulletinBtnClick, me);
    },
    
    OnAddBulletinBtnClick: function(self, e, options) {
    	var me = this;
    	xdfn.user.Rights.hasRights('XTGL-FBGG-2', function() {
	    	Ext.create('xdfn.info.BulletinWindow', {
	    		url: './infoPub.do?method=addBulletin',
	    	    grid: self.up('gridpanel')
	    	}).show();
    	});
    },
    
    OnModifyBulletinBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	
    	xdfn.user.Rights.hasRights('XTGL-FBGG-3', function() {
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.info.BulletinWindow', {
	    	        title: '修改公告',
	    	        url: './infoPub.do?method=modifyBulletin',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './infoPub.do?method=findBulletinById',
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
	    		Ext.Msg.alert('提示','请选择要修改的公告！');
	    	}
    	});
    },
    
    OnDeleteBulletinBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	
    	xdfn.user.Rights.hasRights('XTGL-FBGG-4', function() {
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该公告吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除公告
	            		Ext.Ajax.request({
				    	    url: './infoPub.do?method=deleteBulletin',
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
	    		Ext.Msg.alert('提示','请选择要删除的公告！');
	    	}
    	});
    },
    
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	Ext.apply(me.bullStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.bullStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {    	
    	self.up('form').getForm().reset();
    },
    
    OnExportBulletinBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XTGL-FBGG-5', function() {
    		me.bullStore.load({
       	    	limit: me.bullStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '公告栏'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});