/**
 * File: app/info/Bulletin.js
 * Author: liusha
 */

Ext.define('xdfn.info.Bulletin', {
    extend: 'xdfn.info.ui.Bulletin',

    initComponent: function() {
        var me = this;
        
        me.bullStore = Ext.create('xdfn.info.store.BulletinJsonStore');
        
        me.callParent(arguments);
        
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
                
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
    }
});