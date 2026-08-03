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


-POST/request/review/status:/:requestId
where status->accepted/rejected

## userRouter 
-GET/user/connections
-GET/user/requests
-GET/user/feed

Stauts:Ignored,intrested,accepted,rejected