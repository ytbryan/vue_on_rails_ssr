console.log("hello vue")
const Vue = require("vue")
const renderVue = require("hypernova-vue").renderVue
// const comp = require("../app.vue")
// const Header = Vue.extend(comp)

const MyComponentX = Vue.extend({
  template: '<h1>hello world</h1>'
})

module.exports = renderVue("VueComponent.js", MyComponentX)
