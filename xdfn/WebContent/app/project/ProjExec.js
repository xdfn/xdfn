/**
 * File: app/project/ProjExec.js
 * Author: liusha
 */

Ext.define('xdfn.project.ProjExec', {
    extend: 'xdfn.project.ui.ProjExec',

    initComponent: function() {
        var me = this;
        
        me.conStore = Ext.create('xdfn.project.store.ContractJsonStore');
        
        me.callParent(arguments);
        
        me.tabPanel = me.down('tabpanel');
    	me.grid = me.down('gridpanel');
    	
    	me.schTab = me.tabPanel.add(Ext.create('xdfn.project.ProjExecSchedule', {
            grid: me.grid
        }));
    	
    	me.dispTab = me.tabPanel.add(Ext.create('xdfn.project.ProjExecDispatch', {
            grid: me.grid
        }));
    	
        me.progressTab = me.tabPanel.add(Ext.create('xdfn.project.ProjExecProgress', {
            grid: me.grid
        }));
        
        me.execfilesTab = me.tabPanel.add(Ext.create('xdfn.project.ProjExecFiles', {
            grid: me.grid
        }));
        
        me.tabPanel.setActiveTab(me.schTab);
        
        me.subStore = new Ext.util.MixedCollection();
        me.subStore.add('ProjExecDispatchJsonStore', me.dispTab.dispStore);
        me.subStore.add('ProjExecScheduleJsonStore', me.schTab.schStore);
        me.subStore.add('ProjExecProgressJsonStore', me.progressTab.progressStore);
        me.subStore.add('ProjExecFilesJsonStore', me.execfilesTab.filesStore);
        
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('gridpanel').on('select', me.OnContractGridSelect, me);
        me.conStore.on('load', me.OnContractStoreLoad, me);
    },
    
    OnContractStoreLoad: function(store, records, successful, eOpts) {
    	var me = this;
    	
    	me.subStore.each(function(item) {
    		Ext.apply(item.getProxy(), {
	    	    extraParams:{}
	    	});
	    	item.loadRawData([]);
    	});
    },
        
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	Ext.apply(me.conStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.conStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {
    	self.up('form').getForm().reset();
    },
    
    OnContractGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
    	me.subStore.each(function(item) {
    		Ext.apply(item.getProxy(), {
	    	    extraParams:{
	    	        ID: record.get('ID_VIEW')
	    	    }
	    	});
	    	item.loadPage(1);
    	});
    }
});