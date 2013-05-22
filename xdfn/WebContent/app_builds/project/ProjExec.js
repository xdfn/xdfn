Ext.define("xdfn.project.ProjExec",{extend:"xdfn.project.ui.ProjExec",initComponent:function(){var a=this;a.conStore=Ext.create("xdfn.project.store.ContractJsonStore");a.callParent(arguments);a.tabPanel=a.down("tabpanel");a.grid=a.down("gridpanel");a.schTab=a.tabPanel.add(Ext.create("xdfn.project.ProjExecSchedule",{grid:a.grid}));a.dispTab=a.tabPanel.add(Ext.create("xdfn.project.ProjExecDispatch",{grid:a.grid}));a.progressTab=a.tabPanel.add(Ext.create("xdfn.project.ProjExecProgress",{grid:a.grid}));a.execfilesTab=a.tabPanel.add(Ext.create("xdfn.project.ProjExecFiles",{grid:a.grid}));a.tabPanel.setActiveTab(a.schTab);a.subStore=new Ext.util.MixedCollection();a.subStore.add("ProjExecDispatchJsonStore",a.dispTab.dispStore);a.subStore.add("ProjExecScheduleJsonStore",a.schTab.schStore);a.subStore.add("ProjExecProgressJsonStore",a.progressTab.progressStore);a.subStore.add("ProjExecFilesJsonStore",a.execfilesTab.filesStore);a.down('button[text="查找"]').on("click",a.OnSearchBtnClick,a);a.down('button[text="重置"]').on("click",a.OnResetBtnClick,a);a.down("gridpanel").on("select",a.OnContractGridSelect,a);a.conStore.on("load",a.OnContractStoreLoad,a)},OnContractStoreLoad:function(b,a,e,c){var d=this;d.subStore.each(function(f){Ext.apply(f.getProxy(),{extraParams:{}});f.loadRawData([])})},OnSearchBtnClick:function(a,f,b){var d=this;var c=a.up("form").getForm();if(!c.isValid()){return}Ext.apply(d.conStore.getProxy(),{extraParams:c.getValues()});d.conStore.load()},OnResetBtnClick:function(a,c,b){a.up("form").getForm().reset()},OnContractGridSelect:function(e,a,b,c){var d=this;d.subStore.each(function(f){Ext.apply(f.getProxy(),{extraParams:{ID:a.get("ID_VIEW")}});f.load()})}});