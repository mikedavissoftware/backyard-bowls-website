require 'test_helper'

class DietTest < ActiveSupport::TestCase

  def setup
    create_diet()
    create_user(@diet.id)
  end

  test "should be valid" do
    assert @diet.valid?
  end

  test "diet count accurate" do
    assert_equal 6, Diet.count, "not equal to expected number of 6 diets"
  end

  test "should have associated user" do
    assert User.exists?(id: @diet.users.first.id)
  end

end 