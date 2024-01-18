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

  def create_comment(item_id = 1, user_id = 1)
    @comment = Comment.create(
      content: "This here is what they call a test comment.",
      rating: 5,
      item_id: item_id,
      user_id: user_id
    )
  end

  def create_like(item_id = 1, user_id = 1)
    @like = Like.create(
      item_id: item_id,
      user_id: user_id
    )
  end

end