/**
 * File: app/project/ProjStanding.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ProjStanding', {
    extend: 'xdfn.project.ui.ProjStanding',

    grid: null,
    
    initComponent: function() {
        var me = this;

        me.standStore = Ext.create('xdfn.project.store.ProjStandingJsonStore');
        
        me.callParent(arguments);
        
        me.down('button[text="增加台账"]').on('click', me.OnAddStandingBtnClick, me);
        me.down('button[text="修改台账"]').on('click', me.OnModifyStandingBtnClick, me);
        me.down('button[text="删除台账"]').on('click', me.OnDeleteStandingBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportStandingBtnClick, me);
    },
    
    OnAddStandingBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = me.grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-34', function() {
	    	if (rows.length > 0) {
	    		Ext.create('xdfn.project.ProjStandingWindow', {
		    		url: './proExec.do?method=addBidAccount',
		    	    grid: grid,
		    	    ID: rows[0].get('ID_VIEW')
		    	}).show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的项目！');
	    	}
    	});
    },
    
    OnModifyStandingBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-35', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.project.ProjStandingWindow', {
	    	        title: '修改台账',
	    	        url: './proExec.do?method=modifyBidAccount',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './proExec.do?method=findBidAccountById',
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
	    		Ext.Msg.alert('提示','请选择要修改的台账！');
	    	}
    	});
    },
    
    OnDeleteStandingBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-36', function() {
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该台账吗？', function(id) {
	            	if (id == 'yes') {
		    			Ext.Ajax.request({
				    	    url: './proExec.do?method=deleteBidAccount', //改为实际的删除请求url
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
	    		Ext.Msg.alert('提示','请选择要删除的台账！');
	    	}
    	});
    },
    
    OnExportStandingBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-XMZL-37', function() {
    		me.standStore.load({
       	    	limit: me.standStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '项目投标台账'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});