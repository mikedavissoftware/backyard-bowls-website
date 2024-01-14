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

  test "name should be present" do
    @user.username = "     "
    assert_not @user.valid?
  end
end 