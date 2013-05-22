/**
 * File: app/project/ProjMoney.js
 * Author: liusha
 */

Ext.define('xdfn.project.ProjMoney', {
    extend: 'xdfn.project.ui.ProjMoney',

    initComponent: function() {
        var me = this;
        
        me.conStore = Ext.create('xdfn.project.store.ContractJsonStore');
        me.inStore = Ext.create('xdfn.project.store.ProjMoneyInJsonStore');
        
        me.callParent(arguments);
        
        me.tabPanel = me.down('tabpanel');
    	
    	me.indexGrid = me.down('gridpanel[title="回款指标"]');
    	me.planTab = me.tabPanel.add(Ext.create('xdfn.project.ProjMoneyPlan', {
            grid: me.indexGrid
        }));
        me.detailTab = me.tabPanel.add(Ext.create('xdfn.project.ProjMoneyDetail', {
            grid: me.planTab.down('gridpanel')
        }));
    	Ext.apply(me.planTab, {
    		detailTab: me.detailTab,
    	    detailStore: me.detailTab.detailStore
    	});
        me.tabPanel.setActiveTab(me.planTab);
        
        me.subStore = new Ext.util.MixedCollection();
        me.subStore.add('ProjMoneyInJsonStore', me.inStore);
        me.subStore.add('ProjMoneyPlanJsonStore', me.planTab.planStore);
        me.subStore.add('ProjMoneyDetailJsonStore', me.detailTab.detailStore);
        
        me.down('button[text="增加款项"]').on('click', me.OnAddIndexBtnClick, me);
        me.down('button[text="删除款项"]').on('click', me.OnDeleteIndexBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('gridpanel').on('select', me.OnContractGridSelect, me);
        me.indexGrid.on('select', me.OnMoneyInGridSelect, me);
        me.conStore.on('load', me.OnContractStoreLoad, me);
        me.inStore.on('load', me.OnMoneyInStoreLoad, me);
        me.rowEditing.on('edit', me.OnGridEdit, me);
        me.rowEditing.on('beforeedit', me.OnGridBeforeEdit, me);
    },
    
    OnGridBeforeEdit: function(editor, e, epts) {
    	xdfn.user.Rights.noRights('XMGL-HKGL-3', function() {
    		editor.cancelEdit();
    	});
    },
    
    OnGridEdit: function(editor, e) {
    	var me = this;
    	
    	if (!e.record.dirty) return;
    	
		e.record.commit();
		
    	Ext.Ajax.request({
    	    url: './projectMgr.do?method=modifyHkzb',
    	    method: 'post',
    	    params: {
    		    ID: e.record.get('ID_VIEW'),
    		    V_NAME: e.record.get('V_NAME_VIEW'),
    		    V_PERCENT: e.record.get('V_PERCENT_VIEW'),
                N_SUM: e.record.get('N_SUM_VIEW')
    	    },
    	    success: function(response, opts) {
    	    	var result = Ext.JSON.decode(response.responseText);
    	    	e.record.set(result.data);
    	    	e.record.commit();
			},
			failure: function(response, opts) {
				Ext.Msg.alert('提示','提交失败！');
			}
    	});
    },
    
    OnAddIndexBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = me.down('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-HKGL-2', function() {
	    	if (rows.length > 0) {
	    		Ext.create('xdfn.project.ProjMoneyInWindow', {
	    		    url: './projectMgr.do?method=addHkzb',
	    	        grid: self.up('gridpanel'),
	    	        ID: rows[0].get('ID_VIEW')
	    	    }).show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的合同！');
	    	}
    	});
    },
    
    OnDeleteIndexBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-HKGL-4', function() {   
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该回款指标吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除记录
	            		Ext.Ajax.request({
				    	    url: './projectMgr.do?method=deleteHkzb',
				    	    method: 'get',
				    	    params: {
				    	    	ID: rows[0].get('ID_VIEW')
				    	    },
				    	    success: function(response, opts) {
				    	    	me.rowEditing.cancelEdit();
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
	    		Ext.Msg.alert('提示','请选择要删除的回款指标！');
	    	}
    	});
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
    
    OnMoneyInStoreLoad: function(store, records, successful, eOpts) {
    	var me = this;
    	me.subStore.eachKey(function(key, item) {
	    	if (key == 'ProjMoneyInJsonStore') return;
    		
	    	item.clearFilter();
	    	item.loadPage(1);
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
    	
    	me.subStore.eachKey(function(key, item) {
    		Ext.apply(item.getProxy(), {
	    	    extraParams:{
	    	        ID: record.get('ID_VIEW')
	    	    }
	    	});
	    	item.loadPage(1);
	    	if (!item.isGrouped()) item.group('V_NAME_VIEW');
    	});
    },
    
    OnMoneyInGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
	    me.subStore.eachKey(function(key, item) {
	    	if (key == 'ProjMoneyInJsonStore') return;
    		
	    	item.clearFilter();
	    	item.filter('V_NAME_VIEW', record.get('V_NAME_VIEW'));
	    	item.group('V_NAME_VIEW');
    	});
    }
});