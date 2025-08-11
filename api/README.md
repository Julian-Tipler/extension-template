# Supabase

## DB
purchases (instead of subscriptions)
user has many purchases. If they buy a pack they get multiple entries
purchase is many to one with products (instead of plans)

### Products
- id
- stripePriceId
- name
- price
- assetUrl
- description

### Purchases
- id
- userId
- purchaseId
