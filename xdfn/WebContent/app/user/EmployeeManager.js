/**
 * File: app/user/EmployeeManager.js
 * Author: liusha
 */
 
Ext.define('xdfn.user.EmployeeManager', {
    extend: 'xdfn.user.ui.EmployeeManager',

    initComponent: function() {
        var me = this;

        me.empStore = Ext.create('xdfn.user.store.EmployeeJsonStore');
        me.familyStore = Ext.create('xdfn.user.store.FamilyJsonStore');
        me.deptStore = Ext.create('xdfn.com.store.DeptDutyTreeStore', {
	    	proxy: {
                type: 'ajax',
                url: './deptManage.do?method=getList&node=root',
                reader: {
                    type: 'json'
                }
            }
    	});
        
        me.callParent(arguments);
        
        me.down('treepanel').on('load', me.OnTreePanelLoad, me);
        me.down('button[text="增加员工"]').on('click', me.OnAddEmployeeBtnClick, me);
        me.down('button[text="修改员工"]').on('click', me.OnModifyEmployeeBtnClick, me);
        me.down('button[text="删除员工"]').on('click', me.OnDeleteEmployeeBtnClick, me);
        me.down('button[text="增加家属"]').on('click', me.OnAddFamilyBtnClick, me);
        me.down('button[text="修改家属"]').on('click', me.OnModifyFamilyBtnClick, me);
        me.down('button[text="删除家属"]').on('click', me.OnDeleteFamilyBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="增加"]').on('click', me.OnAddDeptDutyBtnClick, me);
        me.down('button[text="修改"]').on('click', me.OnModifyDeptDutyBtnClick, me);
        me.down('button[text="删除"]').on('click', me.OnDeleteDeptDutyBtnClick, me);
        me.down('button[text="重置密码"]').on('click', me.OnResetPasswordBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportEmployeeBtnClick, me);
        me.down('button[text="导出家属 "]').on('click', me.OnExportFamilyBtnClick, me);
        me.down('gridpanel').on('select', me.OnEmployeeGridSelect, me);
        me.down('treepanel').on('select', me.OnDeptDutyTreeSelect, me);
        me.empStore.on('load', me.OnEmployeeStoreLoad, me);
    },
    
    OnEmployeeStoreLoad: function(store, records, successful, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.familyStore.getProxy(), {
    	    extraParams:{}
    	});
    	me.familyStore.loadRawData([]);
    },
    
    OnAddEmployeeBtnClick: function(self, e, options) {
    	var me = this;
    	xdfn.user.Rights.hasRights('XTGL-YGGL-5', function() {
	    	Ext.create('xdfn.user.EmployeeWindow', {
	    		url: 'userManage.do?method=add',
	    	    grid: self.up('gridpanel')
	    	}).show();
    	});
    },
    
    OnModifyEmployeeBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-YGGL-6', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.user.EmployeeWindow', {
	    	        title: '修改员工',
	    	        url: 'userManage.do?method=modify',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: 'userManage.do?method=findById',
	                params: {
	                	ID: rows[0].get('ID_VIEW')
	                },
	                method: 'get',
	                success: function(form, action) {
	            	    wForm.show();
	                },
	                failure: function(form, action) {
	            	    wForm.destroy();
	            	    Ext.Msg.alert('提示','无法修改！');
	                }
	            });
	    	} else {
	    		Ext.Msg.alert('提示','请选择要修改的员工！');
	    	}
    	});
    },
    
    OnDeleteEmployeeBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-YGGL-7', function() {    
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该员工吗？', function(id) {
	            	if (id == 'yes') {
	            		Ext.Ajax.request({
				    	    url: 'userManage.do?method=delete',
				    	    method: 'get',
				    	    params: {
				    	    	ID: rows[0].get('ID_VIEW')
				    	    },
				    	    success: function(response, opts) {
				    	    	var i = store.indexOf(rows[0]);
				    	    	    
				    	    	store.remove(rows);
				    	    	
				    	    	var count = store.getCount();
				    	    	
				    	    	if (count > 0) {
				    	    		sm.select((i == count)? --i : i);
				    	    	} else {
				    	    		store.fireEvent('load', store);
				    	    	}
							},
							failure: function(response, opts) {
								Ext.Msg.alert('提示','删除失败！');
							}
				    	});
	                }
	            });
	    	} else {
	    		Ext.Msg.alert('提示','请选择要删除的员工！');
	    	}
    	});
    },
    
    OnResetPasswordBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-YGGL-8', function() {    
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定重置该帐号密码吗？', function(id) {
            		if (id == 'yes') {
			    	    Ext.Ajax.request({
				    	    url: 'userManage.do?method=resetPwd',
				    	    method: 'get',
				    	    params: {
				    	    	ID: rows[0].get('ID_VIEW')
				    	    },
				    	    success: function(response, opts) {
				    	    	Ext.Msg.alert('提示','重置密码成功！');
							},
							failure: function(response, opts) {
								Ext.Msg.alert('提示','重置密码失败！');
							}
				    	});
		    	    }
            	});
	    	} else {
	    		Ext.Msg.alert('提示','请选择要重置密码的员工！');
	    	}
    	});
    },
    
    OnAddFamilyBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = me.down('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-YGGL-10', function() {    
	    	if (rows.length > 0) {
	    		Ext.create('xdfn.user.FamilyWindow', {
	    			url: 'userManage.do?method=addFamily',
	    		    grid: self.up('gridpanel'),
	    		    ID: rows[0].get('V_USER_FK_VIEW')
	    		}).show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的员工！');
	    	}
    	});
    },
    
    OnModifyFamilyBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-YGGL-11', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.user.FamilyWindow', {
	    	        title: '修改家属',
	    	        url: 'userManage.do?method=modifyFamily',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: 'userManage.do?method=findFamilyById',//'userManage.do?method=findFamilyById',
	                params: {
	                	ID: rows[0].get('ID_VIEW')
	                },
	                method: 'get',
	                success: function(form, action) {
	            	    wForm.show();
	                },
	                failure: function(form, action) {
	            	    wForm.destroy();
	            	    Ext.Msg.alert('提示','无法修改！');
	                }
	            });
	    	} else {
	    		Ext.Msg.alert('提示','请选择要修改的家属！');
	    	}
    	});
    },
    
    OnDeleteFamilyBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-YGGL-12', function() {    
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该家属吗？', function(id) {
	            	if (id == 'yes') {
	            		Ext.Ajax.request({
				    	    url: 'userManage.do?method=deleteFamily',
				    	    method: 'get',
				    	    params: {
				    	    	ID: rows[0].get('ID_VIEW')
				    	    },
				    	    success: function(response, opts) {
				    	    	var i = store.indexOf(rows[0]);
				    	    	    
				    	    	store.remove(rows);
				    	    	
				    	    	var count = store.getCount();
				    	    	
				    	    	if (count > 0) {
				    	    		sm.select((i == count)? --i : i);
				    	    	}
							},
							failure: function(response, opts) {
								Ext.Msg.alert('提示','删除失败！');
							}
				    	});
	                }
	            });
	    	} else {
	    		Ext.Msg.alert('提示','请选择要删除的家属！');
	    	}
    	});
    },
    
    OnAddDeptDutyBtnClick: function(self, e, options) {
    	var me = this,
    	    tree = me.down('treepanel'),
    	    sm = tree.getSelectionModel(),
    	    nodes = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-YGGL-2', function() {    
	    	if (nodes.length > 0) {
	    		if (nodes[0].get('N_NODE_TYPE_VIEW') == 2) {
	    			Ext.Msg.alert('提示','不能在职务节点上增加！');
	    			return;
	    		}
	    		
	    		Ext.create('xdfn.user.DeptDutyWindow', {
	    			url: 'deptManage.do?method=add',
	    		    selectNode: nodes[0],
	    		    deptree: tree
	    		}).show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的节点！');
	    	}
    	});
    },
    
    OnModifyDeptDutyBtnClick: function(self, e, options) {
    	var me = this,
    	    tree = me.down('treepanel'),
    	    sm = tree.getSelectionModel(),
    	    nodes = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-YGGL-3', function() {
	    	if (nodes.length > 0) {
	    		var wForm = Ext.create('xdfn.user.DeptDutyWindow', {
	    	        title: '修改部门或职务',
	    	        url: 'deptManage.do?method=modify',
	    	        selectNode: nodes[0],
	    		    deptree: tree
	    	    });
	    	    
	    	    var nodeType = '部门';
	    	    switch (nodes[0].get('N_NODE_TYPE_VIEW')) {
	    	    	case 1:
	    	    	   nodeType = '部门';
	    	    	   break;
	    	        case 2:
	    	           nodeType = '职务';
	    	    	   break;
	    	        case 3:
	    	           nodeType = '岗位';
	    	    	   break;
	    	    }
	    	    var type = Ext.ModelManager.create({
				    V_COMBOX_NAME_VIEW: nodeType,
				    V_COMBOX_VALUE_VIEW: nodes[0].get('N_NODE_TYPE_VIEW')
				}, 'Combox');
	    	    wForm.down('combobox[name="N_NODE_TYPE"]').setValue(type);
	    	    wForm.down('textfield[name="V_NODE_NAME"]').setValue(nodes[0].get('V_NODE_NAME_VIEW'));
	    	    wForm.show();
	    	    
	    	} else {
	    		Ext.Msg.alert('提示','请选择要修改的部门或职务！');
	    	}
    	});
    },
    
    OnDeleteDeptDutyBtnClick: function(self, e, options) {
    	var me = this,
    	    tree = me.down('treepanel'),
    	    sm = tree.getSelectionModel(),
    	    nodes = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XTGL-YGGL-4', function() {
	    	if (nodes.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该部门或职务吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除部门或职务
		    			Ext.Ajax.request({
				    	    url: 'deptManage.do?method=delete',
				    	    method: 'get',
				    	    params: {
				    	    	ID: nodes[0].get('ID_VIEW')
				    	    },
				    	    success: function(response, opts) {
							    tree.getStore().load();
							},
							failure: function(response, opts) {
								Ext.Msg.alert('提示','删除失败！');
							}
				    	});
	                }
	            });
	    	} else {
	    		Ext.Msg.alert('提示','请选择要删除的部门或职务！');
	    	}
    	});
    },
        
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	Ext.apply(me.empStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.empStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {
    	self.up('form').getForm().reset();
    },
    
    OnTreePanelLoad: function(store, records, successful, options ) {
    	var me = this;
    	me.down('treepanel').expandAll();
    },
    
    OnEmployeeGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
    	Ext.apply(me.familyStore.getProxy(), {
    	    extraParams:{
    	        V_USER_FK: record.get('V_USER_FK_VIEW')
    	    }
    	});
    	me.familyStore.loadPage(1);
    },
    
    OnDeptDutyTreeSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	    	
    	if (record.get('N_NODE_TYPE_VIEW') == 2) {
    		Ext.apply(me.empStore.getProxy(), {
	    	    extraParams:{
	    	        V_PST_ID: record.get('ID_VIEW')
	    	    }
	    	});
    	} else {
    		Ext.apply(me.empStore.getProxy(), {
	    	    extraParams:{
	    	        V_DEPT_ID: record.get('ID_VIEW')
	    	    }
	    	});
    	}
    	me.empStore.loadPage(1);
    },
    
    OnExportEmployeeBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XTGL-YGGL-9', function() {
    		me.empStore.load({
       	    	limit: me.empStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '员工信息表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    },
    
    OnExportFamilyBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XTGL-YGGL-13', function() {
    		me.familyStore.load({
       	    	limit: me.familyStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '员工家属信息表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});