# Yarin Galmor - DevOps Exercise
#### INTRO
In this exercise i had the chance to learn Ansible,Vagrant and NodeJS.  
In this version, i made two service - [static-panda.js](#static-panda.js) and [counting-panda.js](#counting-panda.js).  
Besides of those services, there is an Ansible playbook named [base.yml](#base.yml), which contain 3 roles - [nodejs role](#nodejs role), [static-panda role](#static-panda role) and [counting-panda role](#counting-panda role).

## Services
####static-panda.js
static-panda.js uses HttpDispatcher module for displaying static files.  
The files are obtained in 'resources' directory at the root folder. (deployed by [statis-panda role](#static-panda role))  
For an example, there are 2 images of panda (small.png,medium.png), and they're could be access with the URL: server:8080/resources/'image name'.  
If the file is not specified in 'resources' directory, the response will be '404'.  

####counting-panda.js
counting-panda.js define a simple class named CountingPanda.  
CountingPanda object contain one property (counter) and one method (countGetRequests).  
'counter' property counts the number of GET requests served by a site (initialized with 0).  
'countGetRequest' method get the site's requests, checks if it 'GET'. If it is so, the counter raises by 1, and the method returns the new current value.

## Ansible Playbook
####base.yml
'base.yml' is an Ansible playbook that deploys the above services. 
The playbook contain 3 roles which will be deploy among all hosts, and can be applyed by any user (become parameter defined as yes). 

####nodejs role
Nodejs role is responsible for installing nodejs and npm which are required for running static-panda.js properly.

####counting-panda role
Counting-panda role copy counting-panda.js service to the working directory - /tmp/panda-site. 

####static-panda role
Static-panda role made up of 2 main directories - files and tasks.  
'Files' directory contain package.json, config.json,static-panda.js and recources directory.  
* package.json has the metadata of this role.(HttpDispartcher is mentioned as a dependency)  
* config.json mention the port for serving the site.
* Resources directory contain 2 images of panda - small.png & medium.png .
* The main.yml file (in tasks directory) instruct ansible to first copy the files from 'files' directory (to the path /tmp/panda-site on the host) and afterwards define /tmp/panda-site directory as a path for installing npm packages (needed for installing HttpDispatcher package).  
