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

####static-panda role
Static-panda role made up of 2 main directories - files and tasks.  
'Files' directory contain package.json, config.json,static-panda.js and recources directory.  
* package.json has the metadata of this role.(HttpDispartcher is mentioned as a dependency)  
* config.json mention the port for serving the site.
* Resources directory contain 2 images of panda - small.png & medium.png .
* The main.yml file (in tasks directory) instruct ansible to first copy the files from 'files' directory (to the path /tmp/panda-site on the host) and afterwards define /tmp/panda-site directory as a path for installing npm packages (needed for installing HttpDispatcher package).  
####counting-panda role
You'll need a linux machine with the ability to run vms.

1. Make sure you have python 2.7 installed. (Ubuntu 14.04 is highly recommended).
1. Install Ansible (version 2.1).
1. Install Vagrant.
1. Install VirtualBox.
1. Mirror this git repo using the instructions [here](https://help.github.com/articles/duplicating-a-repository). Then clone it locally. (**Please DO NOT fork the repo**)
1. Run `vagrant up base` and make sure you can ssh into the machine using `vagrant ssh base`.
1. Inside the vm execute `nodejs /tmp/bamboo-app/bamboo.js`.
1. Open your browser, go to <http://localhost:8080>, you should get some information about how much we love bamboo.

#### Ready for action?
Great.  
Your project is simple, as a DevOps panda you need to have the ability to develop nanoservices and create a mechanism for deploying them.  
Below, you can find the description of your tasks.

###### NodeJS/Python services
Create two basic NodeJs/Python services, the first is static-panda which should serve static files from a directory called `resources`. The directory should contain two files, small.png and medium.png. You may use any image that you like, as long as there is a panda over there.  
The second service shall be called counting-panda, and should just maintain a counter of the amount of GET requests it served, and return it on every GET request it gets.
A sample NodeJS service named bamboo-app already exists  [here](roles/bamboo/files/bamboo-app)

###### Deployment
Create an ansible role for each of the services. The role should install the service and make sure it's ready to be used in **production** (see [General Guidelines](#general-guidelines)). 
A sample role for bamboo-app already exists for your convenience.  (Please note: samples are not full, and do not contain all relevant the details, you're expected to improve them, and add missing tasks).
We understand there might be a short service downtime when re-deploying a service, that’s fine.

###### Wrapper
This part is a **BONUS** part, if you find this exercise simple and short, feel free to do it.  
Create a simple utility for deploying both services. Your utility should support deploying a single service, or all of them.  
Please make sure you have a decent `--help` in your script.

#### Deliverables
A GitHub Pull-Request to **YOUR DUPLICATED REPO**, containing:  

1. The code for both static-panda and counting-panda.
1. Ansible roles which takes care of provisioning both services.
1. Modified base.yml which install ONLY the newly written services on the base VM.
1. **BONUS** A wrapper script on top of ansible-playbook which deploys the latest version of those services.

The Pull-Request should contain a short description of the roles you created, and any other comment you’d like us to know of.

#### General Guidelines
Your code should be as simple as possible, yet well documented and robust.  
Spend some time on designing your solution. 
Think about operational use cases from the real world. Few examples:

1. Can you run the playbook multiple times without any problem?
1. What happens if a service crashes?
1. How much effort will it take to create a new service?
