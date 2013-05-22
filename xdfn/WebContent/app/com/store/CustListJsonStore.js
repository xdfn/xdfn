/**
 * File: app/com/store/CustListJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.com.store.CustListJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            model: 'Combox'
        }, cfg)]);
    }
});