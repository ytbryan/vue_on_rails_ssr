require 'hypernova'

module ApplicationHelper
  def ssr_vue(id, name)
    render_react_component(id, name: name)
  end
end
