Ext.define("xdfn.project.ProjApplyWindow",{extend:"xdfn.project.ui.ProjApplyWindow",grid:null,ID:null,url:null,initComponent:function(){var a=this;a.callParent(arguments);a.down("button[text=提交]").on("click",a.OnSubmitBtnClick,a);a.down("button[text=关闭]").on("click",a.OnCloseBtnClick,a);a.down('combobox[name="V_TYPE"]').on("change",a.OnTypeChange,a)},OnTypeChange:function(a,e,c,b){var d=this;if(e==d.down('textfield[name="V_OLD_TYPE"]').getValue()){a.reset();Ext.Msg.alert("提示","报送阶段与现在阶段不能相同！")}},OnSubmitBtnClick:function(a,f,b){var d=this;var c=a.up("form").getForm();if(!c.isValid()){return}c.submit({clientValidtion:true,waitMsg:"正在提交信息...",waitTitle:"提示",url:d.url,params:{ID:d.ID},success:function(g,i){var e=d.grid.getStore(),j=d.grid.getSelectionModel(),h=j.getSelection();e.insert(0,i.result.data);j.select(0);d.close();Ext.Msg.alert("提示","报送成功！")},failure:function(e,g){Ext.Msg.alert("提示","提交失败！")}})},OnCloseBtnClick:function(a,d,b){var c=this;c.close()}});