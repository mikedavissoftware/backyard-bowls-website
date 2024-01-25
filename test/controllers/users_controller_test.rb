require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:frodo)
    @other_user = users(:samwise)
  end

  test "should show all users" do
    get users_path
    object = JSON.parse(response.body)
    assert object.length == 4
    assert object[0]["username"] == "frodo"
  end

  test "should show one user" do
    get user_path(@user)
    object = JSON.parse(response.body)
    assert object["username"] == "frodo"
  end

  test "should return scrambled password" do
    get user_path(@user)
    object = JSON.parse(response.body)
    assert_not object["password_digest"] == "foobar"
  end

  test "should create a new user" do

  end

  test "should edit user if logged in" do
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

  test "should not edit user if not logged in" do
    patch user_path(@user), params: {
      username: "new username",
      password: "foobar",
      password_confirmation: "foobar",
      image: @user.image,
      fav_bowl: @user.fav_bowl,
      diet_id: @user.diet_id
    }
    assert_response :unauthorized
  end

end