/**
 * File: app/info/News.js
 * Author: liusha
 */

Ext.define('xdfn.info.News', {
    extend: 'xdfn.info.ui.News',

    initComponent: function() {
        var me = this;
        
        me.newsStore = Ext.create('xdfn.info.store.NewsJsonStore');
        
        me.callParent(arguments);
        
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
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
    }
});