Ext.define("xdfn.info.Bulletin",{extend:"xdfn.info.ui.Bulletin",initComponent:function(){var a=this;a.bullStore=Ext.create("xdfn.info.store.BulletinJsonStore");a.callParent(arguments);a.down('button[text="查找"]').on("click",a.OnSearchBtnClick,a);a.down('button[text="重置"]').on("click",a.OnResetBtnClick,a)},OnSearchBtnClick:function(a,f,b){var d=this;var c=a.up("form").getForm();if(!c.isValid()){return}Ext.apply(d.bullStore.getProxy(),{extraParams:c.getValues()});d.bullStore.load()},OnResetBtnClick:function(a,c,b){a.up("form").getForm().reset()}});