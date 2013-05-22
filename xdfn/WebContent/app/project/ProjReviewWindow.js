/**
 * File: app/project/ProjReviewWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ProjReviewWindow', {
    extend: 'xdfn.project.ui.ProjReviewWindow',

    grid: null,
    
    ID: null,
    
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
    	    	ID: me.ID
    	    },
    	    success : function(form, action){
				var sm = me.grid.getSelectionModel(),
    	    	    rows = sm.getSelection();
    	    	
	    		rows[0].set(action.result.data);
	    		rows[0].commit();
				
    	    	me.close();
    	    	Ext.Msg.alert('提示','审核完成！');
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