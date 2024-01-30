require 'test_helper'

class LikesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @like1 = likes(:like1)
    @like2 = likes(:like2)
  end

  test "INDEX should return all likes" do
    get likes_path
    assert_response :success
    object = JSON.parse(response.body)
    assert object.length == 2
    assert object[1]["user_id"] == 3
  end

  test "SHOW should return all likes" do
    get like_path(@like1)
    assert_response :success
    object = JSON.parse(response.body)
    assert object["user_id"] == 1
  end

  test "CREATE should NOT work without authorization" do
    post likes_path, params: {
      user_id: 1,
      item_id: 1
    }
    assert_response 401
  end

  test "CREATE should add a like and return it" do
    login()
    post likes_path, params: {
      user_id: 3,
      item_id: 1
    }
    p response.body
  end

end