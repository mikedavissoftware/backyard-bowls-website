require 'test_helper'

class ItemTest < ActiveSupport::TestCase

  def setup
    @item = Item.create(
      name: "Spicy Switchback",
      category: "Bowl",
      image: "https://www.ikea.com/us/en/images/products/blanda-matt-serving-bowl-bamboo__0711988_pe728640_s5.jpg",
      base: "Grain Mix",
      protein: "Marinated Tofu",
      veggies: [
        "Corn",
        "Sweet Bell Peppers",
        "Cucumbers",
        "Pickled Vegetables",
        "Kale",
        "Pepitas"
      ],
      dressing: "Sriracha Cashew Vinaigrette",
      price: 5
    )

    create_comment(@item.id, 1)
    create_like(@item.id, 1)
  end

  test "should be valid" do
    assert @item.valid?, "created item isn't valid"
  end

  test "name should be present" do
    @item.name = ""
    assert_not @item.valid?, "item name should be present"
  end

  test "category should be present" do
    @item.category = ""
    assert_not @item.valid?, "item category should be present"
  end

  test "image should be present" do
    @item.image = ""
    assert_not @item.valid?, "item image should be present"
  end

  test "image address should be web address" do
    @item.image = "www.image.com"
    assert_not @item.valid?, "item address must start with http:// or https://"

    @item.image = "http://..."
    assert @item.valid?, "should pass if starting with http://"
    
    @item.image = "https://..."
    assert @item.valid?, "should pass if starting with https://"
  end

  test "base should be present" do
    @item.base = ""
    assert_not @item.valid?, "item base should be present"
  end

  test "protein should be present" do
    @item.protein = ""
    assert_not @item.valid?, "item protein should be present"
  end

  test "veggies should be present" do
    @item.veggies = ""
    assert_not @item.valid?, "item veggies should be present"
  end

  test "dressing should be present" do
    @item.dressing = ""
    assert_not @item.valid?, "item dressing should be present"
  end

  test "price should be present" do
    @item.price = ""
    assert_not @item.valid?, "item price should be present"
  end

  test "price should be a number" do
    @item.price = "not a number"
    assert_not @item.valid?, "price should be numerical"
  end

  test "price should be greater than 0" do
    @item.price = 0
    assert_not @item.valid?, "price should be > 0"
  end

  test "item count accurate" do
    assert_equal 7, Item.count, "not equal to expected number of 7 items"
  end

  test "item is destroyed" do
    item_id = @item.id
    @item.destroy
    assert_not Item.exists?(id: item_id)
  end
  
  test "dependent comment is destroyed" do
    comment_id = @comment.id
    assert Comment.exists?(id: comment_id)
    @item.destroy
    assert_not Comment.exists?(id: comment_id)
  end

  test "dependent like is destroyed" do
    like_id = @like.id
    assert Like.exists?(id: like_id)
    @item.destroy
    assert_not Like.exists?(id: like_id)
  end

  test "has item through comment" do
    assert Item.exists?(id: @comment.item.id)
  end

  test "has item through like" do
    assert Item.exists?(id: @like.item.id)
  end

end 