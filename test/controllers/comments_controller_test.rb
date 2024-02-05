require 'test_helper'

class CommentsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @comment1 = comments(:comment1)
    @comment2 = comments(:comment2)
  end

  test "INDEX should return all comments, regardless of login" do
    get comments_path
    assert_response :success
    object = JSON.parse(response.body)
    assert object.length == 4
    assert object[3]["rating"] == 1
  end

  test "SHOW should return one comment, regardless of login" do
    get comments_path(@comment2)
    assert_response :success
    object = JSON.parse(response.body)
    assert object[1]["rating"] == 4
  end

  test "CREATE should NOT add a comment IF LOGGED OUT" do
    content = "This is a test comment"
    post comments_path, params: {
      content: content,
      rating: 5,
      user_id: 1,
      item_id: 4
    }
    assert_response 401
  end

  test "CREATE should add a comment and return it IF LOGGED IN" do
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

  test "UPDATE should NOT edit comment IF LOGGED OUT" do
    new_content = "This is a NEW test comment"
    patch comment_path(@comment1), params: {
      content: new_content,
      rating: 9,
      user_id: 1,
      item_id: 4
    }
    assert_response 401
  end

  test "UPDATE should edit comment and return it IF LOGGED IN" do
    new_content = "This is a NEW test comment"
    login()
    patch comment_path(@comment1), params: {
      content: new_content,
      rating: 9,
      user_id: @current_user["id"],
      item_id: 4
    }
    assert_response :success
    object = JSON.parse(response.body)
    assert object["content"] == new_content
    assert object["rating"] == 9
  end

  test "DESTROY should NOT delete any comment IF LOGGED OUT" do
    delete comment_path(@comment1)
    assert_response 401
    delete comment_path(@comment2)
    assert_response 401
  end

  test "DESTROY should delete own user comment IF LOGGED IN" do
    login()
    delete comment_path(@comment1)
    assert_response :success
  end

  test "DESTROY should NOT delete other user comment, even IF LOGGED IN" do
    login()
    delete comment_path(@comment2)
    assert_response 401
  end

end