/**
 * This file is part of XDFN Project.
 * Author： Liusha。
 * Copyright (c) 2013 XDFN Inc.
 */
 
/**
 * XDFN application entry.
 */
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', './app/ux');
//Ext.Loader.setPath('Ext.ux', './app_builds/ux');

Ext.application({
    name: 'xdfn',
    appFolder: 'app',
    //appFolder: 'app_builds',
    
    launch: function() {
    	Ext.QuickTips.init();
    	Ext.create('xdfn.com.LoginWindow');
    }
});

