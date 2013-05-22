Ext.define("xdfn.project.ui.ProjExecDispatch",{extend:"Ext.panel.Panel",layout:{type:"fit"},closable:false,title:"发货记录表",initComponent:function(){var a=this;a.items=[{xtype:"gridpanel",store:a.dispStore,columns:[{xtype:"gridcolumn",width:200,dataIndex:"V_JX_NAME_VIEW",text:"机型名称",editor:{xtype:"textfield",allowBlank:false,enforceMaxLength:true,maxLength:50}},{xtype:"gridcolumn",width:120,dataIndex:"V_BJ_NAME_VIEW",text:"部件名称",editor:{xtype:"textfield",allowBlank:false,enforceMaxLength:true,maxLength:50}},{xtype:"numbercolumn",align:"right",dataIndex:"N_F_SUM_VIEW",text:"发货数量",editor:{xtype:"numberfield",allowBlank:false,minValue:0,enforceMaxLength:true,maxLength:5},summaryType:"sum",summaryRenderer:function(b){return"总数：        "+b}},{xtype:"numbercolumn",align:"right",dataIndex:"N_S_SUM_VIEW",text:"到货数量",editor:{xtype:"numberfield",allowBlank:false,minValue:0,enforceMaxLength:true,maxLength:5},summaryType:"sum",summaryRenderer:function(b){return"总数：        "+b}},{xtype:"datecolumn",align:"right",width:120,dataIndex:"D_DISP_DATE_VIEW",text:"发货日期",format:"Y年m月d日",editor:{xtype:"datefield",allowBlank:false,editable:false,format:"Y年m月d日",submitFormat:"Y-m-d"}},{xtype:"datecolumn",align:"right",width:120,dataIndex:"D_RECIEVED_DATE_VIEW",text:"到货日期",format:"Y年m月d日",editor:{xtype:"datefield",editable:false,format:"Y年m月d日",submitFormat:"Y-m-d"}},{xtype:"gridcolumn",align:"right",dataIndex:"V_CJR_VIEW",text:"创建人"},{xtype:"gridcolumn",width:200,dataIndex:"V_REM_VIEW",text:"备注",editor:{xtype:"textfield",enforceMaxLength:true,maxLength:500}},{xtype:"datecolumn",align:"right",width:200,dataIndex:"D_DATE_VIEW",text:"添加时间",format:"Y年m月d日 H时i分s秒"},{xtype:"gridcolumn",hidden:true,dataIndex:"ID_VIEW",hideable:false,text:"ID"}],viewConfig:{},plugins:[a.rowEditing],features:[{ftype:"summary"}],dockedItems:[{xtype:"toolbar",dock:"top",items:[{xtype:"button",iconCls:"add_btn",text:"增加记录"},{xtype:"tbseparator"},{xtype:"button",iconCls:"remove_btn",text:"删除记录"},{xtype:"tbseparator"},{xtype:"button",iconCls:"ext_xls",text:"导出"}]},{xtype:"pagingtoolbar",displayInfo:true,store:a.dispStore,dock:"bottom"}]}];a.callParent(arguments)}});