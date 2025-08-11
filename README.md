# Your Mom

## Description (for AI)

your-mom is a chrome extension with a next.js website. It is an absolutely positioned draggable component that display an 8 bit character meant to resemble the user's mother

## Marketing

"I'm not mad, I'm dissapointed."
"Make your mom proud" (next to smiling pic)
"Mom is always watching"
"A mother knows best

## Features

Popup that displays "absolute" on your screen and watches your browsing history. She can be dragged into any of the top left, right, bottom right, bottom left corners. He is an 8 bit rendering of your mom. Choose from skin color, eye color, hair color/style, and name (optional). She will have a tear in her eye and look sad when you are on porn

Settings page:

- Customize your mom
- Porn mode (on/off)
- Dissapointed website list
- Banned website list

## Future features

- Screen time (of website list)
  - Timer in screen overlay
  - Option to actually block websites after a certain period of time
  - Mom gets sadder and sadder the more you use it
- Your Dad
- Your waifu/husbandfu
- Customize screen overlay
- Mom health bar or some long term stats
- User Metrics display

## Monetization

- Free moms with basic styling
- Each additional mon is 2.99
- Buying a premium one unlocks more expressions

### Implementation:

- user selects free mom
  - take them to Stripe redirect page but check if mom is free. If free, just create the subscription entry
  - if not free take them to stripe page to checkout
  - in stripe hooks trigger creation of subscription
  - they should now be able to see their mom in the chrome extension, which checks the subscriptions table
  - redirect to success page

# Setup

## extension

Set up the "key" field of manifest.json first.

1. Register the chrome extension in https://chrome.google.com/webstore/devconsole.
2. Grab the public key.
3. Place in the "key" field of manifest.json.
   The extension should now have a consistent id.

## api

Used for database and supabase edge functions.

1. Initialize a supabase project.
2. Initialize local supabase. Make sure to stop all running projects first.
3. Set the SUPABASE_API_URL, SUPABASE_FUNCTIONS_URL, and API_ANON_TOKEN into extension, api, and web.

## web

Used for authentication but can also be the extension main page. Passes login authentication token to the extension with chrome messaging API.
Publish website on Vercel
No payment at first (just login)

### google identity api

1. Set up OAuth api in https://console.cloud.google.com/apis/credentials.
2. Paste client_id and secret into config.toml including this block:
   [auth.external.google]
   enabled=true
   client_id = "env(AUTH_GOOGLE_CLIENT_ID)"
   secret = "env(AUTH_GOOGLE_SECRET)"
   redirect_uri="env(REDIRECT_URL)"
3. to .env (the local env) add these:
   AUTH_GOOGLE_CLIENT_ID=
   AUTH_GOOGLE_SECRET=
4. to https://supabase.com/dashboard/project/cykhwgdgewwlucjfwhax/auth/providers (google) add the Client ID and Client Secret.
   copy the Callback Url and insert it in the google api page
5. On the consent screen page make sure to change the App name that shows up to users (otherwise you will get the ugly supabase url instead).
6. I think you have to make a local AND prod google application.

# Running locally

1. npm run build
2. Open chrome://extensions in chrome and unpack dist folder
3. /extension npm run watch
4. /api deno task local
5. /web npm run dev
