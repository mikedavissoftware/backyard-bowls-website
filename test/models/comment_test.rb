require 'test_helper'

class CommentTest < ActiveSupport::TestCase

  def setup
    @comment = Comment.create(
      content: "I love this bowl!",
      rating: 9,
      user_id: 1,
      item_id: 3
    )
  end

  test "should be valid" do
    assert @comment.valid?, "created comment isn't valid"
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
    assert_not @comment.valid?, "comment rating should be in range 0-10"
  end

end 