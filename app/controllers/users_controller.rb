class UsersController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create]
  
  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    render json: user, include: ['likes', 'comments']
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def update
    if session[:user_id] == params[:user_id].to_i
      @current_user.update!(user_params)
      render json: @current_user, status: :accepted
    else
      render json: {errors: ["Cannot update other user's information."]}, status: :unauthorized
    end
  end

  def destroy
    if session[:user_id] == params[:user_id].to_i
      @current_user.destroy
      head :no_content
    else
      render json: {errors: ["Cannot delete other users."]}, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :image, :fav_bowl, :diet_id)
  end
end
