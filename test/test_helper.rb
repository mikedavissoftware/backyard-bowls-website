ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
 
class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.(yml|csv) for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  fixtures :all
 
  # Add more helper methods to be used by all tests here...

  def create_comment(item_id = rand(1..Item.all.length), user_id = rand(1..User.all.length))
    @comment = Comment.create(
      content: "This here is what they call a test comment.",
      rating: rand(0..10),
      item_id: item_id,
      user_id: user_id
    )
  end

  def create_diet()
    @diet = Diet.create(
      diet: "Test Diet"
    )
  end

  def create_item()
    @item = Item.create(
      name: "Test Item",
      category: "Bowl",
      image: "https://testitem.com",
      base: "Grain Mix",
      protein: "Tofu",
      veggies: [
        "Test Ingredient 1",
        "Test Ingredient 2",
        "Test Ingredient 3",
      ],
      dressing: "Oil & Vinegar",
      price: 10
    )
  end

  def create_like(item_id = rand(1..Item.all.length), user_id = rand(1..User.all.length))
    @like = Like.create(
      item_id: item_id,
      user_id: user_id
    )
  end

  def create_user(diet_id = rand(1..Diet.all.length))
    @user = User.create(
      username: "Test User",
      password: "testpassword",
      image: "https://testimage.com",
      fav_bowl: "Test Bowl",
      diet_id: diet_id
    )
  end

  def login(username = "frodo", password = "foobar")
    post "/login", params: { 
      username: username,
      password: password
    }
    assert_response :success
  end

end