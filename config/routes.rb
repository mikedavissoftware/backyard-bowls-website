Rails.application.routes.draw do
  resources :users
  resources :likes
  resources :comments
  resources :items
  resources :diets

  root 'application#hello_world'

  post '/signup', to: 'users#create'
  patch '/me', to: 'users#update'
  delete '/me', to: 'users#destroy'

  get '/me', to: 'sessions#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Custom Routes
  get '/comments_by_item/:id', to: 'comments#comments_by_item'

end
