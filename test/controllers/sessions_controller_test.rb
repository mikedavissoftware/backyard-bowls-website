require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest

  test "SHOW should return current session's user info" do
    login()
    get "/me"
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object['username'] == "frodo", "unexpected value for login username"
  end

end