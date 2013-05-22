/**
 * File: app/person/PersonPad.js
 * Author: liusha
 */
 
Ext.define('xdfn.person.PersonPad', {
    extend: 'xdfn.person.ui.PersonPad',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        me.down('menu').on('click', me.OnMenuClick, me);
    },
    
    OnMenuClick: function(menu, item, e, eOpts) {
    	var me = this;
    	switch(item.text) {
    		case '万年历':
    		    if (!item.checked) {
    		    	me.down('#wnl').close();
    		    } else {
    		    	me.down('#PortalCol3').insert(0, Ext.create('xdfn.person.pad.Wnl'));
    		    	me.down('#wnl').show();
    		    }
    		    break;
    		case '公告栏':
    		    if (!item.checked) {
    		    	me.down('#bulletin').close();
    		    } else {
    		    	me.down('#PortalCol1').insert(0, Ext.create('xdfn.person.pad.Bulletin'));
    		    	me.down('#bulletin').show();
    		    }
    		    break;
    		case '待办日程':
    		    if (!item.checked) {
    		    	me.down('#daiban').close();
    		    } else {
    		    	me.down('#PortalCol2').insert(0, Ext.create('xdfn.person.pad.Daiban'));
    		    	me.down('#daiban').show();
    		    }
    		    break;
    		case '最新资讯':
    		    if (!item.checked) {
    		    	me.down('#news').close();
    		    } else {
    		    	me.down('#PortalCol1').insert(1, Ext.create('xdfn.person.pad.News'));
    		    	me.down('#news').show();
    		    }
    		    break;
    		case '最近项目':
    		    if (!item.checked) {
    		    	me.down('#projs').close();
    		    } else {
    		    	me.down('#PortalCol2').insert(1, Ext.create('xdfn.person.pad.Projects'));
    		    	me.down('#projs').show();
    		    }
    		    break;
    	}
    }
});