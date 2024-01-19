class DietsController < ApplicationController
  skip_before_action :authorize

  def index
    diets = Diet.all
    render json: diets
  end

  def show
    diet = Diet.find(params[:id])
  end
  
end
