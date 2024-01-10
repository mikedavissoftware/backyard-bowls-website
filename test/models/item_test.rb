require 'test_helper'

class ItemTest < ActiveSupport::TestCase
  test "should not save without name" do
    item = Item.new
    assert_not item.save, "Saved item without name"
  end

  test "should not save without category" do
    item = Item.new
    assert_not item.save, "Saved item without category"
  end
end 