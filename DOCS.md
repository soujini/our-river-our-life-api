# our-river-our-life-api v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Login](#login)
	- [Create login](#create-login)
	- [Delete login](#delete-login)
	- [Retrieve login](#retrieve-login)
	- [Retrieve logins](#retrieve-logins)
	- [Update login](#update-login)
	
- [Test](#test)
	- [Create test](#create-test)
	- [Delete test](#delete-test)
	- [Retrieve test](#retrieve-test)
	- [Retrieve tests](#retrieve-tests)
	- [Update test](#update-test)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	
- [WaterTestDetails](#watertestdetails)
	- [Create water test details](#create-water-test-details)
	- [Delete water test details](#delete-water-test-details)
	- [Retrieve water test details](#retrieve-water-test-details)
	- [Update water test details](#update-water-test-details)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Login

## Create login



	POST /login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| phoneNumber			| 			|  <p>Login's phoneNumber.</p>							|

## Delete login



	DELETE /login/:id


## Retrieve login



	GET /login/:id


## Retrieve logins



	GET /login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update login



	PUT /login/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| phoneNumber			| 			|  <p>Login's phoneNumber.</p>							|

# Test

## Create test



	POST /test


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| phoneNumber			| 			|  <p>Test's phoneNumber.</p>							|

## Delete test



	DELETE /test/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve test



	GET /test/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve tests



	GET /test


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update test



	PUT /test/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| phoneNumber			| 			|  <p>Test's phoneNumber.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|

# WaterTestDetails

## Create water test details



	POST /water-test-details


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| phoneNumber			| 			|  <p>Water test details's phoneNumber.</p>							|
| generalInformation:			| 			|  <p>{name Water test details's generalInformation:{name.</p>							|
| test			| 			|  <p>} Water test details's test}.</p>							|

## Delete water test details



	DELETE /water-test-details/:id


## Retrieve water test details



	GET /water-test-details


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update water test details



	PUT /water-test-details/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| phoneNumber			| 			|  <p>Water test details's phoneNumber.</p>							|
| generalInformation:			| 			|  <p>{name Water test details's generalInformation:{name.</p>							|
| test			| 			|  <p>} Water test details's test}.</p>							|


