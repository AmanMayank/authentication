# authentication

A complete authentication system which can be used as a starter code for creating any new application

The app can perform the following functions - 

- Sign up with email
- Sign in (you can redirect to a blank home page with a logout button after sign in)
- Sign out
- Reset password after sign in
- The password stored in the db is encrypted
- Google login/signup (Social authentication)

Steps to setup the application on local system - 

1. Register for Google api - https://support.google.com/cloud/answer/6158849?hl=en
2. In the passport.js file edit line 35, 36 and 37
    Hint = callbackURL:'http://localhost:5000/users/auth/google/callback'
3. In App.js line 56, update port of your choice.
4. In App.js line 13, need to update link for MongoDb database which can be setup locally or through Atlas Cloud services - https://www.mongodb.com/cloud/atlas/lp/try2-in?utm_source=google&utm_campaign=gs_apac_india_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624347&gclid=CjwKCAjwgOGCBhAlEiwA7FUXkk-edcq0C-ZmlF_IGNul3FB1EGKb5zIVPNUOcGupiIOaHK8QXORkCRoC-EkQAvD_BwE
5. You are good to go after initializing Node.
