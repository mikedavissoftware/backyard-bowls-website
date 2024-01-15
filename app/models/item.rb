class Item < ApplicationRecord
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :users, through: :likes
  has_many :users, through: :comments

  validates_presence_of :name, :category, :image, :base, :protein, :veggies, :dressing, :price
  validate :web_address_format
  validates :price, numericality: true
  validates :price, numericality: { greater_than: 0 }

  def web_address_format
    errors.add(:website, "Invalid website format") unless self.image.downcase.start_with?('https://', 'http://')
  end

end
