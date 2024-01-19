require 'test_helper'

class LikeTest < ActiveSupport::TestCase
  
  def setup
    @like = Like.create(
      user_id: 2,
      item_id: 1
    )
  end

  test "like is valid"
end 