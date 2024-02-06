require 'test_helper'

class CommentsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @comment1 = comments(:comment1)
    @comment2 = comments(:comment2)
  end

  test "INDEX should respond with all comments, REGARDLESS OF LOGIN" do
    get comments_path
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object.length == 4, "responded with incorrect number of comments"
    assert object[3]["rating"] == 1, "unexpected value for rating on chosen comment"
  end

  test "SHOW should respond with one comment, REGARDLESS OF LOGIN" do
    get comments_path(@comment2)
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object[1]["rating"] == 4, "unexpected value for rating on comment"
  end

  test "CREATE should NOT add a comment, IF LOGGED OUT" do
    content = "This is a test comment"
    post comments_path, params: {
      content: content,
      rating: 5,
      user_id: 1,
      item_id: 4
    }
    assert_response 401, "did not respond with expected unauthorized status"
  end

  test "CREATE should add a comment and respond with it, IF LOGGED IN" do
    content = "This is a test comment"
    login()
    post comments_path, params: {
      content: content,
      rating: 5,
      user_id: @current_user["id"],
      item_id: 4
    }
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object["content"] == content, "unexpected value for comment's content"
  end

  test "UPDATE should NOT edit comment, IF LOGGED OUT" do
    new_content = "This is a NEW test comment"
    patch comment_path(@comment1), params: {
      content: new_content,
      rating: 9,
      user_id: 1,
      item_id: 4
    }
    assert_response 401, "did not respond with expected unauthorized status"
  end

  test "UPDATE should edit comment and respond with it, IF LOGGED IN" do
    new_content = "This is a NEW test comment"
    login()
    patch comment_path(@comment1), params: {
      content: new_content,
      rating: 9,
      user_id: @current_user["id"],
      item_id: 4
    }
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object["content"] == new_content, "unexpected value for comment's new content"
    assert object["rating"] == 9, "unexpected value for comment's new rating"
  end

  test "DESTROY should NOT delete any comment, IF LOGGED OUT" do
    delete comment_path(@comment1)
    assert_response 401, "did not respond with expected unauthorized status"
    delete comment_path(@comment2)
    assert_response 401, "did not respond with expected unauthorized status"
  end

  test "DESTROY should delete own user comment, IF LOGGED IN" do
    login()
    delete comment_path(@comment1)
    assert_response :success, "did not respond with success code 200"
  end

  test "DESTROY should NOT delete other user comment, EVEN IF LOGGED IN" do
    login()
    delete comment_path(@comment2)
    assert_response 401, "did not respond with expected unauthorized status"
  end

end