Ext.define("xdfn.info.News",{extend:"xdfn.info.ui.News",initComponent:function(){var a=this;a.newsStore=Ext.create("xdfn.info.store.NewsJsonStore");a.callParent(arguments);a.down('button[text="查找"]').on("click",a.OnSearchBtnClick,a);a.down('button[text="重置"]').on("click",a.OnResetBtnClick,a)},OnSearchBtnClick:function(a,f,b){var d=this;var c=a.up("form").getForm();if(!c.isValid()){return}Ext.apply(d.newsStore.getProxy(),{extraParams:c.getValues()});d.newsStore.load()},OnResetBtnClick:function(a,c,b){a.up("form").getForm().reset()}});