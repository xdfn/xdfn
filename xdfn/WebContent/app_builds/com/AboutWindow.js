Ext.define("xdfn.com.AboutWindow",{extend:"xdfn.com.ui.AboutWindow",initComponent:function(){var a=this;a.callParent(arguments);a.down('button[text="帮助"]').on("click",a.OnHelpBtnClick,a);a.down('button[text="关闭"]').on("click",a.OnCloseBtnClick,a)},OnHelpBtnClick:function(a,d,b){var c=this;Ext.Msg.alert("关于","帮助中心")},OnCloseBtnClick:function(a,d,b){var c=this;c.close()}});