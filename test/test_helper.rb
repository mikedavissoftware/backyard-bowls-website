ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
 
class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.(yml|csv) for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  fixtures :all
 
  # Add more helper methods to be used by all tests here...

  def create_diet
    Diet.create!(diet: "test diet")
  end

  def create_test_user_and_login
    @current_user = User.create!(username: "test", password: "test", password_confirmation: "test", diet_id: 1)
    session[:user_id] = @current_user.id


    # Session.create!(@current_user.username, @current_user.password, @current_user.user_id)
  end
end