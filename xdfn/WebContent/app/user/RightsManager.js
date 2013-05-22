/**
 * File: app/user/RightsManager.js
 * Author: liusha
 */
 
Ext.define('xdfn.user.RightsManager', {
    extend: 'xdfn.user.ui.RightsManager',

    initComponent: function() {
        var me = this;

        me.rightStore = Ext.create('xdfn.user.store.RightsJsonStore');
        me.userStore = Ext.create('xdfn.user.store.UserJsonStore');
        me.userightStore = Ext.create('xdfn.user.store.UserRightsJsonStore');
        
        me.callParent(arguments);
        
        //register components event.
        me.down('button[text="增加权限"]').on('click', me.OnAddRightsBtnClick, me);
        me.down('button[text="删除权限"]').on('click', me.OnDeleteRightsBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="刷新"]').on('click', me.OnRefreshBtnClick, me);
        me.down('#UserGrid').on('select', me.OnUserGridSelect, me);
        me.down('#RightGrid').on('select', me.OnRightsGridSelect, me);
        me.userStore.on('load', me.OnUserStoreLoad, me);
    },
    
    OnUserStoreLoad: function(store, records, successful, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.userightStore.getProxy(), {
    	    extraParams:{}
    	});
    	me.userightStore.loadRawData([]);
    },
    
    OnAddRightsBtnClick: function(self, e, options) {
    	var me = this,
    	    users = me.down('#UserGrid').getSelectionModel().getSelection(),
    	    rights = me.down('#RightGrid').getSelectionModel().getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-QXGL-2', function() {
	    	if (users.length > 0 && rights.length > 0) {
	    		var ID = [];
	    		Ext.each(rights, function(item) {
	    			ID.push(item.get('ID_VIEW'));
	    		});
				Ext.Ajax.request({
		    	    url: './userManage.do?method=addUserRights',
		    	    method: 'get',
		    	    params: {
		    	    	V_RIGHT_ID: Ext.encode(ID),
		    	    	V_USER_FK: users[0].get('V_USER_FK_VIEW')
		    	    },
		    	    success: function(response, opts) {
		    	    	me.rightStore.remove(rights);
				    	me.userightStore.load();
			    		Ext.Msg.alert('提示','增加权限成功！');
				    },
				    failure: function(response, opts) {
				    	Ext.Msg.alert('提示', '请求失败！');
				    }
		    	});
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的员工和权限！');
	    	}
    	});
    },
    
    OnDeleteRightsBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rights = sm.getSelection(),
    	    users = me.down('#UserGrid').getSelectionModel().getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-QXGL-3', function() {    
	    	if (users.length > 0 && rights.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除选择的用户权限吗？', function(id) {
	            	if (id == 'yes') {
	            		var ID = [];
	            		Ext.each(rights, function(item) {
	            			ID.push(item.get('ID_VIEW'));
	            		});
		    			Ext.Ajax.request({
				    	    url: './userManage.do?method=delUserRights',
				    	    method: 'get',
				    	    params: {
				    	    	ID: Ext.encode(ID),//item.get('ID_VIEW')
		            			V_USER_FK: users[0].get('V_USER_FK_VIEW')
				    	    },
				    	    success: function(response, opts) {
				    	    	me.userightStore.load();
				    	    	Ext.Msg.alert('提示','删除权限成功！');
						    },
						    failure: function(response, opts) {
						    	Ext.Msg.alert('提示', '请求失败！');
						    }
				    	});
	                }
	            });
	    	} else {
	    		Ext.Msg.alert('提示','请选择要删除的用户权限！');
	    	}
    	});
    },
    
    OnUserGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.userightStore.getProxy(), {
    	    extraParams:{
    	        V_USER_FK: record.get('V_USER_FK_VIEW')
    	    }
    	});
    	me.userightStore.loadPage(1);
    },
    
    OnRightsGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    },
        
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	Ext.apply(me.userStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.userStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {
    	self.up('form').getForm().reset();
    },
    
    OnRefreshBtnClick: function(self, e, options) {
    	var me = this;
    	me.rightStore.load();
    }
});