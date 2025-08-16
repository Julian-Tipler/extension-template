# Chrome Extension Authentication with Next.js/Supabase

This README documents how the Chrome extension authenticates with the Next.js/Supabase app and fetches user data.

## Authentication Flow

1. **User Login:**

   - Users log in through the extension popup using their existing credentials from the web app
   - Alternatively, they can visit the web app to create an account
   - The extension uses the same Supabase authentication as the web app

2. **Token Storage:**

   - After successful login, Supabase tokens (access token and refresh token) are stored in Chrome's storage
   - The tokens are used to authenticate API requests to Supabase

3. **Syncing User Data:**

   - The background script periodically syncs user data from Supabase
   - When the content script loads, it fetches the user's selected mom from Chrome storage
   - The background script refreshes tokens when they expire

4. **Security Considerations:**
   - Tokens are stored in Chrome's local storage which is isolated per extension
   - The extension only has permissions for storage and web requests as needed

## Implementation Details

### Components:

1. **AuthProvider:**

   - Handles authentication state management
   - Exposes login/logout functionality
   - Stores and retrieves tokens from Chrome's storage

2. **Background Script:**

   - Manages token refresh
   - Syncs user data periodically
   - Provides an API for the content script

3. **Content Script:**

   - Displays the user's selected mom
   - Changes mom expression based on website context
   - Receives updates when user data changes

4. **Popup Interface:**
   - Provides login UI
   - Shows current selected mom
   - Links back to the web app for account management

## Development Notes

- The extension uses the same Supabase instance as the web app
- Environment variables are needed for Supabase URL and anon key
- Make sure to update the `externally_connectable` field in the manifest.json with your production domain when deploying

## Testing

1. Log in to the web app and select a mom
2. Install the extension and log in with the same credentials
3. The extension should display the selected mom from your web app
4. Change the selected mom in the web app and verify the extension updates (may require a refresh or wait for background sync)
