#!/usr/bin/env node

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null

    }
}

class Tree {
    #root = null;
    constructor(array = []) {
        const arrSort = [...new Set(array)].sort((a, b) => a - b);
        this.#root = this.#buildTree(arrSort)
    }

    #buildTree(arrSort) {
        
        const start = 0;
        const end = arrSort.length -1;
        
        if (start > end) return null;

        const mid = start + Math.floor((end - start) / 2);
        const root = new Node(arrSort[mid]);

        root.left = this.#buildTree(arrSort.slice(0, mid));
        root.right = this.#buildTree(arrSort.slice(mid + 1));

        return root;
        
    }

    includes(value) {
        let current = this.#root;
        while (current !== null) {
            if (current.value === value) {
                return true;
            }
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    insert(value) { 
        if (this.#root === null) {
            this.#root = new Node(value);
            return this;
        };
        if (this.includes(value)) return this;
        let current = this.#root;
        
        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = new Node(value);
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = new Node(value);
                    return this;
                }
                current = current.right;
            }
        };
    }

    deleteItem(value) {
        if (!this.includes(value)) return this;

        if (this.#root === null) return this;

        let current = this.#root;
        let preCurrent = current;
        while (current !== null) {
            if (current.value === value) {
                if (current.left === null && current.right === null) {
                    if (preCurrent.left === current) {
                        preCurrent.left = null
                    } else if (preCurrent.right === current) {
                        preCurrent.right = null
                    } else if (preCurrent === current) {
                        this.#root = null
                    };
                    return this;
                } else if (current.left === null || current.right === null) {
                    let childNode = current.left || current.right;
                    if (preCurrent.left === current) {
                        preCurrent.left = childNode
                    } else if (preCurrent.right === current) {
                        preCurrent.right = childNode
                    } else if (preCurrent === current) {
                        this.#root = childNode
                    };
                    return this;
                } else {
                    const replaceNode = current;
                    preCurrent = current;
                    current = current.right;
                    while (current.left) {
                        preCurrent = current;
                        current = current.left
                    };
                    replaceNode.value = current.value;
                    let childNode = current.right;
                    if (preCurrent.left === current) {
                        preCurrent.left = childNode;
                    } else {
                        preCurrent.right = childNode;
                    };
                    return this;
                }
            };
            preCurrent = current;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        
    }

    levelOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required!");
        };
        if (this.#root === null) return this;
        let current = this.#root;
        this.helperFunction(callback, current);
        return this
    }

    helperFunction(callback, current) {
        callback(current.value);
        if (current.left === null && current.right === null) {
            return this;
        };
        if (current.left !== null) {
            this.helperFunction(callback, current.left)
        };
        if (current.right !== null) {
            this.helperFunction(callback, current.right)
        };
    }

    countHeight() {

    }


    prettyPrint (node = this.#root, prefix = '', isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }

    print() {
        console.log(this.#root)
    }

    printValue(value) {
        console.log("Currently visiting node:", value);
    }

    collectValues(value) {
        const result = [];
        result.push(value);
    }
}

const tree = new Tree([1, 2, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 111, 324]);

tree.print();
tree.prettyPrint();
tree.levelOrderForEach(console.log);





