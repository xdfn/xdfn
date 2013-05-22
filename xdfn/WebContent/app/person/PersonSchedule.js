/**
 * File: app/person/PersonSchedule.js
 * Author: liusha
 */

Ext.define('xdfn.person.PersonSchedule', {
    extend: 'xdfn.person.ui.PersonSchedule',

    initComponent: function() {
        var me = this;
        
        if (me.ID) {
        	me.schStore = Ext.create('xdfn.person.store.ScheduleJsonStore', {
        		proxy: {
	                type: 'ajax',
	                url: './userManage.do?method=getAgendaList',
	                reader: {
	                    type: 'json',
	                    root: 'data'
	                },
	                extraParams:{
		    	        ID: me.ID
		    	    }
	            }
            });
        } else {
        	me.schStore = Ext.create('xdfn.person.store.ScheduleJsonStore');
        }
        
        me.callParent(arguments);
        
        me.down('button[text="写日程"]').on('click', me.OnWriteBtnClick, me);
        me.down('button[text="改日程"]').on('click', me.OnModifyBtnClick, me);
        me.down('button[text="删除日程"]').on('click', me.OnDeleteBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportScheduleBtnClick, me);
        me.down('gridpanel').on('itemdblclick', me.OnScheduleGridItemDbClick, me);
    },
    
    OnWriteBtnClick: function(self, e, options) {
    	var me = this;
    	xdfn.user.Rights.hasRights('GRPT-GRRC-2', function() {
	    	Ext.create('xdfn.person.ScheduleWindow', {
	    		url: './userManage.do?method=addAgenda',
	    	    grid: self.up('gridpanel')
	    	}).show();
    	});
    },
    
    OnScheduleGridItemDbClick: function (view, record, item, index, e, eOpts) {
    	var me = this;
    	    
	    var wForm = Ext.create('xdfn.person.ScheduleWindow', {
	        title: '查看日程',
	        enableSubmit: false
	    });
	    wForm.down('form').getForm().load({
            url: './userManage.do?method=findAgendaById',
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
    
    OnModifyBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('GRPT-GRRC-3', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.person.ScheduleWindow', {
	    	        title: '改日程',
	    	        url: './userManage.do?method=modifyAgenda',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './userManage.do?method=findAgendaById',
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
	    		Ext.Msg.alert('提示','请选择要修改的日程！');
	    	}
    	});
    },
    
    OnDeleteBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	
    	xdfn.user.Rights.hasRights('GRPT-GRRC-4', function() {
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该日程吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除日程
	            		Ext.Ajax.request({
				    	    url: './userManage.do?method=deleteAgenda',
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
	    		Ext.Msg.alert('提示','请选择要删除的日程！');
	    	}
    	});
    },
        
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	Ext.apply(me.schStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.schStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {    	
    	self.up('form').getForm().reset();
    },
    
    OnExportScheduleBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('GRPT-GRRC-5', function() {
    		me.schStore.load({
       	    	limit: me.schStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '个人日程'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});