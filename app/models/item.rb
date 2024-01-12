class Item < ApplicationRecord
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :users, through: :likes
  has_many :users, through: :comments

  validates_presence_of :name, :category, :image, :base, :protein, :veggies, :dressing, :price

end
