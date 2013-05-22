/**
 * File: app/person/PersonInfo.js
 * Author: liusha
 */

Ext.define('xdfn.person.PersonInfo', {
    extend: 'xdfn.person.ui.PersonInfo',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);

        me.down('button[text="修改资料"]').on('click', me.OnModifyInfoBtnClick, me);
        me.down('button[text="修改密码"]').on('click', me.OnModifyPasswordBtnClick, me);
        
        me.down('form').getForm().load({
            url: './userManage.do?method=findById&ID=-1', //获取员工信息
            method: 'get',
            success: function(form, action) {
            	var photoUrl = action.result.data.V_PHOTO_URL;
            	if (Ext.isEmpty(photoUrl)) {
            		photoUrl = 'resources/images/photo_p.png';
            	} 
            	me.down('#PersonPhoto').add(Ext.create('Ext.Img', {
		            src: photoUrl,
		            reanderTo: Ext.fly('PersonPhoto')
		        }));
            },
            failure: function(form, action) {
            	Ext.Msg.alert('提示','获取个人信息失败！');
            }
        });
    },
    
    OnModifyInfoBtnClick: function(self, e, options) {
    	var me = this;
    	xdfn.user.Rights.hasRights('GRPT-GRXX-2', function() {
	    	//TODO: 提交信息
	    	var form = self.up('form').getForm();
	    	
	    	if (!form.isValid()) return;
	    	
	    	form.submit({
	    	    clientValidtion: true,
	    	    waitMsg : '正在提交信息...',
				waitTitle : '提示',
	    	    url: './userManage.do?method=editSelf',
	    	    success : function(form, action){
					Ext.Msg.alert('提示','修改成功！', function() {
						me.down('#PersonPhoto').removeAll();
						me.down('#PersonPhoto').add(Ext.create('Ext.Img', {
				            src: action.result.photo_url,
				            reanderTo: Ext.fly('PersonPhoto')
				        }));
					});
					
				},
				failure : function(form, action){
					Ext.Msg.alert('提示','提交失败！');
				}
	    	});
    	});
    },
    
    OnModifyPasswordBtnClick: function(self, e, options) {
    	var me = this;
    	
    	xdfn.user.Rights.hasRights('GRPT-GRXX-3', function() {
	    	var form = self.up('form').getForm();
	    	
	    	if (!form.isValid()) return;
	    	
	    	var newPwd = me.down('textfield[name="V_NEW_PASSWORD"]').getValue();
	    	var newPwd2 = me.down('textfield[name="V_NEW_PASSWORD2"]').getValue();
	    	if (newPwd != newPwd2) {
	    		Ext.Msg.alert('提示','两次输入新密码不一样！');
	    		return;
	    	}
	    	
	    	form.submit({
	    	    clientValidtion: true,
	    	    waitMsg : '正在提交信息...',
				waitTitle : '提示',
	    	    url: './userManage.do?method=changePwd',
	    	    success : function(form, action){
					Ext.Msg.alert('提示','修改密码成功！', function() {
						form.reset();
					});
				},
				failure : function(form, action){
					Ext.Msg.alert('提示', action.result.msg, function() {
					    me.down('textfield[name="V_OLD_PASSWORD"]').focus(true);
					});
				}
	    	});
    	});
    }
});