

# Setup
## extension
Set up the "key" field of manifest.json first. 
1. Register the chrome extension in https://chrome.google.com/webstore/devconsole.
2. Grab the public key
3. Place in the "key" field of manifest.json
The extension should now have a consistent id

## api
Used for database and supabase edge functions
1. Initialize a supabase project

## web
Used for authentication but can also be the extension main page. Passes the authentication token to the extension.

### google identity api
1. Set up OAuth api in https://console.cloud.google.com/apis/credentials
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

