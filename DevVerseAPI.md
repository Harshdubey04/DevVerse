# Api Lists
## authRouter
-POST/signup
-POST/login
-POST/logout

## profileRouter
-GET/profile/view
-PATCH/profile/edit
-PATCH/profile/password

## connectionRequestRouter
-POST/request/send/status:/:userId
where status->ignored/interested


-POST/request/review/status:/:ConnectionId
where status->accepted/rejected 

## userRouter 
-GET/user/connections
-GET/user/requests/received
-GET/user/feed
-GET user/:id

## Feed logic
if Virat is logged in user then Virat should not see-
-Users to whom Virat has already sent a request (interested or ignored)
-Users who have sent a request to Virat
-Users who are already connected with Virat (accepted)

Stauts:Ignored,intrested,accepted,rejected