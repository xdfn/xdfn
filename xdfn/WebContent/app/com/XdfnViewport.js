/**
 * File: app/com/XdfnViewport.js
 * Author: liusha.
 */

Ext.define('xdfn.com.XdfnViewport', {
    extend: 'xdfn.com.ui.XdfnViewport',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        
        Ext.require(['xdfn.ux.grid.Printer',
                     'Ext.ux.exporter.Exporter',
                     'Ext.ux.form.field.ComboBoxTree',
                     'xdfn.user.Rights'
        ]);
        
        //xdfn.ux.grid.Printer.printAutomatically = false;
        //xdfn.ux.grid.Printer.print(self.up('gridpanel'));
        Ext.util.Format.decimalSeparator = '.';
        Ext.util.Format.thousandSeparator = ',';
                
        //bind menu Event.
        me.down('#PersonPadTree').on('itemclick', me.onPersonPadItemClick, me);
        me.down('#InfoCenterTree').on('itemclick', me.onInfoCenterItemClick, me);
        me.down('#ProjectMgrTree').on('itemclick', me.onProjectMgrItemClick, me);
        me.down('#ServiceMgrTree').on('itemclick', me.onServiceMgrItemClick, me);
        me.down('#CustomerMgrTree').on('itemclick', me.onCustomerMgrItemClick, me);
        me.down('#SysMgrTree').on('itemclick', me.onSysMgrItemClick, me);

        me.tabPanel = Ext.getCmp('xdfnTabPanel');
        me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.person.PersonPad')));
        
        //create combox store.
        me.createAllStaticStore();
        
        //validation.
        Ext.apply(Ext.form.field.VTypes, {
            dateRange: function(value, field) {
            	var beginDate = null,
            	    beginDateCmp = null,
            	    endDate = null,
            	    endDateCmp = null,
            	    validStatus = true,
            	    parent = field.dateRange.parent;
            	if (field.dateRange) {
            		if (!Ext.isEmpty(field.dateRange.begin)) {
            			beginDateCmp = parent.down('datefield[name="' + field.dateRange.begin + '"]');
            			beginDate = beginDateCmp.getValue();
            		}
            		
            		if (!Ext.isEmpty(field.dateRange.end)) {
            			endDateCmp = parent.down('datefield[name="' + field.dateRange.end + '"]');
            			endDate = endDateCmp.getValue();
            		}
            	}
            	
            	if (!Ext.isEmpty(beginDate) && !Ext.isEmpty(endDate)) {
            		validStatus = beginDate <= endDate;
            	}
            	
            	return validStatus;
            },
            dateRangeText: '起始日期不能大于结束日期，请重新选择！'
        });
    },
    
    show: function(me, options) {
    	var me = this;
    	me.setWelcomeInfo();
        me.createClock();
        me.registerQuickTip();
    },
    
    createAllStaticStore: function() {

    	Ext.regModel('Combox', {
    	    fields: [
    	        {name: 'V_COMBOX_NAME_VIEW', type: 'string'},
    	        {name: 'V_COMBOX_VALUE_VIEW', type: 'string'}
    	    ]
    	});
    	
    	Ext.create('xdfn.com.store.DeptDutyTreeStore', {
    		storeId: 'DeptDutyTreeStore',
	    	proxy: {
                type: 'ajax',
                url: './deptManage.do?method=getList&node=root',
                reader: {
                    type: 'json'
                }
            }
    	});
    	
    	Ext.create('xdfn.com.store.ComboTreeStore', {
    		storeId: 'ZoneTreeStore',
            proxy: {
                type: 'ajax',
                url: 'data/zone.json',
                reader: {
                    type: 'json'
                }
            }
        });
        
        Ext.create('xdfn.com.store.ComboTreeStore', {
        	storeId: 'EmployeeTreeStore',
            proxy: {
                type: 'ajax',
                url: './deptManage.do?method=getInnerList&node=root',
                reader: {
                    type: 'json'
                }
            }
        });
        
        Ext.create('xdfn.com.store.ComboTreeStore', {
        	storeId: 'BansTreeStore',
            proxy: {
                type: 'ajax',
                url: './deptManage.do?method=getZwbList&node=root',
                reader: {
                    type: 'json'
                }
            }
        });
    	
        Ext.create('xdfn.com.store.CustListJsonStore', {
            id: 'ProjListJsonStore',
            proxy: {
            	type: 'ajax',
            	url: './projectMgr.do?method=getProjectCombox',
            	reader: {
            		type: 'json',
            		root: 'data'
            	}
            }
        });
        
        Ext.create('xdfn.com.store.CustListJsonStore', {
            id: 'ClientListJsonStore',
            proxy: {
            	type: 'ajax',
            	url: './cusManage.do?method=getCusListByTypeBelong&typeBelong=client',
            	reader: {
            		type: 'json',
            		root: 'data'
            	}
            }
        });
        
        Ext.create('xdfn.com.store.CustListJsonStore', {
            id: 'DesignListJsonStore',
            proxy: {
            	type: 'ajax',
            	url: './cusManage.do?method=getCusListByTypeBelong&typeBelong=design',
            	reader: {
            		type: 'json',
            		root: 'data'
            	}
            }
        });
        
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'ShiyouStore',
    	    data: [
    	        ['办公', '办公'],
    	        ['集团', '集团'],
    	        ['会议', '会议'],
    	        ['招待', '招待'],
    	        ['出差', '出差'],
    	        ['请假', '请假'],
    	        ['加班', '加班'],
    	        ['其他', '其他']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'ScheduleBelongStore',
    	    data: [
    	        ['项目', '项目'],
    	        ['售后服务', '售后服务'],
    	        ['回款', '回款'],
    	        ['其他', '其他']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'ScheduleLevelStore',
    	    data: [
    	        ['紧急', '紧急'],
    	        ['一般', '一般']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'ReportStore',
    	    data: [
    	        ['总经理', '总经理'],
    	        ['副总经理', '副总经理'],
    	        ['处级', '处级'],
    	        ['科级', '科级'],
    	        ['个人', '个人']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'FinishStore',
    	    data: [
    	        ['已完成', '已完成'],
    	        ['未完成', '未完成']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'CustomBelongStore',
    	    data: [
    	        ['风电场业主', '风电场业主'],
    	        ['设计院', '设计院'],
    	        ['供货商', '供货商'],
    	        ['政府机关', '政府机关'],
    	        ['研究和资讯机构', '研究和资讯机构'],
    	        ['电网公司', '电网公司'],
    	        ['竞争对手', '竞争对手'],
    	        ['其他', '其他']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'TradeTypeStore',
    	    data: [
    	        ['国有企业', '国有企业'],
    	        ['民营企业', '民营企业'],
    	        ['外资企业', '外资企业'],
    	        ['合资企业', '合资企业'],
    	        ['其他', '其他']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'CustomPhaseStore',
    	    data: [
    	        ['潜在客户', '潜在客户'],
    	        ['新客户', '新客户'],
    	        ['老客户', '老客户']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'CustomLevelStore',
    	    data: [
    	        ['信用等级A', '信用等级A'],
    	        ['信用等级B', '信用等级B'],
    	        ['信用等级C', '信用等级C'],
    	        ['信用等级D', '信用等级D'],
    	        ['信用等级E', '信用等级E']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'FaxTypeStore',
    	    data: [
    	        ['重要传真', '重要传真'],
    	        ['一般传真', '一般传真'],
    	        ['项目传真', '项目传真']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'RecLevelStore',
    	    data: [
    	        ['高级', '高级'],
    	        ['一般', '一般']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'ProjSourceStore',
    	    data: [
    	        ['本部', '本部'],
    	        ['驻外办', '驻外办']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'ProjTypeStore',
    	    data: [
    	        ['国内项目', '国内项目'],
    	        ['国外项目', '国外项目']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'ProjPhaseStore',
    	    data: [
    	        ['项目预报', '项目预报'],
    	        ['项目跟进', '项目跟进'],
    	        ['重点项目', '重点项目'],
    	        ['项目投标', '项目投标'],
    	        ['项目不投标', '项目不投标'],
    	        ['项目中标', '项目中标'],
    	        ['项目失标', '项目失标'],
    	        ['合同管理', '合同管理'],
    	        ['合同执行', '合同执行'],
    	        ['合同废除', '合同废除'],
    	        ['过240', '过240'],
    	        ['质保期', '质保期'],
    	        ['已过质保期', '已过质保期']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'ProjReviewStore',
    	    data: [
    	        ['风资源评估', '风资源评估'],
    	        ['预可行性研究', '预可行性研究'],
    	        ['可行性研究', '可行性研究'],
    	        ['项目立项', '项目立项'],
    	        ['项目核准', '项目核准']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'WindTypeStore',
    	    data: [
    	        ['陆地平原', '陆地平原'],
    	        ['陆地山地', '陆地山地'],
    	        ['陆地高原', '陆地高原'],
    	        ['潮间带', '潮间带'],
    	        ['浅海', '浅海'],
    	        ['近海', '近海']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'ServiceStatusStore',
    	    data: [
    	        ['未处理', '未处理'],
    	        ['处理中', '处理中'],
    	        ['已处理', '已处理'],
    	        ['需领导协调解决', '需领导协调解决'],
    	        ['无法解决', '无法解决']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'ProjFollowTypeStore',
    	    data: [
    	        ['商务交流', '商务交流'],
    	        ['技术交流', '技术交流'],
    	        ['项目策划', '项目策划'],
    	        ['中标总结', '中标总结'],
    	        ['失标总结', '失标总结'],
    	        ['不投标总结', '不投标总结'],
    	        ['其他', '其他']
    	    ]
    	});
    	
    	new Ext.data.ArrayStore({
    	    model: 'Combox',
    	    storeId: 'FilesTypeStore',
    	    data: [
    	        ['技术文档', '技术文档'],
    	        ['技术图纸', '技术图纸'],
    	        ['其他', '其他']
    	    ]
    	});
    	
    },
    
    /**
     * register quick tip.
     */
    registerQuickTip: function() {
    	//register QuickTip.
        Ext.tip.QuickTipManager.register({
            target: Ext.get('DatetimeView'),
            text: Ext.Date.format(new Date(), '公元Y年n月j日')
        });
    },
    
    /**
     * set welcome information.
     */
    setWelcomeInfo: function() {
    	var me = this;
    	
    	var today = new Date();
    	
    	var h = today.getHours();
    	
    	if (h > 6 && h < 8) {
    		me.welcome = '早上好，' + me.welcome;
    	}
    	else if (h >= 8 && h < 12) {
    		me.welcome = '上午好，' + me.welcome;
    	}
    	else if (h >= 12 && h < 19) {
    		me.welcome = '下午好，' + me.welcome;
    	}
    	else {
    		me.welcome = '晚上好，' + me.welcome;
    	}
    	
    	Ext.fly('WelcomeId').dom.innerHTML = me.welcome;
    	
        var helpImg = Ext.create('Ext.Img', {
             src: 'resources/images/menu_sys_help_gray.png',
             renderTo: Ext.fly('HelpId')
        });
        
        Ext.fly('HelpId').on({
            'mouseover': {
            	fn: function() {
            		helpImg.setSrc('resources/images/menu_sys_help.png');
            	}
            },
            'mouseout': {
            	fn: function() {
            		helpImg.setSrc('resources/images/menu_sys_help_gray.png');
            	}
            },
            'click': {
            	fn: function() {
            		var aboutWin = Ext.create('xdfn.com.AboutWindow');
            		aboutWin.show();
            	}
            },
            scope: this
        });
        
        var exitImg = Ext.create('Ext.Img', {
             src: 'resources/images/menu_sys_exit_gray.png',
             renderTo: Ext.fly('ExitSysId')
        });
        
        Ext.fly('ExitSysId').on({
            'mouseover': {
            	fn: function() {
            		exitImg.setSrc('resources/images/menu_sys_exit.png');
            	}
            },
            'mouseout': {
            	fn: function() {
            		exitImg.setSrc('resources/images/menu_sys_exit_gray.png');
            	}
            },
            'click': {
            	fn: function() {
            		Ext.MessageBox.confirm('提示', '确定退出系统吗？', function(id) {
            			if (id == 'yes') {
            				//注销用户登录信息
            				Ext.Ajax.request({
					    	    url: './login.do?method=logout',
					    	    success: function(response, options) {
					    	    	var result = Ext.JSON.decode(response.responseText);
					    	    	if (result.IS_LOGOUT) {
					    	    	    location.href = './';
					    	    	} else {
					    	    		Ext.MessageBox.alert('提示', '注销失败，请重试！');
					    	    	}
					    	    },
					    	    failure: function(response, options) {
					    	    	Ext.Msg.alert('提示', '无法访问！');
					    	    }
					    	});
            				
            			}
            		});
            	}
            },
            scope: this
        });
        
        Ext.fly('DateId').dom.innerHTML = Ext.Date.format(new Date(), 'm/d');
    	Ext.fly('WeekId').dom.innerHTML = me.getDayOfWeek();
    },
    
    /**
     * create clock.
     */
    createClock: function() {
    	var task = {
    		run: function() {
    			Ext.fly('TimeId').dom.innerHTML = Ext.Date.format(new Date(), 'G:i:s');
    		},
    		interval: 1000
    	};
    	
    	var clock = new Ext.util.TaskRunner();
    	clock.start(task);
    },
    
    /**
     * 
     * @return {}
     */
    getDayOfWeek: function() {
    	var w = '', d = new Date();
    	switch (d.getDay()) {
    		case 0:
    		    w = '周日';
    		    break;
    		case 1:
    		    w = '周一';
    		    break;
    		case 2:
    		    w = '周二';
    		    break;
    		case 3:
    		    w = '周三';
    		    break;
    		case 4:
    		    w = '周四';
    		    break;
    		case 5:
    		    w = '周五';
    		    break;
    		case 6:
    		    w = '周六';
    		    break;    
    	}
    	return w;
    },
    
    /**
     * 
     * @param {} view
     * @param {} record
     * @param {} item
     * @param {} index
     * @param {} e
     * @param {} options
     */
    onPersonPadItemClick: function(view, record, item, index, e, options) {
    	var me = this;
    	switch (index) {
    		case 0:
    		    var currentTab = Ext.getCmp('PersonPad');
    		    me.tabPanel.setActiveTab(currentTab);
    		    break;
    		case 1:
    		    xdfn.user.Rights.hasRights('GRPT-GRXX-1', function() {
    	        	var currentTab = Ext.getCmp('PersonInfo');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.person.PersonInfo')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 2:
    		    xdfn.user.Rights.hasRights('GRPT-GRRC-1', function() {
	    		    var currentTab = Ext.getCmp('PersonSchedule');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.person.PersonSchedule')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    		    });
    		    break;
    		case 3:
    		    xdfn.user.Rights.hasRights('GRPT-TXL-1', function() {
	    		    var currentTab = Ext.getCmp('PersonAddress');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.person.PersonAddress')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    		    });
    		    break;
    	}
    },
    
    /**
     * 
     * @param {} view
     * @param {} record
     * @param {} item
     * @param {} index
     * @param {} e
     * @param {} options
     */
    onInfoCenterItemClick: function(view, record, item, index, e, options) {
    	var me = this;
    	switch (index) {
    		case 0:
    	        xdfn.user.Rights.hasRights('XXZX-GGL-1', function() {
    	        	var currentTab = Ext.getCmp('Bulletin');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.info.Bulletin')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 1:
    	        xdfn.user.Rights.hasRights('XXZX-ZXZX-1', function() {
    	        	var currentTab = Ext.getCmp('News');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.info.News')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 2:
    	        xdfn.user.Rights.hasRights('XXZX-ZSK-1', function() {
    	        	var currentTab = Ext.getCmp('InfoKnowledge');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.info.InfoKnowledge')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 3:
    	        xdfn.user.Rights.hasRights('XXZX-BBS-1', function() {
    	        	var currentTab = Ext.getCmp('InfoBBS');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.info.InfoBBS')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    	}
    },
    
    /**
     * 
     * @param {} view
     * @param {} record
     * @param {} item
     * @param {} index
     * @param {} e
     * @param {} options
     */
    onProjectMgrItemClick: function(view, record, item, index, e, options) {
    	var me = this;
    	switch (index) {
    		case 0:
    	        xdfn.user.Rights.hasRights('XMGL-XMZL-1', function() {
    	        	var currentTab = Ext.getCmp('Projects');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.project.Projects')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 1:
    	        xdfn.user.Rights.hasRights('XMGL-XMSH-1', function() {
    	        	var currentTab = Ext.getCmp('ProjReview');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.project.ProjReview')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 2:
    	        xdfn.user.Rights.hasRights('XMGL-HTGL-1', function() {
    	        	var currentTab = Ext.getCmp('Contract');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.project.Contract')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 3:
    	        xdfn.user.Rights.hasRights('XMGL-HKGL-1', function() {
    	        	var currentTab = Ext.getCmp('ProjMoney');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.project.ProjMoney')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 4:
    	        xdfn.user.Rights.hasRights('XMGL-ZXGL-1', function() {
    	        	var currentTab = Ext.getCmp('ProjExec');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.project.ProjExec')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 5:
    	        xdfn.user.Rights.hasRights('XMGL-XMTJ-1', function() {
    	        	var currentTab = Ext.getCmp('ProjStatistics');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.project.ProjStatistics')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    	}
    },
    
    onServiceMgrItemClick: function(view, record, item, index, e, options) {
    	var me = this;
    	switch (index) {
    		case 0:
    	        xdfn.user.Rights.hasRights('FWGL-FWJL-1', function() {
    	        	var currentTab = Ext.getCmp('Service');  
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.service.Service')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 1:
    	        xdfn.user.Rights.hasRights('XTGL-CZGG-1', function() {
    	        	var currentTab = Ext.getCmp('FaxInfo');
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.fax.FaxInfo')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    	}
    },
    
    onCustomerMgrItemClick: function(view, record, item, index, e, options) {
    	var me = this;
    	switch (index) {
    		case 0:
    	        xdfn.user.Rights.hasRights('KHGL-KHXX-1', function() {
    	        	var currentTab = Ext.getCmp('CustomInfo');  
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.customer.CustomInfo')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 1:
    	        xdfn.user.Rights.hasRights('KHGL-KHJD-1', function() {
    	        	var currentTab = Ext.getCmp('CustomReceive');  
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.customer.CustomReceive')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    	}
    },
    
    onSysMgrItemClick: function(view, record, item, index, e, options) {
    	var me = this;
    	switch (index) {
    		case 0:
    	        xdfn.user.Rights.hasRights('XTGL-YGGL-1', function() {
    	        	var currentTab = Ext.getCmp('EmployeeManager');  
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.user.EmployeeManager')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 1:
    	        xdfn.user.Rights.hasRights('XTGL-QXGL-1', function() {
    	        	var currentTab = Ext.getCmp('RightsManager');  
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.user.RightsManager')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 2:
    	        xdfn.user.Rights.hasRights('XTGL-FBGG-1', function() {
    	        	var currentTab = Ext.getCmp('InfoBulletin');  
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.info.InfoBulletin')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    		case 3:
    	        xdfn.user.Rights.hasRights('XTGL-FBZX-1', function() {
    	        	var currentTab = Ext.getCmp('InfoNews');  
	    		    if (currentTab == undefined) {
	    		    	me.tabPanel.setActiveTab(me.tabPanel.add(Ext.create('xdfn.info.InfoNews')));
	    		    } else {
	    		    	me.tabPanel.setActiveTab(currentTab);
	    		    }
    	        });
    		    break;
    	}
    	
    }
});