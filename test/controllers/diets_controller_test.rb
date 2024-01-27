require 'test_helper'

class DietsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @vegan = diets(:vegan)
  end

  test "INDEX should return all diets" do
    get diets_path
    assert_response :success
    object = JSON.parse(response.body)
    assert object.length == 5
  end

  test "SHOW should return one diet" do
    get diet_path(@vegan)
    assert_response :success
    object = JSON.parse(response.body)
    assert object["diet"] == @vegan.diet
  end

end