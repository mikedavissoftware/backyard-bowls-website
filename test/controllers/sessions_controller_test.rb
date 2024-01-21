require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest

  def setup
    login()
  end

  test "should show current session" do
    get me_path
    assert_response :success
  end

end