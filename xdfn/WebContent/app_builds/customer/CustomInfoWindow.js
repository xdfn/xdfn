Ext.define("xdfn.customer.CustomInfoWindow",{extend:"xdfn.customer.ui.CustomInfoWindow",grid:null,ID:null,url:null,enableSubmit:true,initComponent:function(){var a=this;a.callParent(arguments);if(!a.enableSubmit){a.down("button[text=提交]").disable(true)}a.down("button[text=提交]").on("click",a.OnSubmitBtnClick,a);a.down("button[text=关闭]").on("click",a.OnCloseBtnClick,a)},OnSubmitBtnClick:function(a,f,b){var d=this;var c=a.up("form").getForm();if(!c.isValid()){return}c.submit({clientValidtion:true,waitMsg:"正在提交信息...",waitTitle:"提示",url:d.url,params:{ID:d.ID},success:function(g,i){var e=d.grid.getStore(),j=d.grid.getSelectionModel(),h=j.getSelection();if(d.title=="增加客户"){e.insert(0,i.result.data);j.select(0)}else{h[0].set(i.result.data);h[0].commit()}d.close()},failure:function(e,g){Ext.Msg.alert("提示","提交失败！")}})},OnCloseBtnClick:function(a,d,b){var c=this;c.close()}});