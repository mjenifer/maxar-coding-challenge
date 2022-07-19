# Job Processor Service

## How to run with start script
Note: A prerequisite is that docker needs to be installed. 
//Insert link to docker download

### If running on windows
1. Run the following command `.\start.ps1`
### If running on linux
1. Run the following command `bash ./start.ps1`
   
Note 1: In both cases, the responses will be written to `output.txt` in the current directory the script is getting ran.

Note 2: The number of request can be adjust by modifying the value in the [docker-compose.yml](./docker-compose.yml#L18)

## High level flow
1. The start.sh script will build the job-processor-service docker image
2. It will then start the job-processor-service docker container
3. Next it will create the "runner" docker container
   1. That container will execcute a a script that will send curl requests based on an input environment variable
   2. The script will then output the results of the curl requests to `./output.txt`

## How to run without start script
1. Run the following command
   ```
   docker-compose build
   docker-compose up -d jps
   ```
2. The service can be access via curl.
  * Sample request
    * `curl http://host.docker.internal:5000/getjobdetails/1234`


## Shortcomings
* Runner script is single threaded