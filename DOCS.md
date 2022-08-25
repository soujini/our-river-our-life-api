# our-river-our-life-api v0.0.0



- [Blogs](#blogs)
	- [Create blogs](#create-blogs)
	- [Delete blogs](#delete-blogs)
	- [Retrieve blogs](#retrieve-blogs)
	- [Update blogs](#update-blogs)
	
- [FishSanctuaries](#fishsanctuaries)
	- [Create fish sanctuaries](#create-fish-sanctuaries)
	- [Delete fish sanctuaries](#delete-fish-sanctuaries)
	- [Retrieve fish sanctuaries](#retrieve-fish-sanctuaries)
	- [Update fish sanctuaries](#update-fish-sanctuaries)
	
- [FloodAlert](#floodalert)
	- [Create flood alert](#create-flood-alert)
	- [Delete flood alert](#delete-flood-alert)
	- [Retrieve flood alert](#retrieve-flood-alert)
	- [Retrieve flood alerts](#retrieve-flood-alerts)
	- [Update flood alert](#update-flood-alert)
	
- [FloraFauna](#florafauna)
	- [Create flora fauna](#create-flora-fauna)
	- [Delete flora fauna](#delete-flora-fauna)
	- [Retrieve flora fauna](#retrieve-flora-fauna)
	- [Retrieve flora faunas](#retrieve-flora-faunas)
	- [Update flora fauna](#update-flora-fauna)
	
- [FloraFaunaImagesUpload](#florafaunaimagesupload)
	- [Upload flora fauna images upload](#upload-flora-fauna-images-upload)
	
- [Images](#images)
	- [Create images](#create-images)
	- [Delete images](#delete-images)
	- [Retrieve images](#retrieve-images)
	- [Update images](#update-images)
	
- [Pdf](#pdf)
	- [Create pdf](#create-pdf)
	- [Delete pdf](#delete-pdf)
	- [Retrieve pdf](#retrieve-pdf)
	- [Retrieve pdfs](#retrieve-pdfs)
	- [Update pdf](#update-pdf)
	
- [User](#user)
	- [user](#user)
	- [Delete user](#delete-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update user](#update-user)
	
- [WaterTestDetails](#watertestdetails)
	- [Create water test details](#create-water-test-details)
	- [Delete water test details](#delete-water-test-details)
	- [Retrieve water test details](#retrieve-water-test-details)
	- [Update water test details](#update-water-test-details)
	


# Blogs

## Create blogs



	POST /blogs


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| templateType			| 			|  <p>Blogs's templateType.</p>							|
| userId			| 			|  <p>Blogs's userId.</p>							|
| featuredTitle			| 			|  <p>Blogs's featuredTitle.</p>							|
| featuredDescription			| 			|  <p>Blogs's featuredDescription.</p>							|
| featuredPhoto			| 			|  <p>Blogs's featuredPhoto.</p>							|
| featuredAdditionalPhotos			| 			|  <p>Blogs's featuredAdditionalPhotos.</p>							|
| featuredVideo			| 			|  <p>Blogs's featuredVideo.</p>							|
| featuredAdditionalVideos			| 			|  <p>Blogs's featuredAdditionalVideos.</p>							|

## Delete blogs



	DELETE /blogs/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve blogs



	GET /blogs


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update blogs



	PUT /blogs/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| templateType			| 			|  <p>Blogs's templateType.</p>							|
| userId			| 			|  <p>Blogs's userId.</p>							|
| featuredTitle			| 			|  <p>Blogs's featuredTitle.</p>							|
| featuredDescription			| 			|  <p>Blogs's featuredDescription.</p>							|
| featuredPhoto			| 			|  <p>Blogs's featuredPhoto.</p>							|
| featuredAdditionalPhotos			| 			|  <p>Blogs's featuredAdditionalPhotos.</p>							|
| featuredVideo			| 			|  <p>Blogs's featuredVideo.</p>							|
| featuredAdditionalVideos			| 			|  <p>Blogs's featuredAdditionalVideos.</p>							|

# FishSanctuaries

## Create fish sanctuaries



	POST /fish-sanctuaries


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| locationDetails			| 			|  <p>Fish sanctuaries's locationDetails.</p>							|
| habitatCharacteristics			| 			|  <p>Fish sanctuaries's habitatCharacteristics.</p>							|
| managementActions			| 			|  <p>Fish sanctuaries's managementActions.</p>							|
| speciesPictures			| 			|  <p>Fish sanctuaries's speciesPictures.</p>							|
| culturalHistoricalSignificance			| 			|  <p>Fish sanctuaries's culturalHistoricalSignificance.</p>							|

## Delete fish sanctuaries



	DELETE /fish-sanctuaries/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve fish sanctuaries



	GET /fish-sanctuaries


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update fish sanctuaries



	PUT /fish-sanctuaries/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| locationDetails			| 			|  <p>Fish sanctuaries's locationDetails.</p>							|
| habitatCharacteristics			| 			|  <p>Fish sanctuaries's habitatCharacteristics.</p>							|
| managementActions			| 			|  <p>Fish sanctuaries's managementActions.</p>							|
| speciesPictures			| 			|  <p>Fish sanctuaries's speciesPictures.</p>							|
| culturalHistoricalSignificance			| 			|  <p>Fish sanctuaries's culturalHistoricalSignificance.</p>							|

# FloodAlert

## Create flood alert



	POST /flood-alert


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| location			| 			|  <p>Flood alert's location.</p>							|
| latitude			| 			|  <p>Flood alert's latitude.</p>							|
| longitude			| 			|  <p>Flood alert's longitude.</p>							|
| date			| 			|  <p>Flood alert's date.</p>							|
| time			| 			|  <p>Flood alert's time.</p>							|
| photos			| 			|  <p>Flood alert's photos.</p>							|
| experience			| 			|  <p>Flood alert's experience.</p>							|

## Delete flood alert



	DELETE /flood-alert/:id


## Retrieve flood alert



	GET /flood-alert/:id


## Retrieve flood alerts



	GET /flood-alert


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update flood alert



	PUT /flood-alert/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| location			| 			|  <p>Flood alert's location.</p>							|
| latitude			| 			|  <p>Flood alert's latitude.</p>							|
| longitude			| 			|  <p>Flood alert's longitude.</p>							|
| date			| 			|  <p>Flood alert's date.</p>							|
| time			| 			|  <p>Flood alert's time.</p>							|
| photos			| 			|  <p>Flood alert's photos.</p>							|
| experience			| 			|  <p>Flood alert's experience.</p>							|

# FloraFauna

## Create flora fauna



	POST /flora-fauna


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| latitude			| 			|  <p>Flora fauna's latitude.</p>							|
| longitude			| 			|  <p>Flora fauna's longitude.</p>							|
| location			| 			|  <p>Flora fauna's location.</p>							|
| flora			| 			|  <p>Flora fauna's flora.</p>							|
| fauna			| 			|  <p>Flora fauna's fauna.</p>							|
| commonName			| 			|  <p>Flora fauna's commonName.</p>							|
| localName			| 			|  <p>Flora fauna's localName.</p>							|
| scientificName			| 			|  <p>Flora fauna's scientificName.</p>							|

## Delete flora fauna



	DELETE /flora-fauna/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve flora fauna



	GET /flora-fauna/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve flora faunas



	GET /flora-fauna


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update flora fauna



	PUT /flora-fauna/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| latitude			| 			|  <p>Flora fauna's latitude.</p>							|
| longitude			| 			|  <p>Flora fauna's longitude.</p>							|
| location			| 			|  <p>Flora fauna's location.</p>							|
| flora			| 			|  <p>Flora fauna's flora.</p>							|
| fauna			| 			|  <p>Flora fauna's fauna.</p>							|
| commonName			| 			|  <p>Flora fauna's commonName.</p>							|
| localName			| 			|  <p>Flora fauna's localName.</p>							|
| scientificName			| 			|  <p>Flora fauna's scientificName.</p>							|

# FloraFaunaImagesUpload

## Upload flora fauna images upload



	POST /flora-fauna-images-upload


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| flora			| 			|  <p>Flora fauna images upload's flora.</p>							|
| fauna			| 			|  <p>Flora fauna images upload's fauna.</p>							|

# Images

## Create images



	POST /images


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| flora			| 			|  <p>Images's flora.</p>							|
| fauna			| 			|  <p>Images's fauna.</p>							|
| artwork			| 			|  <p>Images's artwork.</p>							|
| groupPicture			| 			|  <p>Images's groupPicture.</p>							|
| activity			| 			|  <p>Images's activity.</p>							|

## Delete images



	DELETE /images/:id


## Retrieve images



	GET /images


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update images



	PUT /images/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| flora			| 			|  <p>Images's flora.</p>							|
| fauna			| 			|  <p>Images's fauna.</p>							|
| artwork			| 			|  <p>Images's artwork.</p>							|
| groupPicture			| 			|  <p>Images's groupPicture.</p>							|
| activity			| 			|  <p>Images's activity.</p>							|

# Pdf

## Create pdf



	POST /pdf


## Delete pdf



	DELETE /pdf/:id


## Retrieve pdf



	GET /pdf/:id


## Retrieve pdfs



	GET /pdf


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update pdf



	PUT /pdf/:id


# User

## user



	POST /user


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| phoneNumber			| 			|  <p>User's phoneNumber.</p>							|

## Delete user



	DELETE /user/:id


## Retrieve user



	GET /user/:id


## Retrieve users



	GET /user


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update user



	POST /user/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| phoneNumber			| 			|  <p>User's phoneNumber.</p>							|

# WaterTestDetails

## Create water test details



	POST /water-test-details


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| userId			| 			|  <p>Water test details's userId.</p>							|
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
| userId			| 			|  <p>Water test details's userId.</p>							|
| generalInformation:			| 			|  <p>{name Water test details's generalInformation:{name.</p>							|
| test			| 			|  <p>} Water test details's test}.</p>							|


