/**
 * File: app/com/AboutWindow.js
 * Author: liusha.
 */

Ext.define('xdfn.com.AboutWindow', {
    extend: 'xdfn.com.ui.AboutWindow',

    initComponent: function() {
        var me = this;
        
    	me.callParent(arguments);
    	
    	me.down('button[text="帮助"]').on('click', me.OnHelpBtnClick, me);
		me.down('button[text="关闭"]').on('click', me.OnCloseBtnClick, me);
		
    },
    
    OnHelpBtnClick: function(self, e, options) {
    	var me = this;
    	
    	//TODO：该处判断用户是否合法
    	Ext.Msg.alert("关于", "帮助中心")
    },
    
    OnCloseBtnClick: function(self, e, options) {
    	var me = this;
    	me.close();
    }
});