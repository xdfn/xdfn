Ext.define("xdfn.person.store.PersonAddressJsonStore",{extend:"Ext.data.Store",constructor:function(a){var b=this;a=a||{};b.callParent([Ext.apply({autoLoad:true,proxy:{type:"ajax",url:"./userManage.do?method=getAddrList",reader:{type:"json",root:"data"}},fields:[{name:"V_USER_NAME_VIEW",type:"string"},{name:"V_DEPT_NAME_VIEW",type:"string"},{name:"V_PST_NAME_VIEW",type:"string"},{name:"V_PHONE1_VIEW",type:"string"},{name:"V_PHONE2_VIEW",type:"string"},{name:"V_EMAIL_VIEW",type:"string"}]},a)])}});