class RemoveDietFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :diet, :string
  end
end
