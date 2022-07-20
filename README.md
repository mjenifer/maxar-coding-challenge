# Job Processor Service

## How to run with start script
Note: A prerequisite is that docker needs to be installed. 
https://docs.docker.com/get-docker/
You may get prompted to install WSL when docker starts. If it happens then download
https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi and install it then restart docker
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
   3. The runner container will then format the REST results into the desired output of `{"jobs": [jobIds]}` to `./formattedOutput.txt`

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
* Desired formatted the output is handled by a script and not within the program itself
* Another program for executing the GET requests would of been better than a bash script. Another Typescript program would be able to handle pararallel requests a lot beter than accomplishing it in bash. Or maybe used Postman for creating the requests.
* Move the actual formatting of the output data to the program instead of handling it in a shell script. Would of made things a lot easier and is also what is called out in the requirements.
* How the formatted data is created is pretty janky.
