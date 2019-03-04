/*
    Applet the rewrite of Stelch
    Licensed under Apache License 2.0
    Last Revision 5/03/2019
*/

applet = {
    conf:{
        "applet_element":"applet_body_element",
        "preload":true,
        "default_page":"home",
        "page_dir":"assets/pages/",
        "page_scheme":"$page.html",
        "error_handle":function (error) {
            switch(error){
                case 404:
                    break;
            }
        },
        "app_data":{}
    },
    listeners:{
        page_change_event:[],
        page_alert_event:[]
    },
    alert:{
        queue:new Array(),
        new:function(title,message){
            var id = applet.alert.queue.length;
            applet.alert.queue[id]=({
                "id":id,
                "title":title,
                "message":message,
                "initiator":['manual']
            });
            if(document.getElementById("stelch_alert")===null){
                document.getElementsByTagName("body")[0].appendChild(function(){
                    var abox = document.createElement("div");
                    abox.id="stelch_alert";
                    abox.style.display="block";
                    abox.style.position="fixed";
                    abox.style.top="0";
                    abox.style.width="15%";
                    abox.style.height="100%";
                    abox.style.right="0%";
                    return abox;
                }());
                push();
            }else{push();}
            function push(){
                document.getElementById("stelch_alert").appendChild(function(){
                    var abox = document.createElement("div");
                    abox.id="alert_"+id;
                    abox.style.transition="0.5s ease";
                    abox.style.top="0";
                    abox.style.boxShadow="#00000038 1px 2px 7px;";
                    abox.style.display="block";
                    abox.style.margin="5%";
                    abox.style.width="90%";
                    abox.style.height="8%";
                    abox.style.float="right";
                    abox.style.right="0%";
                    abox.style.fontFamily="sans-serif";
                    abox.style.background="rgb(236, 236, 236)";
                    abox.style.color="#000";
                    abox.style.borderRadius="5px";
                    abox.style.padding="2%";
                    abox.innerHTML="<span onclick='applet.alert.dismiss("+id+");' style='float:right;cursor:pointer;'>X</span><span class='title' style='display:block;font-weight:bold;font-size:25px;'>"+title+"</span><span class='message' style='display:block;font-weight:normal;font-size:15px;'>"+message+"</span>";
                    return abox;
                }());
            }
            return false;},
        list:function(){return applet.alert.queue},
        dismiss:function(id){
            applet.alert.queue[id]=-1;
            var abox = document.getElementById("alert_"+id);
            abox.style.marginRight="-100%";
            setTimeout(function(){
                abox.parentNode.removeChild(abox);
            },1200);
            return false;}
    },
    page:{
        set:function(page){
            if(applet.conf.app_data.cache===undefined){applet.conf.app_data.cache=new Array();}
            if(applet.conf.app_data.halted===undefined){applet.conf.app_data.halted=false;}
            if(applet.conf.app_data.halted===true){console.error("A fatal error has occurred. The application is no longer responding. Please reload the page.");return;}
            var data = null;
            let cached = false;
            if(applet.conf.app_data.cache[page]!==undefined){
                // Cache exists
                cached=true;
                console.log("Loaded from cache");
                data=applet.conf.app_data.cache[page].pageData;
                finish();
            }else {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange=function(){if(this.readyState===4&&this.status===200){data=this.responseText;applet.conf.app_data.cache[page]={"pageData":data};applet.conf.app_data.failed_loads=0;finish();}else if(this.readyState===4&&this.status===404){if(applet.conf.app_data.failed_loads===0){applet.page.reload();}else{applet.alert.new("Fatal Error","Attempted to load default page and failed. The application has exited.");applet.conf.app_data.halted=true;} applet.alert.new("Error","We've encountered a 404. This has been reported to the site Admin.");}};
                xhttp.open("GET", applet.conf.page_dir+(applet.conf.page_scheme.replace("$page",page)), true);
                xhttp.send();
            }
            function finish(){
                window.location.hash = "/page/" + page;
                for(var i=0;i<applet.listeners.page_change_event.length;i++){
                    applet.listeners.page_change_event[i]({page:page,cached:cached});
                }
                document.getElementById(applet.conf.applet_element).innerHTML = data;
            }
        },
        cache:function(page){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange=function(){if(this.readyState===4&&this.status===200){applet.conf.app_data.cache[page]={"pageData":this.responseText};}};
            xhttp.open("GET", applet.conf.page_dir+(applet.conf.page_scheme.replace("$page",page)), true);
            xhttp.send();
        },
        preload:function(){
            var links = getElementsByAttribute("-applet-data-link");
            for(var i=0;i<links.length;i++){
                var link=links[i];
                this.cache(link.getAttribute("-applet-data-link"))
            }
        },
        reload:function(e){if(e!==undefined&&e===true){/*Initial Load*/if(window.location.hash.split.length>1){return;}}if(applet.conf.app_data.halted===true){return;}applet.page.set(applet.conf.default_page);applet.conf.app_data.failed_loads=1;}
    },
    events:{
        "hashchange":function(){
            var page = window.location.hash.split("/")[2];
            if(page!==undefined){applet.page.set(page);}
        }
    },
    addEventListener:(event,callback)=>{
        switch(event.toLowerCase()){
            case "pagechangeevent":
                applet.listeners.page_change_event.push(callback);
                break;
            case "onalert":
                applet.listeners.page_alert_event.push(callback);
                break;
            default:
                throw new Error("Invalid event requested "+event);
        }
    }
};
window.addEventListener("hashchange", applet.events.hashchange(),false);

/* Misc Support Functions */
getElementsByAttribute = function(attr){
    var checking = false;
    var root = document.body;
    var results = [];
    checkChildren(root);
    function checkChildren(elem){
        checking=true;
        var children = elem.children;
        for(var i=0;i<children.length;i++){
            if(children[i].children!==null){checkChildren(children[i]);}
            if(!!children[i].getAttribute(attr)===true){results.push(children[i]);}
        }
        checking=false;
    }
    return results;
};
