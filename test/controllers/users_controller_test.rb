require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:frodo)
    @other_user = users(:samwise)
  end

  test "INDEX should show all users" do
    get users_path
    object = JSON.parse(response.body)
    assert object.length == 4
    assert object[0]["username"] == "frodo"
  end

  test "SHOW should show one user" do
    get user_path(@user)
    object = JSON.parse(response.body)
    assert object["username"] == "frodo"
  end

  test "SHOW should return scrambled password" do
    get user_path(@user)
    object = JSON.parse(response.body)
    assert_not object["password_digest"] == "foobar"
  end

  test "CREATE should create a new user" do
    username = "new user"
    post '/signup', params: {
      username: username,
      password: "password",
      password_confirmation: "password",
      image: "http://image.com",
      fav_bowl: "My Favorite Bowl",
      diet_id: 1
    }
    assert_response :success
    object = JSON.parse(response.body)
    assert object["username"] == username
  end

  test "UPDATE should edit user if logged in" do
    login()
    patch user_path(@user), params: {
      username: "new username",
      password: "foobar",
      password_confirmation: "foobar",
      image: @user.image,
      fav_bowl: @user.fav_bowl,
      diet_id: @user.diet_id
    }
    object = JSON.parse(response.body)
    assert object["username"] == "new username"
  end

  test "UPDATE should NOTE edit user if not logged in" do
    patch user_path(@user), params: {
      username: "new username",
      password: "foobar",
      password_confirmation: "foobar",
      image: @user.image,
      fav_bowl: @user.fav_bowl,
      diet_id: @user.diet_id
    }
    assert_response 401
  end

  test "DESTROY should delete user if logged in" do
    login()
    delete user_path(@user)
    assert_response :success
    assert response.body == ""
  end

  test "DESTROY should NOT delete user if not logged in" do
    delete user_path(@user)
    assert_response 401
  end

end