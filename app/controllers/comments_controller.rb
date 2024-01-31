class CommentsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

  def index
    comments = Comment.all
    render json: comments
  end

  def show
    comment = Comment.find(params[:id])
    render json: comment
  end

  def create
    if session[:user_id] == params[:user_id].to_i
      comment = Comment.create(comment_params)
      render json: comment, status: :created
    else
      render json: {errors: ["Cannot create comments for other users."]}, status: :unauthorized
    end
  end

  def update
    comment = Comment.find(params[:id])
    if session[:user_id] == params[:user_id].to_i
      comment.update!(comment_params)
      render json: comment, status: :ok
    else
      render json: {errors: ["Cannot update other users' comments."]}, status: :unauthorized
    end
  end

  def destroy
    p params[:user_id]
    comment = Comment.find(params[:id])
    if session[:user_id] == params[:user_id].to_i
      comment.destroy!
      head :no_content
    else
      render json: {errors: ["Cannot delete other users' comments."]}, status: :unauthorized
    end
  end

  private

  def comment_params
    params.permit(:rating, :content, :item_id, :user_id)
  end
end
