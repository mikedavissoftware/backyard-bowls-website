require 'test_helper'

class ItemsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @item3 = items(:item3)
  end

  test "INDEX should respond with all items, REGARDLESS OF LOGIN" do
    get items_path
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object.length == 6, "responded with incorrect number of items"
    assert object[@item3.id - 1]["name"] == @item3.name, "unexpected value for name on chosen item"
  end

  test "SHOW should respond with one item, REGARDLESS OF LOGIN" do
    get item_path(@item3)
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object["name"] == @item3.name, "unexpected value for name on item"
  end

end