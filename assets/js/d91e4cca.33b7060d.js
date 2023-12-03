"use strict";(self.webpackChunkwty_blog=self.webpackChunkwty_blog||[]).push([[662],{1608:(o,t,e)=>{e.r(t),e.d(t,{CH:()=>d,assets:()=>i,chCodeConfig:()=>y,contentTitle:()=>l,default:()=>C,frontMatter:()=>s,metadata:()=>p,toc:()=>a});var n=e(1527),c=e(7793),r=e(3120);const s={title:"GNU Debugger"},l=void 0,p={id:"environment-setup/gdb",title:"GNU Debugger",description:"Install",source:"@site/notes/environment-setup/gdb.md",sourceDirName:"environment-setup",slug:"/environment-setup/gdb",permalink:"/environment-setup/gdb",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"GNU Debugger"},sidebar:"tutorialSidebar",previous:{title:"CMake",permalink:"/environment-setup/cmake"},next:{title:"Misc",permalink:"/category/misc"}},i={},a=[{value:"Install",id:"install",level:2},{value:"Issues",id:"issues",level:2},{value:"GDB Attach Failed in VSCode",id:"gdb-attach-failed-in-vscode",level:3}],d={annotations:r.ds,Code:r.EK},y={staticMediaQuery:"not screen, (max-width: 768px)",lineNumbers:void 0,showCopyButton:void 0,themeName:"Best Themes - Catppuccin"};function u(o){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",...(0,c.a)(),...o.components};return d||F("CH",!1),d.Code||F("CH.Code",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("style",{dangerouslySetInnerHTML:{__html:'[data-ch-theme="Best Themes - Catppuccin"] {  --ch-t-colorScheme: dark;--ch-t-foreground: #cdd6f4;--ch-t-background: #282c34ff;--ch-t-lighter-inlineBackground: #282c34e6;--ch-t-editor-background: #282c34ff;--ch-t-editor-foreground: #cdd6f4;--ch-t-editor-lineHighlightBackground: #cdd6f411;--ch-t-editor-rangeHighlightBackground: #89dceb3f;--ch-t-editor-infoForeground: #3794FF;--ch-t-editor-selectionBackground: #585b70;--ch-t-focusBorder: #00000000;--ch-t-tab-activeBackground: #282c34ff;--ch-t-tab-activeForeground: #cba6f7;--ch-t-tab-inactiveBackground: #353740ff;--ch-t-tab-inactiveForeground: #6c7086;--ch-t-tab-border: #353740ff;--ch-t-tab-activeBorder: #cba6f7;--ch-t-editorGroup-border: #585b70;--ch-t-editorGroupHeader-tabsBackground: #353740ff;--ch-t-editorLineNumber-foreground: #7f849c;--ch-t-input-background: #313244;--ch-t-input-foreground: #cdd6f4;--ch-t-input-border: #00000000;--ch-t-icon-foreground: #cba6f7;--ch-t-sideBar-background: #131322;--ch-t-sideBar-foreground: #cdd6f4;--ch-t-sideBar-border: #00000000;--ch-t-list-activeSelectionBackground: #45475a;--ch-t-list-activeSelectionForeground: #cdd6f4;--ch-t-list-hoverBackground: #1e1e2e;--ch-t-list-hoverForeground: #cdd6f4; }'}}),"\n",(0,n.jsx)(t.h2,{id:"install",children:"Install"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.code,{children:"sudo apt install gdb"})}),"\n",(0,n.jsx)(t.h2,{id:"issues",children:"Issues"}),"\n",(0,n.jsx)(t.h3,{id:"gdb-attach-failed-in-vscode",children:"GDB Attach Failed in VSCode"}),"\n",(0,n.jsx)(d.Code,{codeConfig:y,northPanel:{tabs:[""],active:"",heightRatio:1},files:[{name:"",focus:"",code:{lines:[{tokens:[{content:"==== AUTHENTICATING FOR org.freedesktop.policykit.exec ===",props:{}}]},{tokens:[{content:"Authentication is needed to run `/usr/bin/gdb\u2019 as the super user",props:{}}]}],lang:"text"},annotations:[]}]}),"\n",(0,n.jsxs)(t.p,{children:["Found a solution ",(0,n.jsx)(t.a,{href:"https://github.com/microsoft/vscode-remote-release/issues/2053",children:"here"})," by creating the following pkexec policy"]}),"\n",(0,n.jsx)(d.Code,{codeConfig:y,northPanel:{tabs:[""],active:"",heightRatio:1},files:[{name:"",title:'"/usr/share/polkit-1/actions/com.ubuntu.pkexec.gdb.policy"',focus:"",code:{lines:[{tokens:[{content:"<?",props:{style:{color:"#7F849C"}}},{content:"xml",props:{style:{color:"#CBA6F7"}}},{content:" version",props:{style:{color:"#89B4FA"}}},{content:"=",props:{style:{color:"#CDD6F4"}}},{content:'"1.0"',props:{style:{color:"#A6E3A1"}}},{content:" encoding",props:{style:{color:"#89B4FA"}}},{content:"=",props:{style:{color:"#CDD6F4"}}},{content:'"UTF-8"',props:{style:{color:"#A6E3A1"}}},{content:"?>",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"<!",props:{style:{color:"#7F849C"}}},{content:"DOCTYPE ",props:{style:{color:"#F38BA8"}}},{content:"policyconfig",props:{style:{color:"#FAB387"}}},{content:" PUBLIC",props:{style:{color:"#CDD6F4"}}}]},{tokens:[{content:' "-//freedesktop//DTD PolicyKit Policy Configuration 1.0//EN"',props:{style:{color:"#CDD6F4"}}}]},{tokens:[{content:' "http://www.freedesktop.org/standards/PolicyKit/1/policyconfig.dtd"',props:{style:{color:"#CDD6F4"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"<",props:{style:{color:"#7F849C"}}},{content:"policyconfig",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"",props:{style:{color:"#CDD6F4"}}}]},{tokens:[{content:"  <",props:{style:{color:"#7F849C"}}},{content:"action ",props:{style:{color:"#CBA6F7"}}},{content:"id",props:{style:{color:"#89B4FA"}}},{content:"=",props:{style:{color:"#CDD6F4"}}},{content:'"com.ubuntu.pkexec.gdb-settings"',props:{style:{color:"#A6E3A1"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"    <",props:{style:{color:"#7F849C"}}},{content:"icon_name",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}},{content:"gdb-settings",props:{style:{color:"#CDD6F4"}}},{content:"</",props:{style:{color:"#7F849C"}}},{content:"icon_name",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"    <",props:{style:{color:"#7F849C"}}},{content:"defaults",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"      <",props:{style:{color:"#7F849C"}}},{content:"allow_any",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}},{content:"yes",props:{style:{color:"#CDD6F4"}}},{content:"</",props:{style:{color:"#7F849C"}}},{content:"allow_any",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"      <",props:{style:{color:"#7F849C"}}},{content:"allow_inactive",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}},{content:"yes",props:{style:{color:"#CDD6F4"}}},{content:"</",props:{style:{color:"#7F849C"}}},{content:"allow_inactive",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"      <",props:{style:{color:"#7F849C"}}},{content:"allow_active",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}},{content:"yes",props:{style:{color:"#CDD6F4"}}},{content:"</",props:{style:{color:"#7F849C"}}},{content:"allow_active",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"    </",props:{style:{color:"#7F849C"}}},{content:"defaults",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"    <",props:{style:{color:"#7F849C"}}},{content:"annotate ",props:{style:{color:"#CBA6F7"}}},{content:"key",props:{style:{color:"#89B4FA"}}},{content:"=",props:{style:{color:"#CDD6F4"}}},{content:'"org.freedesktop.policykit.exec.path"',props:{style:{color:"#A6E3A1"}}},{content:">",props:{style:{color:"#7F849C"}}},{content:"/usr/bin/gdb",props:{style:{color:"#CDD6F4"}}},{content:"</",props:{style:{color:"#7F849C"}}},{content:"annotate",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"    <",props:{style:{color:"#7F849C"}}},{content:"annotate ",props:{style:{color:"#CBA6F7"}}},{content:"key",props:{style:{color:"#89B4FA"}}},{content:"=",props:{style:{color:"#CDD6F4"}}},{content:'"org.freedesktop.policykit.exec.allow_gui"',props:{style:{color:"#A6E3A1"}}},{content:">",props:{style:{color:"#7F849C"}}},{content:"true",props:{style:{color:"#CDD6F4"}}},{content:"</",props:{style:{color:"#7F849C"}}},{content:"annotate",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"  </",props:{style:{color:"#7F849C"}}},{content:"action",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}}]},{tokens:[{content:"",props:{style:{color:"#CDD6F4"}}}]},{tokens:[{content:"</",props:{style:{color:"#7F849C"}}},{content:"policyconfig",props:{style:{color:"#CBA6F7"}}},{content:">",props:{style:{color:"#7F849C"}}}]}],lang:"xml"},annotations:[]}]}),"\n",(0,n.jsxs)(t.p,{children:["More info about ",(0,n.jsx)(t.a,{href:"https://github.blog/2021-06-10-privilege-escalation-polkit-root-on-linux-with-bug/",children:"polkit"})]})]})}function C(o={}){const{wrapper:t}={...(0,c.a)(),...o.components};return t?(0,n.jsx)(t,{...o,children:(0,n.jsx)(u,{...o})}):u(o)}function F(o,t){throw new Error("Expected "+(t?"component":"object")+" `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);