require 'test_helper'

class CommentsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @comment1 = comments(:comment1)
    @comment2 = comments(:comment2)
  end

  test "INDEX should show all comments, regardless of login" do
    get comments_path
    object = JSON.parse(response.body)
    assert object.length == 4
    assert object[3]["rating"] == 1
  end

  test "SHOW should show one comment, regardless of login" do
    get comments_path(@comment2)
    assert_response :success
    object = JSON.parse(response.body)
    assert object[1]["rating"] == 4
  end

  test "if not logged in, CREATE should NOT add a comment" do
    content = "This is a test comment"
    post comments_path, params: {
      content: content,
      rating: 5,
      user_id: 1,
      item_id: 4
    }
    assert_response 401
  end

  test "if logged in, CREATE should add a comment and return it" do
    content = "This is a test comment"
    login()
    post comments_path, params: {
      content: content,
      rating: 5,
      user_id: @current_user["id"],
      item_id: 4
    }
    assert_response :success
    object = JSON.parse(response.body)
    assert object["content"] == content
  end

  test "UPDATE should edit comment" do

  end
  
end