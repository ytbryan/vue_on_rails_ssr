# Vue on Rails SSR
This repo serves as an demonstration that server rendering of Vue component is possible on Rails. SSR support will be integrated into [Vue on Rails](https://github.com/vueonrails/vueonrails) project

# Rails Side
```
bundle
rail server
```
# Server-rendering side
This will run server-rendering script at port 7777 using hypernova
```
node server
```

Then visit [http://localhost:3000](http://localhost:3000)

"Hello World" is server rendered. 

---

## Manual configuration
This section is written as a precursor for the WIP documentation of Vue on Rails 

1. Setup gem dependencies
At `Gemfile`
```
gem 'hypernova'
```
please run `bundle` 

2. Install the npm dependencies
```
yarn add hypernova hypernova-vue vue-server-renderer
```

3. At `app/controllers/application_controller.rb`
```
require 'hypernova'
class ApplicationController < ActionController::Base
  around_action :hypernova_render_support
end
```

4. At `app/helpers/application_helper.rb`
```
require 'hypernova'

module ApplicationHelper
  def ssr_vue(id, name)
    render_react_component(id, name: name)
  end
end
```

5. At `config/initializers/hypernova.rb`
```
require 'hypernova'
require 'hypernova/plugins/development_mode_plugin'

Hypernova.add_plugin!(DevelopmentModePlugin.new)

Hypernova.configure do |config|
  config.host = "0.0.0.0"
  config.port = 7777            # The port where the node service is listening
end
```

6. At `server.js`
```
var hypernova = require('hypernova/server');

hypernova({
  devMode: true,
  getComponent(name) {
    console.log("The component name is -> " + name)
    if (name === 'VueComponent.js') {
      return require('./app/javascript/ssr/component.js')
    }
    return null;
  },
  port: 7777,
});
```

7. At `app/javascript/ssr/component.js`

```
console.log("hello vue")
const Vue = require("vue")
const renderVue = require("hypernova-vue").renderVue

const MyComponentX = Vue.extend({
  template: '<h1>hello world</h1>'
})

module.exports = renderVue("VueComponent.js", MyComponentX)
```

8. You will need a Rails view to embed your SSR Vue component.

To generate a Rails view like `pages`, run `rails g scaffold pages`

At `app/pages/index.html.erb`
```
<%= ssr_vue('VueComponent.js', :name => 'Hypernova The Renderer') %>
```


Please send an issue to this project if you detect that I miss a step in the manual configuration section.


## Todo
- [x] scaffold these configuration on Vue on Rails
- [ ] Integrate SFC into hypernova
- [ ] Test with latest babel and older webpacker
- [ ] Documentation

## Thanks
- `hypernova`
- `hypernova-vue`, Thanks Felipe Guizar Diaz for his initial work


