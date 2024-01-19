require 'test_helper'

class UserTest < ActiveSupport::TestCase
  
  def setup
    create_user()
  end
  
  test "should be valid" do
    assert @user.valid?
  end

  test "user count accurate" do
    assert_equal 5, User.count, "not equal to expected number of 5 users"
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
    assert_not @user.valid?
  end

  test "password should be 20 characters or shorter" do
    @user.password = @user.password_confirmation = "x" * 21
    assert_not @user.valid?
  end

end 