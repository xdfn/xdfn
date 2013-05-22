/**
 * File: app/fax/FaxFileWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.fax.FaxFileWindow', {
    extend: 'xdfn.fax.ui.FaxFileWindow',

    grid: null,
    
    ID: null,
    
    url: null,
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        
        me.down('button[text=提交]').on('click', me.OnSubmitBtnClick, me);
        me.down('button[text=关闭]').on('click', me.OnCloseBtnClick, me);
    },
    
    OnSubmitBtnClick: function(self, e, options) {
    	var me = this;
    	
    	//TODO: 提交传真信息
    	var form = self.up('form').getForm();
    	    	
    	if (!form.isValid()) return;
    	
    	form.submit({
    	    clientValidtion: true,
    	    waitMsg : '正在提交信息...',
			waitTitle : '提示',
    	    url: me.url,
    	    params: {
    	    	ID: me.ID
    	    },
    	    success : function(form, action){
    	    	var store = me.grid.getStore(),
    	    	    sm = me.grid.getSelectionModel();
    	    	    rows = sm.getSelection();
    	    	    
				if (me.title == '增加附件') {
    	    		store.insert(0, action.result.data);
				    sm.select(0);
    	    	} else {
    	    		rows[0].set(action.result.data);
    	    		rows[0].commit();
    	    	}
    	    	
    	    	me.close();
			},
			failure : function(form, action){
				Ext.Msg.alert('提示','提交失败！');
			}
    	});
    },
    
    OnCloseBtnClick: function(self, e, options) {
    	var me = this;
    	me.close();
    }
    /*,
    
    readFile: function(fileBrowser) {
    	var me = this;
	    if (Ext.isIE) {
	        me.readFileIE(fileBrowser);
	    }
	    else if (Ext.isGecko) {
	    	me.readFileFirefox(fileBrowser);
	    }
	    else {
	    	alert("此浏览器不支持！");
	    }
	},

    readFileFirefox: function(fileBrowser) {
	    try {
	        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	    }
	    catch (e) {
	        alert('Unable to access local files due to browser security settings. To overcome this, follow these steps: (1) Enter "about:config" in the URL field; (2) Right click and select New->Boolean; (3) Enter "signed.applets.codebase_principal_support" (without the quotes) as a new preference name; (4) Click OK and try loading the file again.');
	        return;
	    }
	
	    var fileName=fileBrowser.value;
	    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
	
	    try {
	        // Back slashes for windows
	        file.initWithPath( fileName.replace(/\//g, "\\\\") );
	    }
	    catch(e) {
	        if (e.result!=Components.results.NS_ERROR_FILE_UNRECOGNIZED_PATH) throw e;
	        alert("File '" + fileName + "' cannot be loaded: relative paths are not allowed. Please provide an absolute path to this file.");
	        return;
	    }
	
	    if ( file.exists() == false ) {
	        alert("File '" + fileName + "' not found.");
	        return;
	
	    }
	    alert(file.path); // I test to get the local file's path.
	    var is = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance( Components.interfaces.nsIFileInputStream );
	    try { 
	        is.init( file,0x01, 00004, null); 
	    }
	    catch (e) {
	        if (e.result!=Components.results.NS_ERROR_FILE_ACCESS_DENIED) throw e;
	        alert("Unable to access local file '" + fileName + "' because of file permissions. Make sure the file and/or parent directories are readable.");
	        return;
	    }
	
	    var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance( Components.interfaces.nsIScriptableInputStream );
	
	    sis.init( is );
	
	    var data = sis.read( sis.available() );
	
	    alert("Data from file: " + data); // I test to get the local file's data.
	},

    readFileIE: function(fileBrowser) {
	    var data;
	    try {
	        var fso = new ActiveXObject("Scripting.FileSystemObject");
	
	        var fileName=fso.GetAbsolutePathName(fileBrowser.value);
	
	        if (!fso.FileExists(fileName)) {
	            alert("File '" + fileName + "' not found.");
	            return;
	        }
	        var file = fso.OpenTextFile(fileName, 1);
	        data = file.ReadAll();
	        alert("Data from file: " + data);
	        file.Close();
	    }
	
	    catch(e) {
	        if (e.number == -2146827859) {
	            // This is what we get if the browser's security settings forbid
	            // the use of the FileSystemObject ActiveX control
	            alert('Unable to access local files due to browser security settings. To overcome this, go to Tools->Internet Options->Security->Custom Level. Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
	        }
	        else if (e.number == -2146828218) {
	            // This is what we get if the browser can't access the file
	            // because of file permissions
	            alert("Unable to access local file '" + fileName + "' because of file permissions. Make sure the file and/or parent directories are readable.");
	        }
	        else throw e;
	    }
	
	}*/
});