class Comment < ApplicationRecord
  belongs_to :item
  belongs_to :user

  validates_presence_of :content, :rating
  validates :rating, numericality: { only_integer: true, in: 0..10 }
end
