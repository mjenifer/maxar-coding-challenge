#!/bin/bash

i=0
while ((++i <= ${NUMBER_OF_REQUESTS})); do
  libcurl http://jps:5000/getjobdetails/$i >> /data/output.txt
  echo >> /data/output.txt
done