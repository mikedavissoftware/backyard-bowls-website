require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @username = "sam"
    @password = "foobar"
    login(@username)
  end

  test "should show current session's user info" do
    get "/me"
    object = JSON.parse(response.body)
    p object['username']
    assert object['username'] == @username, "username must equal login username"
  end

end