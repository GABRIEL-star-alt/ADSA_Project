// Number of dimensions
import { create, globSource } from "ipfs-http-client";
import { Isvcdec } from "../utils/checkvcdec.js";
import fs from 'fs';
import { FetchConfig } from "../utils/fetchConfig.js";
const k = 2;
const cwd=process.cwd()
console.log(cwd)
Isvcdec(cwd);
const client = create({ url: FetchConfig(cwd).ipfs_node_url });
// A structure to represent node of kd tree
class Node {
    constructor(point) {
        this.point = point;
        this.left = null;
        this.right = null;
    }
}

// A method to create a node of K D tree
function newNode(point) {
    return new Node(point);
}

// Inserts a new node and returns root of modified tree
// The parameter depth is used to decide axis of comparison
function insertRec(root, point, depth) {
    // Tree is empty?
    if (!root) {
        return newNode(point);
    }

    // Calculate current dimension (cd) of comparison
    const cd = depth % k;

    // Compare the new point with root on current dimension 'cd'
    // and decide the left or right subtree
    if (point[cd] < root.point[cd]) {
        root.left = insertRec(root.left, point, depth + 1);
    } else {
        root.right = insertRec(root.right, point, depth + 1);
    }

    return root;
}

// Function to insert a new point with given point in
// KD Tree and return new root. It mainly uses above recursive
// function "insertRec()"
export async function insert(root, point) {
    return insertRec(root, point, 0);
}

// A utility method to determine if two Points are same
// in K Dimensional space
function arePointsSame(point1, point2) {

    // Compare individual coordinate values
    for (let i = 0; i < k; i++) {
        if (point1[i] !== point2[i]) {
            return false;
        }
    }

    return true;
}

// Searches a Point represented by "point[]" in the K D tree.
// The parameter depth is used to determine current axis.
function searchRec(root, point, depth) {

    // Base cases
    if (!root) {
        return false;
    }

    if (arePointsSame(root.point, point)) {
        return true;
    }

    // Current dimension is computed using current depth and total
    // dimensions (k)
    const cd = depth % k;

    // Compare point with root with respect to cd (Current dimension)
    if (point[cd] < root.point[cd]) {
        return searchRec(root.left, point, depth + 1);
    }

    return searchRec(root.right, point, depth + 1);
}

// Searches a Point in the K D tree. It mainly uses
// searchRec()
function search(root, point) {

    // Pass current depth as 0
    return searchRec(root, point, 0);
}

// Calculate Euclidean distance between two points
function euclideanDistance(point1, point2) {
    let sum = 0;
    for (let i = 0; i < k; i++) {
        sum += Math.pow(point1[i] - point2[i], 2);
    }
    return Math.sqrt(sum);
}

// K Nearest Neighbors using KD-tree
function knn(root, queryPoint, k) {
    let nearestNeighbors = [];

    // Function to recursively search and update nearest neighbors
    function searchNeighbors(node, depth) {
        if (!node) return;

        const cd = depth % k;
        const distance = euclideanDistance([node.point[0], node.point[1]], [queryPoint[0], queryPoint[1]]);

        // Insert node into nearest neighbors array
        nearestNeighbors.push({ point: node.point, distance });

        // Sort nearest neighbors array by distance
        nearestNeighbors.sort((a, b) => a.distance - b.distance);

        // If nearest neighbors array size exceeds k, remove the farthest neighbor
        if (nearestNeighbors.length > k) {
            nearestNeighbors.pop();
        }

        // Check if we need to search subtrees
        if (queryPoint[cd] < node.point[cd]) {
            searchNeighbors(node.left, depth + 1);
            // Check if we need to search the other subtree (ball intersecting the splitting plane)
            if (Math.abs(queryPoint[cd] - node.point[cd]) < nearestNeighbors[nearestNeighbors.length - 1].distance) {
                searchNeighbors(node.right, depth + 1);
            }
        } else {
            searchNeighbors(node.right, depth + 1);
            // Check if we need to search the other subtree (ball intersecting the splitting plane)
            if (Math.abs(queryPoint[cd] - node.point[cd]) < nearestNeighbors[nearestNeighbors.length - 1].distance) {
                searchNeighbors(node.left, depth + 1);
            }
        }
    }

    // Start the search
    searchNeighbors(root, 0);

    // Include the string part in the result
    return nearestNeighbors.map(neighbor => ({ point: neighbor.point, stringPart: neighbor.point[2] }));
}

// Driver program to test above functions
let root = null;

let pointss=[]
Isvcdec(cwd);

fs.access(cwd + "/.vcdec/kddata", fs.constants.F_OK, (err) => {
    if (err) {
        console.error("File path does not exist or is inaccessible.");
    } else {
        console.log("File path exists.");
    }
});
// let prevSnapshot="sfkjn"
export async function neww(root,pointss,dataaa){
let n11=pointss.length
console.log(n11)
for(let i=0;i<n11;i++){

    root=insert(root,point)
}
printnn(dataaa)
}
console.log(root)

export async function printnn(queryPoint1){

console.log(queryPoint1)
    const nearestNeighbors1 = knn(root, queryPoint1, 5);
    console.log('Nearest neighbors to point 1:', nearestNeighbors1);
}


