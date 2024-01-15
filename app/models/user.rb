class User < ApplicationRecord
  has_secure_password

  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :items, through: :likes
  has_many :items, through: :comments

  belongs_to :diet

  validates_presence_of :username
  validates_uniqueness_of :username
  validates_presence_of :password
  validates :password, length: { in: 6...20 }
  
end
