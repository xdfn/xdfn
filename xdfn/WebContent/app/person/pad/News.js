/**
 * File: app/person/pad/News.js
 * Author: liusha
 */
 
Ext.define('xdfn.person.pad.News', {
    extend: 'Ext.ux.portal.Portlet',

    id: 'news',
    title: '最新资讯',
    height: 268,
    bodyPadding: '5 0 2 5',
    tpl: new Ext.XTemplate(
        '<ul class="news-line">',
        '<tpl for=".">',
        '<li><a href="infoPub.do?method=newsById&ID={ID_VIEW}" target="_blank">{V_TITLE_VIEW}</a></li>',
        '</tpl>',
        '</ul>'
    ),
    loader: {
    	autoLoad: true,
    	url: 'infoPub.do?method=getNewsList',
    	renderer: 'data',
    	success: function(loader, response, options) {
            var result = Ext.JSON.decode(response.responseText);
            loader.getTarget().update(result.data);
            return true;
        }
    },
    listeners: {
    	'destroy': function(self, eOpts) {
    		Ext.getCmp('PersonPad').down('menucheckitem[text="最新资讯"]').setChecked(false);
    	}
    },
    
    getTools: function(){
    	var me = this;
        return [{
            xtype: 'tool',
            type: 'refresh',
            handler: function(e, target, panelHeader, tool){
                var portlet = panelHeader.ownerCt;
                portlet.setLoading('Loading...');
                Ext.defer(function() {
                	me.getLoader().load();
                    portlet.setLoading(false);
                }, 500);
            }
        }];
    },
    
    initComponent: function() {
        var me = this;
        me.tools = me.getTools();
        me.callParent(arguments);
    }
});