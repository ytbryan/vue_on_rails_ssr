require 'hypernova'
class ApplicationController < ActionController::Base
  around_action :hypernova_render_support
end
