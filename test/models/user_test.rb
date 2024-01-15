require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      username: "aragorn",
      password: "foobar", 
      password_confirmation: "foobar",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7P4nG9YWYqV5l7uZJ3So1jKGMQl8tNoy1XTZZ2IDoDQ&s",
      fav_bowl: "Bowl 5",
      diet_id: 5
    )
  end
  
  test "should be valid" do
    assert @user.valid?
  end

  test "username should be present" do
    @user.username = ""
    assert_not @user.valid?
  end

  test "username should be unique" do
    @user.username = "frodo"
    assert_not @user.valid?
  end

  test "password should be present" do
    @user.password = @user.password_confirmation = " " * 6
    assert_not @user.valid?
  end

  test "password should be 6 characters or longer" do
    @user.password = @user.password_confirmation = "x" * 3
    p @user.password
    assert_not @user.valid?
  end

  test "password should be 20 characters or shorter" do
    @user.password = @user.password_confirmation = "x" * 21
    assert_not @user.valid?
  end

end 