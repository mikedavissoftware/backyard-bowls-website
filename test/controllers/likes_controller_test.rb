require 'test_helper'

class LikesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @like1 = likes(:like1)
    @like2 = likes(:like2)
  end

  test "INDEX should respond with all likes, REGARDLESS OF LOGIN" do
    get likes_path
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object.length == 2, "responded with incorrect number of likes"
    assert object[1]["user_id"] == @like2.user_id, "unexpected value for user_id on chosen like"
  end

  test "SHOW should respond with one like, REGARDLESS OF LOGIN" do
    get like_path(@like1)
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object["user_id"] == 1, "unexpected value for user_id on like"
  end

  test "CREATE should NOT add a like, IF LOGGED OUT" do
    post likes_path, params: {
      user_id: 1,
      item_id: 1
    }
    assert_response 401, "did not respond with expected unauthorized status"
  end

  test "CREATE should add a like and respond with it, IF LOGGED IN" do
    login()
    post likes_path, params: {
      user_id: 1,
      item_id: 3
    }
    assert_response :success, "did not respond with success code 200"
  end

  test "CREATE should not add a like with a user_id different from current user" do
    login()
    post likes_path, params: {
      user_id: 3,
      item_id: 2
    }
    assert_response 401, "did not respond with expected unauthorized status"
  end

end