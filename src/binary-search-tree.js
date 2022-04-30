const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }
  root() {
    return this.treeRoot;
  }

  add(data) {
    this.treeRoot = addToTree(this.treeRoot, data);
   function addToTree(node, data) {
     if(!node) {
       return new Node(data);
     }
     if (node.data === data) {
       return node;
     }
     if (data < node.data) {
       node.left = addToTree(node.left, data);
     } else {
       node.right = addToTree(node.right, data);
     }
     return node;
   }
  }

  has(data) {
    return searchTreeHasData(this.treeRoot, data);

    function searchTreeHasData(node, data) {
      if(!node) {
        return false;
      }

      if(node.data === data) {
        return true;
      }
      if (data < node.data) {
        return searchTreeHasData(node.left, data);
      } else {
        return searchTreeHasData(node.right, data);
      }
      
    }
  }

  find(data) {
    return findDataInTree(this.treeRoot, data);
    function findDataInTree(node, data) {
      if(!node) {
        return null;
      }
      if(node.data === data) {
        return node;
      }
      return data < node.data ?
      findDataInTree(node.left, data) :
      findDataInTree(node.right, data);
    }
  
  }

  remove(data) {
    this.treeRoot = removeNodeFromTree(this.treeRoot, data);
    function removeNodeFromTree(node, data) {
      if(!node) {
        return null;
      }
      if(data < node.data) {
        node.left = removeNodeFromTree(node.left, data);
        return node;
      } else if( data > node.data) {
        node.right = removeNodeFromTree(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if(!node.right) {
          node = node.left;
          return node;
        }
        let smallestRightNode = node.right;
        while(smallestRightNode.left) {
          smallestRightNode = smallestRightNode.left;
        }
        node.data = smallestRightNode.data;

        node.right = removeNodeFromTree(node.right, smallestRightNode.data);

        return node;
      }
    }
  }

  min() {
      if (!this.treeRoot) {
      return null;
    }

    let node = this.treeRoot;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.treeRoot) {
      return null;
    }

    let node = this.treeRoot;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};