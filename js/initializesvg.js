"use strict";function getInfo(e){return zones[zoneReference[e]]}function triggerInfo(e){!geid("hover")||(geid("hover").innerHTML="Hovered zone id: "+e);var o=getInfo(e),n=o.details,t=Factions[n.owner];new Array(document.getElementsByClassName("blurbTitle")).forEach(function(e){e.style.color=o.text}),new Array(document.getElementsByClassName("blurbSubtitle")).forEach(function(e){e.style.color=o.text}),new Array(document.getElementsByClassName("blurbText")).forEach(function(e){e.style.color=o.bw}),geid("blurbContent").style.backgroundColor=o.backgorund,geid("blurbName").innerHTML=n.name,geid("blurbOwner").innerHTML=n.owner,geid("blurbZoneBlurb").innerHTML=n.blurb,geid("blurbFactionBlurb").innerHTML=t?t.blurb:"-"}function triggerExpandedInfo(e){!geid("click")||(geid("click").innerHTML="Clicked zone id: "+e);var o=getInfo(e),n=o.details,t=Factions[n.owner];new Array(document.getElementsByClassName("longTitle")).forEach(function(e){e.style.color=o.text}),new Array(document.getElementsByClassName("longSubtitle")).forEach(function(e){e.style.color=o.text}),new Array(document.getElementsByClassName("longText")).forEach(function(e){e.style.color=o.bw}),geid("longContent").style.backgroundColor=o.backgorund,geid("longName").innerHTML=n.name,geid("longOwner").innerHTML=n.owner,geid("longZoneLong").innerHTML=n.long,geid("longFactionLong").innerHTML=t?t.long:"-"}function untriggerInfo(){}function untriggerExpandedInfo(){}function selectZone(e){var o=getInfo(e);if(o.g){var n=!0,t=!1,r=void 0;try{for(var i,l=geid(e).childNodes[Symbol.iterator]();!(n=(i=l.next()).done);n=!0){var a=i.value;a.tagName&&(a.style.fill="#fff")}}catch(e){t=!0,r=e}finally{try{!n&&l.return&&l.return()}finally{if(t)throw r}}}else o.e.node.style.fill="#fff";untriggerExpandedInfo(),triggerExpandedInfo(e)}function hoverZone(e){var o=zones[zoneReference[e]];if(o.g){var n=!0,t=!1,r=void 0;try{for(var i,l=geid(e).childNodes[Symbol.iterator]();!(n=(i=l.next()).done);n=!0){var a=i.value;a.tagName&&(a.style.fill="#ddd")}}catch(e){t=!0,r=e}finally{try{!n&&l.return&&l.return()}finally{if(t)throw r}}}else o.e.node.style.fill="#ddd";untriggerInfo(),triggerInfo(e)}function customresethandler(){var e=getInfo(this.id());try{o=Factions[e.details.owner].color}catch(e){var o=defaultColor}if(e.g){var n=!0,t=!1,r=void 0;try{for(var i,l=geid(e.id).childNodes[Symbol.iterator]();!(n=(i=l.next()).done);n=!0){var a=i.value;a.tagName&&(a.style.fill=o)}}catch(e){t=!0,r=e}finally{try{!n&&l.return&&l.return()}finally{if(t)throw r}}}else e.e.node.style.fill=o}function customresetcaller(){zones.forEach(function(e){e.id!==selectedZone&&e.e.fire("customreset")})}function delayedMouseover(e,o){e.mouseout||(e.id!==selectedZone?(customresetcaller(),hoverZone(o)):(customresetcaller(),untriggerInfo(),triggerInfo(o)))}function mouseoverhandler(){var e=getInfo(this.id());e.mouseout=!1,setTimeout(delayedMouseover,50,e,e.id)}function mouseouthandler(){selectedZone||(getInfo(this.id()).mouseout=!0)}function clickhandler(){var e=getInfo(this.id());selectedZone===e.id?(selectedZone=null,e.e.fire("customreset"),delayedMouseover(e,e.id),untriggerExpandedInfo()):(selectedZone=e.id,customresetcaller(),selectZone(e.id))}function ontouchstarthandler(){var e=getInfo(this.id());e.e.fire("mouseover"),e.e.fire("click")}function adopt(){var e=!0,o=!1,n=void 0;try{for(var t,r=geid("The_Ninja_World").childNodes[Symbol.iterator]();!(e=(t=r.next()).done);e=!0){var i=t.value;if(i.tagName){if(!i.id)throw"Element lacks id!";var l=ZoneDetails[i.id];zoneReference[i.id]=zones.length;var a=Factions[l.owner]&&Factions[l.owner].color||"#000000",d=Factions[l.owner]&&Factions[l.owner].textOverride||invertColor(a),c=Factions[l.owner]&&Factions[l.owner].invertOverride||Factions[l.owner].textOverride&&invertColor(invertColor(d),!0)||invertColor(a,!0);zones.push({g:"g"===i.tagName.toLowerCase(),e:SVG.adopt(i),id:i.id,details:l,background:a,text:d,bw:c,mouseout:!1})}}}catch(e){o=!0,n=e}finally{try{!e&&r.return&&r.return()}finally{if(o)throw n}}zones.forEach(function(e,o){var n=e.e;n.mouseover(mouseoverhandler),n.mouseout(mouseouthandler),n.click(clickhandler),n.on("customreset",customresethandler),n.on("touchstart",ontouchstarthandler),n.fire("customreset")})}var geid=document.getElementById.bind(document),defaultColor="#b2b2b2",zones=[],zoneReference={},selectedZone=void 0;addload(adopt),addload(function(){window.map=svgPanZoom("#The_Best_Map_Ever",{panEnabled:!0,controlIconsEnabled:!0,zoomEnabled:!0,dblClickZoomEnabled:!0,mouseWheelZoomEnabled:!0,preventMouseEventsDefault:!0,zoomScaleSensitivity:.5,minZoom:1,maxZoom:10,fit:!0,contain:!1,center:!0,refreshRate:"auto"})});