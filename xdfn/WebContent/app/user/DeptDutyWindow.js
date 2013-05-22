/**
 * File: app/user/DeptDutyWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.user.DeptDutyWindow', {
    extend: 'xdfn.user.ui.DeptDutyWindow',

    selectNode: null,
    
    deptree: null,
    
    url: null,
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        
        me.down('button[text=提交]').on('click', me.OnSubmitBtnClick, me);
        me.down('button[text=关闭]').on('click', me.OnCloseBtnClick, me);
    },
    
    OnSubmitBtnClick: function(self, e, options) {
    	var me = this;
    	//TODO: 提交信息
    	var form = self.up('form').getForm();
    	
    	if (!form.isValid()) return;
    	
    	form.submit({
    	    clientValidtion: true,
    	    waitMsg : '正在提交信息...',
			waitTitle : '提示',
    	    url: me.url,
    	    params: {
    	    	ID: me.selectNode.get('ID_VIEW'),
                N_NODE_LEVEL: me.selectNode.get('N_NODE_LEVEL_VIEW')
    	    },
    	    success : function(form, action){
				me.deptree.getStore().load();
    	    	me.close();
			},
			failure : function(form, action){
				Ext.Msg.alert('提示','提交失败！');
			}
    	});
    },
    
    OnCloseBtnClick: function(self, e, options) {
    	var me = this;
    	me.close();
    }
});