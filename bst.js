#!/usr/bin/env node

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null

    }
}

class Tree {
    #root
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

    prettyPrint (node = this.#root, prefix = '', isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint();



