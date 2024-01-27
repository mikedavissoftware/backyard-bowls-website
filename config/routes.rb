Rails.application.routes.draw do
  resources :comments
  resources :diets, only: [:index, :show]
  resources :items, only: [:index, :show]
  resources :likes, only: [:index, :show, :create, :destroy]
  resources :users

  root 'application#hello_world'

  post '/signup', to: 'users#create'
  patch '/me', to: 'users#update'
  delete '/me', to: 'users#destroy'

  get '/me', to: 'sessions#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Custom Routes

end
