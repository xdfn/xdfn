/**
 * File: app/user/store/EmployeeJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.user.store.EmployeeJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'userManage.do?method=getList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {
                    name: 'ID_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_USER_FK_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_USER_ACC_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_USER_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'C_GENDER_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_IDCARD_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_BIRTHDAY_VIEW',
                    type: 'date'
                },
                {
                    name: 'V_DEPT_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PST_NAME_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PHONE1_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PHONE2_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_EMAIL_VIEW',
                    type: 'string'
                },
                {
                    name: 'D_ENTRY_DATE_VIEW',
                    type: 'date'
                },
                {
                    name: 'D_EXP_DATE_VIEW',
                    type: 'date'
                },
                {
                    name: 'V_HOME_ADDR_VIEW',
                    type: 'string'
                },
                {
                    name: 'V_PHOTO_URL_VIEW',
                    type: 'string'
                }
            ]
        }, cfg)]);
    }
});