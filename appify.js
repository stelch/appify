/*
Appify by Stelch Software
Last Revision 2/10/2018
*/

var conf={
    app_title:"Basic Application",
    app_desc:"Unconfigured Appify Appliication",
    icon:"https://stelch.com/assets/img/stelch-software.png",
    directory:"/assets/pg/$page",
    app_version:0,
    alert_count:30
};

var appify = function (){
    console.log("Appify [V1.1]");
    console.log(conf.app_title+" [V"+conf.version+"]");
    console.log("Logging: "+(!!appify.data.isDev));
    console.log("Debug: "+(!!appify.data.isDev));
    console.log("isDev: "+(!!appify.data.isDev));
};
// Main Application
appify.data = {
    current_pg:"",
    isDev:!!getCookie("isDev")
};
appify.updatetitle = function () {document.title=appify.data.current_pg.charAt(0).toUpperCase()+appify.data.current_pg.slice(1)+" // "+conf.app_title;(!!appify.data.isDev?console.log("Appify has updated the application title."):null);};
appify.updateicon = function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = (conf.icon);
    document.getElementsByTagName('head')[0].appendChild(link);
    if(appify.data.isDev===true){console.log("Appify has updated the application icon.");}
};
appify.load = function(args){
    if(args['app_title']!=null){conf['app_title']=args['app_title'];}
    if(args['app_desc']!=null){conf['app_desc']=args['app_desc'];}
    if(args['directory']!=null){conf['directory']=args['directory'];}
    if(args['icon']!=null){conf['icon']=args['icon'];}
    if(args['app_version']!=null){conf['app_version']=args['app_version'];}
    if(args['alert_count']!=null){conf['alert_count']=args['alert_count'];}
    if(args['page']!=null){conf['page']=args['page'];appify.setpage(args['page'],args['args']);}
    console.log("Now loading Appify 1.1, module: "+conf.app_title);
    appify.updatetitle();
    appify.updateicon();
    appify.setpage(args['page']);
};
appify.notify  = function(message, time){
    if(time==null)
    var alertbox = document.createElement("div");
    alertbox.id="alert";
    alertbox.innerHTML=message;
};
appify.getApplicationData = function() {
    if(appify.data.isDev===true) console.log(JSON.stringify(conf));
    if(!appify.data.isDev===true) console.log("Not a Developer");
};
appify.setpage = function(page,args) {
    var bodyElem = null;
    var progress = document.getElementById("appify_loader");
    var arg_str = "args="+args;
    if(document.getElementById("appify_body_element")!=null){
        bodyElem=document.getElementById("appify_body_element");
    }else {
        bodyElem=document.createElement("div").id="appify_body_element";
    }
    if(progress){progress.getElementsByClassName("fill")[0].opacity="1";progress.width="0";}
    document.body.style.cursor="progress";
    var xmlhttp;

    if (window.XMLHttpRequest) {xmlhttp = new XMLHttpRequest();

    } else {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}
    xmlhttp.onreadystatechange = function() {
        if(progress){progress.getElementsByClassName("fill")[0].width="100%";}

        if (this.readyState == 4 && this.status == 200) {
            if(appify.data.isDev===true){console.log("Appify page has been changed to '"+page.substr(0,1)+page.substr(1)+"' from '"+appify.data.current_pg+"'");}
            appify.data.current_pg=page.substr(0,1)+page.substr(1);
            appify.updatetitle();
            //window.history.pushState(page, document.title, './'+page);
            bodyElem.innerHTML=this.responseText;
            document.body.style.cursor="";
            appify.data.attempts=0;
            if(progress){progress.width="0";}
        }
        if(this.status==404){
            appify.data.attempts=((appify.data.attempts!==undefined)?appify.data.attempts:0)+1;
            if(appify.data.attempts>3){return;}
            appify.setpage(appify.data.current_pg);
            ((!!appify.data.isDev===true)? console.log(`Application replied 404 not found for page ${page}`):null);
        }
    };
    //xmlhttp.open("GET", "/assets/pg/"+page+".php?"+arg_str, true);
    xmlhttp.open("GET", conf.directory.replace("$page",page)+".php?"+arg_str, true);
    xmlhttp.send();
};
appify.handlelink = function(p,args) {
    appify.setpage(p,args);
};
appify.logout = function(){
    window.location=window.location+"?&logout";
};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function delete_cookie( name, path, domain ) {
        document.cookie = name + "=" +
            ((path) ? ";path="+path:"")+
            ((domain)?";domain="+domain:"") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
}
