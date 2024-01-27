class DietsController < ApplicationController
  skip_before_action :authorize

  def index
    diets = Diet.all
    render json: diets
  end

  def show
    diet = Diet.find(params[:id])
    render json: diet
  end

  private

  def diet_params
    params.permit(:id, :diet)
  end
  
end
