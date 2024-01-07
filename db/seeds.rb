# DESTROY
puts "💥 Destroying data..."
User.destroy_all
Item.destroy_all
Like.destroy_all
Comment.destroy_all


# RAW VARIABLES
diets = [
  "Regular",
  "Pescatarian",
  "Vegetarian",
  "Vegan",
  "Keto"
]

# ITEMS
puts "🌱 Seeding items..."
# def items_create
  Item.create(
    name: "Spicy Switchback",
    category: "Bowl",
    image: "https://www.ikea.com/us/en/images/products/blanda-matt-serving-bowl-bamboo__0711988_pe728640_s5.jpg",
    base: "Grain Mix",
    protein: "Marinated Tofu",
    veggies: [
      "Corn", 
      "Sweet Bell Peppers", 
      "Cucumbers", "Pickled Vegetables", 
      "Kale", 
      "Pepitas"
    ],
    dressing: "Sriracha Cashew Vinaigrette",
    price: 0
  )
  Item.create(
    name: "Backcountry BBQ",
    category: "Bowl",
    image: "https://www.ikea.com/us/en/images/products/blanda-matt-serving-bowl-bamboo__0711988_pe728640_s5.jpg",
    base: "Grain Mix",
    protein: "Seitan",
    veggies: [
      "Roasted Beets", 
      "Corn", 
      "Sweet Bell Peppers", 
      "Pickled Vegetables", 
      "Kale", 
      "Pepitas", 
      "Crispy Onions"
    ],
    dressing: "BBQ Sauce",
    price: 0
  )
  Item.create(
    name: "Hoisin Headwall",
    category: "Bowl",
    image: "https://www.ikea.com/us/en/images/products/blanda-matt-serving-bowl-bamboo__0711988_pe728640_s5.jpg",
    base: "Grain Mix",
    protein: "Marinated Tofu",
    veggies: [
      "Purple Cabbage", 
      "Sweet Bell Peppers", 
      "Carrots", 
      "Cucumbers", 
      "Kale", 
      "Toasted Peanuts"
    ],
    dressing: "Thai Coconut Vinaigrette",
    price: 0
  )
  Item.create(
    name: "Alpine Apple",
    category: "Bowl",
    image: "https://www.ikea.com/us/en/images/products/blanda-matt-serving-bowl-bamboo__0711988_pe728640_s5.jpg",
    base: "Grain Mix",
    protein: "Seared Tempeh",
    veggies: [
      "Apples",
      "Roasted Beets", 
      "Cucumbers",
      "Sweet Bell Peppers", 
      "Cranberries", 
      "Kale", 
      "Pepitas"
    ],
    dressing: "Apple Cider Vinaigrette",
    price: 0
  )
  Item.create(
    name: "Boulder Chips",
    category: "Side",
    image: "https://assets-global.website-files.com/622a65eb1d2ac4806c863e1c/6271acfb7412c31d3a294b0e_12058_Boulder_Canyon_5.25oz_Classic_Sea_Salt_Avacado_Oil_CC_Kettle_Chip_Bag_Front.webp",
    base: "",
    protein: "",
    veggies: "",
    dressing: "",
    price: 2
  )
  Item.create(
    name: "Kombucha",
    category: "Drink",
    image: "https://cdn.shopify.com/s/files/1/0281/6383/3891/products/Kombucha-Water---New-Bottle_400x.png?v=1675707059",
    base: "",
    protein: "",
    veggies: "",
    dressing: "",
    price: 5
  )
  Item.create(
    name: "Water",
    category: "Drink",
    image: "https://broncoburgers.com/wp-content/uploads/2021/07/Bottled-Water.png",
    base: "",
    protein: "",
    veggies: "",
    dressing: "",
    price: 3
  )
  Item.create(
    name: "Yerba Mate",
    category: "Drink",
    image: "https://images.squarespace-cdn.com/content/v1/59c16a752278e7bd79dd5a12/1569624132573-N1IJDLXBW4PT7UYIJSLN/enlightenmint.png",
    base: "",
    protein: "",
    veggies: "",
    dressing: "",
    price: 3
  )
  Item.create(
    name: diets,
    category: "Diets",
    image: "",
    base: "",
    protein: "",
    veggies: "",
    dressing: "",
    price: 0
  )
# end
# items_create

bowls = Item.all.filter{|item| item.category == "Bowl"}
bowl_names = bowls.map{|bowl| bowl.name}

# USERS
puts "🌱 Seeding users..."
10.times do
  User.create(
    username: Faker::Name.name,
    password: "123",
    image: Faker::Avatar.image,
    fav_bowl: bowl_names[rand(0..(bowl_names.length-1))],
    diet: diets[rand(0..(diets.length-1))]
  )
end
User.create(
  username: "Tom",
  password: "123",
  image: "https://i.insider.com/4efd9b8b69bedd682c000022?width=750&format=jpeg&auto=webp",
  fav_bowl: bowl_names[rand(0..(bowl_names.length-1))],
  diet: diets[rand(0..(diets.length-1))]
)


# COMMENTS
puts "🌱 Seeding comments..."
(1..bowls.length).to_a.map{|bowl_id|
  user_ids = (1..User.all.length).to_a.shuffle.take(rand(2..5))
  user_ids.map{|user_id|
    Comment.create(
      content: Faker::Lorem.paragraph(sentence_count: 3),
      rating: rand(1..10),
      user_id: user_id,
      item_id: bowl_id
    )
  }
}


# LIKES
puts "🌱 Seeding likes..."
(1..(Item.count - 1)).to_a.map{|item_id|
  user_ids = (1..User.all.length).to_a.shuffle.take(rand(2..5))
  user_ids.map{|user_id|
    Like.create(
      user_id: user_id,
      item_id: item_id
    )
  }
}


# DONE
puts "🌱 Done seeding!"