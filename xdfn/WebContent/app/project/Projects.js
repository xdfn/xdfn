/**
 * File: app/project/Projects.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.Projects', {
    extend: 'xdfn.project.ui.Projects',

    initComponent: function() {
        var me = this;

        if (me.ID) {
        	me.projStore = Ext.create('xdfn.project.store.ProjectsJsonStore', {
        		proxy: {
	                type: 'ajax',
	                url: './projectMgr.do?method=getProjectList',
	                reader: {
	                    type: 'json',
	                    root: 'data'
	                },
	                extraParams:{
		    	        ID: me.ID
		    	    }
	            }
            });
        } else {
        	me.projStore = Ext.create('xdfn.project.store.ProjectsJsonStore');
        }
        
        me.callParent(arguments);
        
        me.tabPanel = me.down('tabpanel');
    	me.grid = me.down('gridpanel');
    	
    	me.applyTab = me.tabPanel.add(Ext.create('xdfn.project.ProjApply', {
            grid: me.grid
        }));
        
    	me.followTab = me.tabPanel.add(Ext.create('xdfn.project.ProjFollow', {
            grid: me.grid
        }));
        
        me.filesTab = me.tabPanel.add(Ext.create('xdfn.project.ProjFiles', {
            grid: me.grid
        }));
        
        me.tabPanel.setActiveTab(me.applyTab);
        
        me.subStore = new Ext.util.MixedCollection();
        me.subStore.add('ProjApplyJsonStore', me.applyTab.applyStore);
        me.subStore.add('ProjFollowJsonStore', me.followTab.followStore);
        me.subStore.add('ProjFilesJsonStore', me.filesTab.filesStore);
        
        me.down('button[text="预报项目"]').on('click', me.OnAddPreProjectBtnClick, me);
        me.down('button[text="修改项目"]').on('click', me.OnModifyProjectBtnClick, me);
        me.down('button[text="删除项目"]').on('click', me.OnDeleteProjectBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportProjectBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('gridpanel').on('select', me.OnProjectGridSelect, me);
        me.down('gridpanel').on('itemdblclick', me.OnProjectGridItemDbClick, me);
        me.projStore.on('load', me.OnProjectStoreLoad, me);
    },
    
    OnProjectStoreLoad: function(store, records, successful, eOpts) {
    	var me = this;
    	
    	me.subStore.each(function(item) {
    		Ext.apply(item.getProxy(), {
	    	    extraParams:{}
	    	});
	    	item.loadRawData([]);
    	});
    },
    
    OnAddPreProjectBtnClick: function(self, e, options) {
    	var me = this;
    	xdfn.user.Rights.hasRights('XMGL-XMZL-2', function() {
	    	Ext.create('xdfn.project.ProjectWindow', {
	    		url: './projectMgr.do?method=addProject',
	    	    grid: self.up('gridpanel')
	    	}).show();
    	});
    },
    
    OnProjectGridItemDbClick: function (view, record, item, index, e, eOpts) {
    	var me = this;
    	
		var wForm = Ext.create('xdfn.project.ProjectWindow', {
	        title: '查看项目',
	        enableSubmit: false
	    });
	    wForm.down('form').getForm().load({
            url: './projectMgr.do?method=findProById',
            params: {
            	ID: record.get('ID_VIEW')
            },
            method: 'get',
            success: function(form, action) {
        	    wForm.show();
            },
            failure: function(form, action) {
        	    wForm.destroy();
        	    Ext.Msg.alert('提示','查看项目！');
            }
        });
    },
    
    OnModifyProjectBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-3', function() {    
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.project.ProjectWindow', {
	    	        title: '修改项目',
	    	        url: './projectMgr.do?method=modifyProject',
	    	        grid: grid,
	    	        ID: rows[0].get('ID_VIEW')
	    	    });
	    	    wForm.down('form').getForm().load({
	                url: './projectMgr.do?method=findProById',
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
	    		Ext.Msg.alert('提示','请选择要修改的项目！');
	    	}
    	});
    },
    
    OnDeleteProjectBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-4', function() {
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该项目吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除项目
		    			Ext.Ajax.request({
				    	    url: './projectMgr.do?method=deleteProject',
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
	    		Ext.Msg.alert('提示','请选择要删除的项目！');
	    	}
    	});
    },
    
    OnExportProjectBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-XMZL-5', function() {
    		me.projStore.load({
       	    	limit: me.projStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '项目信息表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    },
        
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	/*form.submit({
    	    waitMsg : '正在查询...',
			waitTitle : '提示',
    	    url: './app/data/grid_projects.json',
    	    success : function(form, action) {
    	    	me.projStore.loadData(action.result.data);
				me.projStore.fireEvent('load');
			},
			failure : function(form, action) {
				me.projStore.loadData([]);
				me.projStore.fireEvent('load');
				Ext.Msg.alert('提示','没有符合条件的查询结果！');
			}
    	});*/
    	Ext.apply(me.projStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.projStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {
    	self.up('form').getForm().reset();
    },
    
    OnProjectGridSelect: function(rowModel, record, index, eOpts) {
    	var me = this;
    	
    	switch (record.get('V_PRO_PHASE_VIEW')) {
    		case '项目投标':
    		case '项目中标':
    		case '项目失标':
    		case '合同管理':
    		case '合同执行':
    		case '合同废除':
    		case '过240':
    		case '质保期':
    		case '已过质保期':
    		    if (!me.bookTab) {
    		    	me.bookTab = me.tabPanel.add(Ext.create('xdfn.project.ProjBook', {
			            grid: me.grid
			        }));
			        me.subStore.add('ProjBookJsonStore', me.bookTab.bookStore);
    		    }
    		    if (!me.prodTab) {
    		    	me.prodTab = me.tabPanel.add(Ext.create('xdfn.project.ProjProduct', {
			            grid: me.grid
			        }));
			        me.subStore.add('ProjProductJsonStore', me.prodTab.prodStore);
    		    }
    		    if (!me.openTab) {
    		    	me.openTab = me.tabPanel.add(Ext.create('xdfn.project.ProjOpen', {
			            grid: me.grid
			        }));
			        me.subStore.add('ProjOpenJsonStore', me.openTab.openStore);
    		    }
    		    if (!me.standTab) {
    		    	me.standTab = me.tabPanel.add(Ext.create('xdfn.project.ProjStanding', {
			            grid: me.grid
			        }));
			        me.subStore.add('ProjStandingJsonStore', me.standTab.standStore);
    		    }
    		    break;
    		case '项目预报':
    		case '项目跟进':
    		case '重点项目':
    		case '项目不投标':
    		    if (me.prodTab) {me.prodTab.close(); me.prodTab = null; me.subStore.removeAtKey('ProjProductJsonStore');}
    		    if (me.openTab) {me.openTab.close(); me.openTab = null; me.subStore.removeAtKey('ProjOpenJsonStore');}
    		    if (me.bookTab) {me.bookTab.close(); me.bookTab = null; me.subStore.removeAtKey('ProjBookJsonStore');}
    		    if (me.standTab) {me.standTab.close(); me.standTab = null; me.subStore.removeAtKey('ProjStandingJsonStore');}
    		    break;
    	}
    	
    	me.subStore.each(function(item) {
    		Ext.apply(item.getProxy(), {
	    	    extraParams:{
	    	        ID: record.get('ID_VIEW')
	    	    }
	    	});
	    	item.loadPage(1);
    	});
    }
});