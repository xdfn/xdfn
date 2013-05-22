Ext.define("xdfn.project.ProjStanding",{extend:"xdfn.project.ui.ProjStanding",grid:null,initComponent:function(){var a=this;a.standStore=Ext.create("xdfn.project.store.ProjStandingJsonStore");a.callParent(arguments);a.down('button[text="增加台账"]').on("click",a.OnAddStandingBtnClick,a);a.down('button[text="修改台账"]').on("click",a.OnModifyStandingBtnClick,a);a.down('button[text="删除台账"]').on("click",a.OnDeleteStandingBtnClick,a);a.down('button[text="导出"]').on("click",a.OnExportStandingBtnClick,a)},OnAddStandingBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=d.grid.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("XMGL-XMZL-34",function(){if(f.length>0){Ext.create("xdfn.project.ProjStandingWindow",{url:"./proExec.do?method=addBidAccount",grid:c,ID:f[0].get("ID_VIEW")}).show()}else{Ext.Msg.alert("提示","请先选择相应的项目！")}})},OnModifyStandingBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("XMGL-XMZL-35",function(){if(f.length>0){var e=Ext.create("xdfn.project.ProjStandingWindow",{title:"修改台账",url:"./proExec.do?method=modifyBidAccount",grid:c,ID:f[0].get("ID_VIEW")});e.down("form").getForm().load({url:"./proExec.do?method=findBidAccountById",params:{ID:f[0].get("ID_VIEW")},method:"get",success:function(i,j){e.show()},failure:function(i,j){e.destroy();Ext.Msg.alert("提示","无法修改！")}})}else{Ext.Msg.alert("提示","请选择要修改的台账！")}})},OnDeleteStandingBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("XMGL-XMZL-36",function(){if(g.length>0){Ext.MessageBox.confirm("提示","确定删除该台账吗？",function(e){if(e=="yes"){Ext.Ajax.request({url:"./proExec.do?method=deleteBidAccount",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(j,m){var k=a.indexOf(g[0]);a.remove(g);var l=a.getCount();if(l>0){i.select((k==l)?--k:k)}},failure:function(j,k){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的台账！")}})},OnExportStandingBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("XMGL-XMZL-37",function(){c.standStore.load({limit:c.standStore.getTotalCount(),scope:this,callback:function(g,f,h){var e=Ext.ux.exporter.Exporter.exportGrid(a.up("gridpanel"),"excel",{title:"项目投标台账"});document.location="data:application/vnd.ms-excel;base64,"+Ext.ux.exporter.Base64.encode(e)}})})}});