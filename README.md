# hugo-in-the-cloud
Hugo framework on aws (serverless) with S3, CloudFront, API Gateway, Lambda and Lambda@Edge

## Infrastructure (no UI)
* cloudfront
* s3
* lambda
* iam


## s3 config
hugo/
hugo/content/posts/ - s3 notification
www/ - cloudfront

## admin
nav [logout | home ]
home
    - list of posts [ edit | delete ]
    - create new [ + ]
edit
    - title
    - markdown
    - [ save | cancel ]



## CF redirect:

Create S3 bucket, for example: react
Create CloudFront distributions with these settings:
Default Root Object: index.html
Origin Domain Name: S3 bucket domain
Go to Error Pages tab, click on Create Custom Error Response:
HTTP Error Code: 403: Forbidden (404: Not Found, in case of S3 Static Website)
Customize Error Response: Yes
Response Page Path: /index.html
HTTP Response Code: 200: OK


{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E1T74MW4MT7PVE"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::hugostack-content88381566-zso1ma6dyb7d/*"
        }
    ]
}