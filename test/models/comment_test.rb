require 'test_helper'

class CommentTest < ActiveSupport::TestCase

  # test "should not save comment without any params" do
  #   comment = Comment.new
  #   assert_not comment.save, "saved comment without any params"
  # end

  # test "should not save comment without content" do
  #   comment = Comment.new(rating: 5, item_id: 1, user_id: 1)
  #   assert_not comment.save, "saved comment without content"
  # end

  # test "should not save comment without rating" do
  #   comment = Comment.new(content: "commenting comments", item_id: 1, user_id: 1)
  #   assert_not comment.save, "saved comment without rating"
  # end

  # test "should not save comment without item_id" do
  #   comment = Comment.new(rating: 5, content: "commenting comments", user_id: 1)
  #   assert_not comment.save, "saved comment without item_id"
  # end

  # test "should not save comment without user_id" do
  #   comment = Comment.new(rating: 5, content: "commenting comments", item_id: 1)
  #   assert_not comment.save, "saved comment without user_id"
  # end

  test "login helper method works" do
    # create_test_user_and_login
    create_diet
    create_test_user_and_login

    p @current_user.username
    p @current_user.password
    p @current_user.id
    # p @current_user
  end
end 