require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @username = "sam"
    @password = "foobar"
    login(@username, @password)
  end

  test "SHOW should return current session's user info" do
    get "/me"
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object['username'] == @username, "unexpected value for login username"
  end


end