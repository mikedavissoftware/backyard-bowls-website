class User < ApplicationRecord
  has_secure_password

  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :items, through: :likes
  has_many :items, through: :comments

  belongs_to :diet

  validates_presence_of :username, :diet_id
  validates_uniqueness_of :username
  # validates :password, length: in: {8..20}
end
