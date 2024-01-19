require 'test_helper'

class LikeTest < ActiveSupport::TestCase
  
  def setup
    create_like()
  end

  test "should be valid" do
    assert @like.valid?, "created item isn't valid"
  end

  test "belongs to an existing user" do
    assert User.exists?(id: @like.user.id)
  end

  test "belongs to an existing item" do
    assert Item.exists?(id: @like.item.id)
  end

end 