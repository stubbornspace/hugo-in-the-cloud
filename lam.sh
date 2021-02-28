rm *.zip
cd publisher/
zip -rq ../aaaa.zip *
cd ../

aws lambda update-function-code \
    --function-name  HugoStack-PublisherF0355618-90S6GPQUAL0B \
    --zip-file fileb://aaaa.zip

	