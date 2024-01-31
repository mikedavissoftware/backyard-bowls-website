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
    if session[:user_id] == params[:user_id].to_i
      like = Like.create!(like_params)
      render json: like, status: :created
    else
      render json: {errors: ["Cannot create likes for other users."]}, status: :unauthorized
    end
  end

  def destroy
    like = Like.find(params[:id])
    if session[:user_id] == params[:user_id].to_i
      like.destroy
      head :no_content
    else
      render json: {errors: ["Cannot delete likes from other users."]}, status: :unauthorized
    end
  end

  private
  def like_params
    params.permit(:user_id, :item_id)
  end
end
