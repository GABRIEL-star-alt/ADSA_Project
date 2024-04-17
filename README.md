

## Why vcdec?
Traditional version control tools, such as Git repositories, operate under the assumption of a single, centralized blob storage. In the world of IPFS, data is partitioned into chunks and distributed across a network of peers, resulting in an inherently decentralized and immutable data structure. vcdec fills the void by enabling version control in this decentralized paradigm, making it a robust alternative to centralized repository hosting services like GitHub.

## Features
vcdec is built as a Command Line Interface (CLI) tool using javascript, ensuring easy accessibility via the Node Package Manager (npm). Key functionalities have already been implemented, including repository initialization, staging changes, committing, and browsing commit history. We're actively working on adding essential features like branching, merging, commit authorship, and more. Moreover, we plan to utilize DNSLink to establish mutable pointers to commit Content Identifiers (CIDs), potentially turning vcdec into an attractive alternative for static file hosting, like GitHub Pages.

## Data Security
It's crucial to be mindful of what you stage with vcdec. Since IPFS operates as a transparent and immutable protocol, sensitive information should not be included in the staging process. It's a trade-off for the benefits of decentralization and immutability.

## Performance Consideration
Given vcdec's continuous interaction with IPFS nodes, command execution speed may vary. We're actively optimizing performance to provide the best possible experience.

## knn-using -kdtree integration
Upon this , we introduced Knn using kd tree , for a very unique use case , so lets say the working directory has no of branches that has been diverged then and there in the project a team is working on are clumsified with no of changes , now lets assume a particular instance of a project thats there, now we should no at which branch this corresponding contents most probably be there, so that that enhances easy navigation , given the content of the files and the directory structure the above feature can be accomplished  .

A separate function call is made to encode the directory structure and the content of files to numeric datas to fetch in kdtree , while making each commit the kd tree is updated by insertion of this numeric datapoints along with the branch name to building kdtree at each commit, now when the check function is called it takes the query data point and traverses through the kd tree and finds the most matching segment , with consideration of intersections with the other segmentation made in the 2d space by kdtree.All the points are also being stored in IPFS , so as to retrive the previous set of points and  and add the new data point 


## Goals
- Decentralised version control system: Build a project that has version control features in a decentralised manner utilising IPFS
- Multiuser support: Have multiple users author commits and have flexibility to branch out, merge branches etc.
- Mutable pointers: Have a feature to host static content (similar to Github pages) and assign human readable URLs to them using IPNS (InterPlanetary Name System) and DNS linking. 
- Scalability testing: Ensuring that vcdec remains performant and reliable as the size of repositories and user interactions increases.


### Requirements
- Node v18.17.1
- npm v9.6.7

### Installation
- Run yourself,
```bash
$ npm i
$ npm start
```



**Commands:**
```
  init <ipfs_node_url>  Initialize a new vcdec repository

  add [file_path]       Add a file to the vcdec repository

  commit <message>      Commit changes to the vcdec repository

  log                   View the commit history of the vcdec repository

  branch                List all branches in the vcdec repository
  
  jump <branch>         Switch between branches

  check <CID>           to check the most b=matching branch of query file
  
  help [command]        display help for command
```
