/**
 * File: app/info/ui/InfoKnowledge.js
 * Author: liusha
 */

Ext.define('xdfn.info.ui.InfoKnowledge', {
    extend: 'Ext.panel.Panel',

    id: 'InfoKnowledge',
    closable: true,
    iconCls: 'info_tabs',
    title: '知识库',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
});