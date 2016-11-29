# Yarin Galmor - DevOps Exercise
#### INTRO
In this exercise I had the chance to learn Ansible,Vagrant and NodeJS.  
In this version, I made two http services - static-panda.js and counting-panda.js.  
Besides of those services, there is an Ansible playbook named base.yml, which contain 3 roles - nodejs, static-panda and counting-panda role.

## Services
####static-panda.js
static-panda.js uses HttpDispatcher module for displaying static files.  
The files are obtained in 'resources' directory at the root folder. (deployed by statis-panda role)  
For an example, there are 2 images of panda (small.png,medium.png), and they're could be access with the URL: server:8080/resources/'image name'.  
If the file is not specified in 'resources' directory, the response will be '404'.  

####counting-panda.js
counting-panda.js uses HttpDispatcher module for displaying real time counter  
of GET requests for this site.
'counter' variable counts the number of GET requests served by a site (initialized with 0).  
There is also 'title' variable for showing nicer display to the user.  

## Ansible Playbook
####base.yml
'base.yml' is an Ansible playbook that deploys the above services. 
The playbook contain 3 roles which will be deploy among all hosts, and can be applyed by any user (become parameter defined as yes). 

####nodejs role
Nodejs role is responsible for installing nodejs and npm which are required for running static-panda.js properly.

####counting-panda role
Counting-panda role managing all the settings that should be set for   
letting the service work.   
The site is served by port 8081 (configured at config.json), and could be access by the URL: <server>:8081/ .  
Counting-panda role made up of 2 main directories - files and tasks.  
'Files' directory contain package.json, config.json and counting-panda.js.    
* package.json has the metadata of this role.(HttpDispartcher is mentioned as a dependency)  
* config.json mention the port for serving the site.

There is one task file, named main.yml, and in contains the followed instructions:     
First, it copies the configuration files to the working directory - /opt/bigpanda/counting-panda.   
Then, it set npm install path to the working directory for the ability of importing HttpDispatcher module.  
At the end, it copies the services files to /etc/init and /etc/init.d and start the service.  

The service runs instantly while deplying this role.  
The service is configured to start it self if it crashes.  
The service is also configured to run as a daemon.  
Console output is written to /var/log/upstart/counting-panda.log.  

####static-panda role
Static-panda role made up of 2 main directories - files and tasks.  
'Files' directory contain package.json, config.json,static-panda.js and recources directory.  
* package.json has the metadata of this role.(HttpDispartcher is mentioned as a dependency)  
* config.json mention the port for serving the site.
* Resources directory contain 2 images of panda - small.png & medium.png .
Similar to counting-panda service, there is one task file, named main.yml, and in contains the followed instructions:     
First, it copies the configuration files to the working directory - /opt/bigpanda/static-panda.   
Then, it set npm install path to the working directory for the ability of importing HttpDispatcher module.  
At the end, it copies the services files to /etc/init and /etc/init.d and start the service.  

The service runs instantly while deplying this role.  
The service is configured to start it self if it crashes.  
The service is also configured to run as a daemon.  
Console output is written to /var/log/upstart/counting-panda.log.  

