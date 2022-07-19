#!/bin/bash

i=0
while ((++i <= ${NUMBER_OF_REQUESTS})); do
  curl http://jps:5000/getjobdetails/$i >> /data/output.txt
  echo >> /data/output.txt
done

echo "{\"jobs\": [" >> /data/formattedOutput.txt

cat /data/output.txt | while read line
do
  grep -o '"jobId":"[^"]*' | grep -o '[^"]*$' | sed -e 's/^/"/g' -e 's/$/"/g' | tr '\n' ','>> /data/formattedOutput.txt
done
echo "]}" >> /data/formattedOutput.txt
