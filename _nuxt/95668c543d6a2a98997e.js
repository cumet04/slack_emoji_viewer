(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{214:function(t,e,o){var content=o(224);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(18).default)("b9b45b30",content,!0,{sourceMap:!1})},223:function(t,e,o){"use strict";var n=o(214);o.n(n).a},224:function(t,e,o){(e=o(17)(!1)).push([t.i,'.section[data-v-b581cb38]{margin-bottom:12px}.steps[data-v-b581cb38]{counter-reset:step}.step[data-v-b581cb38]{position:relative;margin-left:25px}.step[data-v-b581cb38]:before{position:absolute;left:-25px;counter-increment:step;content:counter(step) "."}.code[data-v-b581cb38]{width:650px;height:36px;padding:4px;resize:none;font-family:monospace;background-color:#eee}.button[data-v-b581cb38],.input[data-v-b581cb38]{border:1px solid grey;padding:0 4px}.button[data-v-b581cb38]{background-color:#d3d3d3}',""]),t.exports=e},229:function(t,e,o){"use strict";o.r(e);var n={data:function(){return{dataFieldValue:"",copyCodeText:["const {domain, name, icon} = TS.teams.getTeamById(TS.boot_data.team_id);",'window.prompt("data:",JSON.stringify({name, domain, icon, token: TS.boot_data.api_token}))'].join("\n")}},computed:{selected:{get:function(){var t;return null===(t=this.$store.getters["workspace/current"])||void 0===t?void 0:t.domain},set:function(t){this.$store.commit("workspace/setCurrent",t),this.$store.commit("emoji/clear")}},workspaces:function(){return this.$store.getters["workspace/all"]}},methods:{saveWorkspace:function(){this.$store.commit("workspace/set",JSON.parse(this.dataFieldValue)),this.$store.commit("emoji/clear"),this.dataFieldValue="",alert("token saved")}}},c=(o(223),o(9)),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("main",[o("section",{staticClass:"section"},[o("h1",{staticClass:"title"},[t._v("Select current workspace")]),t._v(" "),o("ul",t._l(t.workspaces,(function(e){return o("li",{key:e.domain},[o("label",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.selected,expression:"selected"}],attrs:{type:"radio",name:"workspace"},domProps:{value:e.domain,checked:t._q(t.selected,e.domain)},on:{change:function(o){t.selected=e.domain}}}),t._v("\n          "+t._s(e.name)+"\n        ")])])})),0)]),t._v(" "),o("section",{staticClass:"section",attrs:{id:"add_workspace"}},[o("h1",{staticClass:"title"},[t._v("Add/Update workspace")]),t._v(" "),o("ol",{staticClass:"steps"},[t._m(0),t._v(" "),o("li",{staticClass:"step"},[o("p",[t._v("Copy this code, and run in devtool/Console")]),t._v(" "),o("textarea",{staticClass:"code",attrs:{readonly:""},domProps:{value:t.copyCodeText},on:{click:function(t){return t.target.select()}}})]),t._v(" "),o("li",{staticClass:"step"},[o("p",[t._v("Copy output data, and paste it below")]),t._v(" "),o("div",{staticClass:"form-field"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.dataFieldValue,expression:"dataFieldValue"}],staticClass:"input",attrs:{type:"text",placeholder:"data"},domProps:{value:t.dataFieldValue},on:{input:function(e){e.target.composing||(t.dataFieldValue=e.target.value)}}}),t._v(" "),o("button",{staticClass:"button",on:{click:t.saveWorkspace}},[t._v("set")])])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"step"},[e("p",[this._v("\n          Go to\n          "),e("a",{attrs:{href:"https://slack.com/customize/emoji",target:"_blank"}},[this._v("\n            https://slack.com/customize/emoji\n          ")])])])}],!1,null,"b581cb38",null);e.default=component.exports}}]);