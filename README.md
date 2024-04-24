# Template

## Setup
### extension
Set up the "key" field of manifest.json first. 
1. Register the chrome extension in https://chrome.google.com/webstore/devconsole.
2. Grab the public key
3. Place in the "key" field of manifest.json
The extension should now have a consistent id

### api
1. Initialize a supabase project

### web
Used for authentication but can also be the extension main page. Passes the authentication token to the extension.