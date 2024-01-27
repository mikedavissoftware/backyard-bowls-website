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
    comment = Comment.create(comment_params)
    render json: comment, status: :created
  end

  def update
    comment = Comment.find(params[:id])
    comment.update!(comment_params)
    render json: comment, status: :ok
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy!
    head :no_content
  end

  private

  def comment_params
    params.permit(:rating, :content, :item_id, :user_id)
  end
end
