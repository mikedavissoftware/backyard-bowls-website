require 'test_helper'

class CommentTest < ActiveSupport::TestCase

  def setup
    create_comment()
  end

  test "should be valid" do
    assert @comment.valid?, "created comment isn't valid"
  end

  test "comment count accurate" do
    assert_equal 5, Comment.count, "not equal to expected number of 5 comments"
  end

  test "content should be present" do 
    @comment.content = ""
    assert_not @comment.valid?, "comment content should be present"
  end

  test "rating should be present" do
    @comment.rating = nil
    assert_not @comment.valid?, "comment rating should be present"
  end

  test "rating should be in range" do
    @comment.rating = 11
    assert_not @comment.valid?, "comment rating should not be greater than 10"
    @comment.rating = -3
    assert_not @comment.valid?, "comment rating should not be less than 0"
  end

end 