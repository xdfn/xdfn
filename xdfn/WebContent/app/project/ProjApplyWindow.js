/**
 * File: app/project/ProjApplyWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ProjApplyWindow', {
    extend: 'xdfn.project.ui.ProjApplyWindow',

    grid: null,
    
    ID: null,
    
    url: null,
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        
        me.down('button[text=提交]').on('click', me.OnSubmitBtnClick, me);
        me.down('button[text=关闭]').on('click', me.OnCloseBtnClick, me);
        me.down('combobox[name="V_TYPE"]').on('change', me.OnTypeChange, me);
    },
    
    OnTypeChange: function(self, newValue, oldValue, options) {
    	var me = this;
    	if (newValue == me.down('textfield[name="V_OLD_TYPE"]').getValue()) {
    		self.reset();
    		Ext.Msg.alert('提示','报送阶段与现在阶段不能相同！');
    	}
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
    	    success: function(form, action){
    	    	var store = me.grid.getStore(),
    	    	    sm = me.grid.getSelectionModel(),
    	    	    rows = sm.getSelection();
    	    	
	    		store.insert(0, action.result.data);
			    sm.select(0);
				
    	    	me.close();
    	    	Ext.Msg.alert('提示','报送成功！');
			},
			failure: function(form, action){
				Ext.Msg.alert('提示','提交失败！');
			}
    	});
    },
    
    OnCloseBtnClick: function(self, e, options) {
    	var me = this;
    	me.close();
    }
});