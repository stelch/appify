/*
Appify by Stelch Software
*/
var conf={
    app_title:"Basic Application",
    app_desc:"Unconfigured Appify Appliication",
    icon:"https://stelch.com/assets/img/stelch-software.png",
    app_version:0,
    alert_count:30
};

// Main Application
var data = {
    current_pg:"home"
};
var appify = function (){
    console.log("Appify [V1.0]");
    console.log(conf.app_title+" [V"+conf.version+"]");
};
appify.updatetitle = function () {document.title=data.current_pg.charAt(0).toUpperCase()+data.current_pg.slice(1)+" // "+conf.app_title;console.log("Appify has updated the application title.");};
appify.updateicon = function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = (conf.icon);
    document.getElementsByTagName('head')[0].appendChild(link);
    console.log("Appify has updated the application icon.");
};
appify.load = function(args){
    if(args['app_title']!=null){conf['app_title']=args['app_title'];}
    if(args['app_desc']!=null){conf['app_desc']=args['app_desc'];}
    if(args['icon']!=null){conf['icon']=args['icon'];}
    if(args['app_version']!=null){conf['app_version']=args['app_version'];}
    if(args['alert_count']!=null){conf['alert_count']=args['alert_count'];}
    if(args['page']!=null){appify.setpage(args['page'],args['args']);}
    console.log("Now loading Appify 1.0, module: "+conf.app_title);
    appify.updatetitle();
    appify.updateicon();
    appify.setpage(args['page']);
};
appify.notify  = function(message, time){
    if(time==null)
    var alertbox = document.createElement("div");
    alertbox.innerHTML=message;
};
appify.getApplicationData = function() {
        console.log(JSON.stringify(conf));
};
appify.setpage = function(page,args) {
    var bodyElem = null;
    var arg_str = "args="+args;
    if(document.getElementById("appify_body_element")!=null){
        bodyElem=document.getElementById("appify_body_element");
    }else {
        bodyElem=document.createElement("div").id="appify_body_element";
    }

    bodyElem.innerHTML="Please Wait...";

    var xmlhttp;
    if (window.XMLHttpRequest) {xmlhttp = new XMLHttpRequest();
    } else {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data.current_pg=page.substr(0,1)+page.substr(1);
            appify.updatetitle();
            window.history.pushState(page, document.title, '/'+page);
            bodyElem.innerHTML=this.responseText;
        }
        if(this.status==404){
            appify.setpage(data.current_pg);
            alert("Page could not be found.");
        }
    };
    xmlhttp.open("GET", "/assets/pg/"+page+".php?"+arg_str, true);
    xmlhttp.send();
};
appify.handlelink = function(p,args) {
    appify.setpage(p,args);
};
appify.logout = function(){
    window.location=window.location+"?&logout";
};

function delete_cookie( name, path, domain ) {
        document.cookie = name + "=" +
            ((path) ? ";path="+path:"")+
            ((domain)?";domain="+domain:"") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
}