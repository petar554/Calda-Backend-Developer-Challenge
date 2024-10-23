Table users {
  id UUID [pk]
  email TEXT [unique]
  username TEXT
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table orders {
  id UUID [pk]
  user_id UUID [ref: > users.id]
  shipping_address TEXT
  recipient_name TEXT
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table order_items {
  id UUID [pk]
  order_id UUID [ref: > orders.id]
  item_id UUID [ref: > items.id]
  quantity INT
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}


Table items {
  id UUID [pk]
  name TEXT
  price DECIMAL(10, 2)
  stock INT
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}
