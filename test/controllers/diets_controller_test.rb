require 'test_helper'

class DietsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @vegan = diets(:vegan)
  end

  test "INDEX should respond with all diets, REGARDLESS OF LOGIN" do
    get diets_path
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object.length == 5, "responded with incorrect number of diets"
    assert object[3]["diet"] == @vegan.diet, "unexpected value for diet on chosen diet"
  end

  test "SHOW should respond with one diet, REGARDLESS OF LOGIN" do
    get diet_path(@vegan)
    assert_response :success, "did not respond with success code 200"
    object = JSON.parse(response.body)
    assert object["diet"] == @vegan.diet, "unexpected value for diet on diet"
  end

end