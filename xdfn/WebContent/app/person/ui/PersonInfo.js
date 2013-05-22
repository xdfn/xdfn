/**
 * File: app/person/ui/PersonInfo.js
 * Author: liusha
 */

Ext.define('xdfn.person.ui.PersonInfo', {
    extend: 'Ext.panel.Panel',

    id: 'PersonInfo',
    layout: {
        type: 'border'
    },
    closable: true,
    iconCls: 'person_tabs',
    title: '个人信息',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                activeItem: 0,
                layout: {
                    type: 'fit'
                },
                bodyPadding: 5,
                bodyStyle: 'background-color:#d8e6f4',
                title: '个人信息',
                region: 'center',
                items: [
                    {
                        xtype: 'fieldset',
                        padding: 0,
                        defaults: {
                            labelWidth: 100
                        },
                        layout: {
                            type: 'absolute'
                        },
                        title: '基本信息',
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'V_USER_NAME',
                                readOnly: true,
                                submitValue: false,
                                fieldLabel: '姓名',
                                x: 180,
                                y: 0
                            },
                            {
                                xtype: 'textfield',
                                name: 'C_GENDER',
                                readOnly: true,
                                submitValue: false,
                                fieldLabel: '性别',
                                x: 180,
                                y: 30
                            },
                            {
                                xtype: 'textfield',
                                width: 270,
                                name: 'V_IDCARD',
                                fieldLabel: '身份证',
                                readOnly: true,
                                x: 580,
                                y: 30
                            },
                            {
                                xtype: 'datefield',
                                name: 'D_BIRTHDAY',
                                submitValue: false,
                                fieldLabel: '生日',
                                editable: false,
                                format: 'Y年m月d日',
                                x: 580,
                                y: 0
                            },
                            {
                                xtype: 'textfield',
                                width: 270,
                                name: 'V_DEPT_ID',
                                readOnly: true,
                                submitValue: false,
                                fieldLabel: '所属部门',
                                x: 180,
                                y: 60
                            },
                            {
                                xtype: 'textfield',
                                width: 270,
                                name: 'V_PST_ID',
                                readOnly: true,
                                submitValue: false,
                                fieldLabel: '职务',
                                x: 580,
                                y: 60
                            },
                            {
                                xtype: 'container',
                                height: 160,
                                id: 'PersonPhoto',
                                width: 136,
                                layout: {
                                    type: 'fit'
                                },
                                x: 20,
                                y: 10
                            },
                            {
                                xtype: 'textfield',
                                width: 270,
                                name: 'V_PHONE1',
                                fieldLabel: '电话1',
                                allowBlank: false,
                                blankText: '不能为空',
                                enforceMaxLength: true,
                                maxLength: 30,
                                regex: /^[\d-]*$/,
                                regexText: '输入格式不正确！',
                                x: 180,
                                y: 90
                            },
                            {
                                xtype: 'textfield',
                                width: 270,
                                name: 'V_PHONE2',
                                fieldLabel: '电话2',
                                enforceMaxLength: true,
                                maxLength: 30,
                                regex: /^[\d-]*$/,
                                regexText: '输入格式不正确！',
                                x: 580,
                                y: 90
                            },
                            {
                                xtype: 'textfield',
                                width: 340,
                                name: 'V_EMAIL',
                                fieldLabel: '电子邮箱',
                                allowBlank: false,
                                blankText: '不能为空',
                                enforceMaxLength: true,
                                maxLength: 50,
                                vtype: 'email',
                                vtypeText: '邮件格式不正确！',
                                x: 180,
                                y: 120
                            },
                            {
                                xtype: 'datefield',
                                name: 'D_ENTRY_DATE',
                                submitValue: false,
                                fieldLabel: '入职日期',
                                editable: false,
                                format: 'Y年m月d日',
                                x: 180,
                                y: 150
                            },
                            {
                                xtype: 'datefield',
                                name: 'D_EXP_DATE',
                                submitValue: false,
                                fieldLabel: '合同到期日',
                                editable: false,
                                format: 'Y年m月d日',
                                x: 580,
                                y: 150
                            },
                            {
                                xtype: 'textfield',
                                width: 380,
                                name: 'V_HOME_ADDR',
                                fieldLabel: '家庭住址',
                                allowBlank: false,
                                blankText: '不能为空！',
                                enforceMaxLength: true,
                                maxLength: 200,
                                x: 180,
                                y: 180
                            },
                            {
                                xtype: 'label',
                                text: '个人照片',
                                x: 60,
                                y: 180
                            },
                            {
                                xtype: 'button',
                                height: 30,
                                width: 80,
                                iconCls: 'person_tabs',
                                text: '修改资料',
                                x: 690,
                                y: 220
                            },
                            {
                                xtype: 'filefield',
                                width: 440,
                                name: 'F_UP_PHOTO_FILE',
                                fieldLabel: '更换照片',
                                buttonText: '更换照片',
                                x: 180,
                                y: 220
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'form',
                height: 220,
                layout: {
                    type: 'fit'
                },
                bodyPadding: 5,
                bodyStyle: 'background-color:#d8e6f4',
                collapsed: true,
                collapsible: true,
                title: '修改密码',
                region: 'south',
                split: true,
                items: [
                    {
                        xtype: 'fieldset',
                        layout: {
                            type: 'absolute'
                        },
                        collapsible: false,
                        title: '密码修改',
                        items: [
                            {
                                xtype: 'textfield',
                                width: 260,
                                name: 'V_OLD_PASSWORD',
                                fieldLabel: '旧密码',
                                inputType: 'password',
                                allowBlank: false,
                                blankText: '不能为空！',
                                emptyText: '请输入旧密码',
                                enforceMaxLength: true,
                                maxLength: 20,
                                x: 20,
                                y: 10
                            },
                            {
                                xtype: 'textfield',
                                width: 260,
                                name: 'V_NEW_PASSWORD',
                                fieldLabel: '新密码',
                                inputType: 'password',
                                allowBlank: false,
                                blankText: '不能为空！',
                                enforceMaxLength: true,
                                maxLength: 20,
                                minLength: 6,
                                minLengthText: '密码不能小于6位字符！',
                                x: 20,
                                y: 40
                            },
                            {
                                xtype: 'textfield',
                                width: 260,
                                name: 'V_NEW_PASSWORD2',
                                fieldLabel: '再输一次',
                                inputType: 'password',
                                allowBlank: false,
                                blankText: '不能为空！',
                                submitValue: false,
                                enforceMaxLength: true,
                                maxLength: 20,
                                minLength: 6,
                                minLengthText: '密码不能小于6位字符！',
                                x: 20,
                                y: 70
                            },
                            {
                                xtype: 'button',
                                height: 30,
                                width: 80,
                                iconCls: 'person_tabs',
                                text: '修改密码',
                                x: 200,
                                y: 100
                            }
                        ]
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});