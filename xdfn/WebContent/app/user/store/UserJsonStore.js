/**
 * File: app/user/store/UserJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.user.store.UserJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './userManage.do?method=getAddrList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {
                    name: 'V_USER_FK_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_USER_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_USER_ACC_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_DEPT_NAME_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});