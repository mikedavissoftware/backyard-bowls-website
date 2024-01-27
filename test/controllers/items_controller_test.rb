require 'test_helper'

class ItemsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @item = items(:item3)
  end

  test "INDEX should return all items" do
    get items_path
    assert_response :success
    object = JSON.parse(response.body)
    assert object.length == 6
    assert object[@item.id - 1]["name"] == "side1"
  end

  test "SHOW should return one item" do
    get item_path(@item)
    assert_response :success
    object = JSON.parse(response.body)
    assert object["name"] == @item.name
  end

end