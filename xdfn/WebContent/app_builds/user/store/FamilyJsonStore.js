Ext.define("xdfn.user.store.FamilyJsonStore",{extend:"Ext.data.Store",constructor:function(a){var b=this;a=a||{};b.callParent([Ext.apply({proxy:{type:"ajax",url:"userManage.do?method=getFamilyList",reader:{type:"json",root:"data"}},fields:[{name:"ID_VIEW",type:"string"},{name:"V_FAMILY_NAME_VIEW",type:"string"},{name:"V_RELA_VIEW",type:"string"},{name:"V_ADDRESS_VIEW",type:"string"},{name:"V_MEMO_VIEW",type:"string"}]},a)])}});