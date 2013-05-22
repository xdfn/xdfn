/**
 * File: app/person/pad/Projects.js
 * Author: liusha
 */
 
Ext.define('xdfn.person.pad.Projects', {
    extend: 'Ext.ux.portal.Portlet',

    id: 'projs',
    layout: {
        type: 'fit'
    },
    title: '最近项目',
    height: 220,
    listeners: {
    	'destroy': function(self, eOpts) {
    		Ext.getCmp('PersonPad').down('menucheckitem[text="最近项目"]').setChecked(false);
    	}
    },
    
    getTools: function(){
    	var me = this;
        return [{
            xtype: 'tool',
            type: 'refresh',
            handler: function(e, target, panelHeader, tool){
                //var portlet = panelHeader.ownerCt;
                //portlet.setLoading('Loading...');
                me.projStore.load();
            }
        }];
    },
    
    initComponent: function() {
        var me = this;
        
        me.projStore = Ext.create('xdfn.project.store.ProjectsJsonStore', {
        	autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=getProjectList', //显示最近三个月内和自己关联的项目，按时间排序
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });
        
        me.tools = me.getTools();
        me.items = [
           {
                xtype: 'gridpanel',
                forceFit: true,
                store: me.projStore,
                flex: 1,
                border: false,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'ID_VIEW',
                        text: 'ID',
                        hidden: true,
                        hideable: false
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PRO_NO_VIEW',
                        text: '项目编号'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PRO_NAME_VIEW',
                        text: '项目名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_PRO_PHASE_VIEW',
                        text: '项目所处阶段'
                    }
                ],
                viewConfig: {

                },
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: me.projStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
        
        me.down('gridpanel').on('itemdblclick', me.OnGridItemDbClick, me);
    },
    
    OnGridItemDbClick: function(view, record, item, index, e, eOpts) {
    	var me = this,
    	    tabPanel = me.up('tabpanel'),
    	    currentTab = Ext.getCmp('Projects');
	    if (currentTab == undefined) {
	    	tabPanel.setActiveTab(tabPanel.add(Ext.create('xdfn.project.Projects', {ID: record.get('ID_VIEW')})));
	    } else {
	    	tabPanel.setActiveTab(currentTab);
	    	var store = currentTab.down('gridpanel').getStore();
	    	Ext.apply(store.getProxy(), {
	    	    extraParams:{
	    	        ID: record.get('ID_VIEW')
	    	    }
	    	});
	    	store.load();
	    }
    }
});