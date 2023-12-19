class ItemsController < ApplicationController
  skip_before_action :authorize

  def index
    items = Item.all
    render json: items, include: ['likes', 'comments']
  end

  def show
    item = Item.find(params[:id])
    render json: item, include: ['likes', 'comments']
  end

end
