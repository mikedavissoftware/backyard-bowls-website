class LikesController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

  def index
    likes = Like.all
    render json: likes
  end

  def show
    like = Like.find(params[:id])
    render json: like
  end

  def create
    like = Like.create!(like_params)
    render json: like, status: :created
  end

  def destroy
    like = Like.find(params[:id])
    like.destroy
    head :no_content
  end

  private
  def like_params
    params.permit(:user_id, :item_id)
  end
end
