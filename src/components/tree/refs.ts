import { ReactNode } from "react";

type TreeNode = ReactNode & any

class Tree {
    name: string;
    tree: TreeNode;
    refs: Record<string, TreeNode> = {}

    constructor(name: string, tree: TreeNode) {
        this.name = name;
        this.tree = tree
        this.refs[name] = this
    }

    get(name: string) {
        return this.refs[name]
    }

    set(tree: TreeNode) {
        const key = tree['props']['propertyKey']
        this.refs[key] = tree
    }
}

let refs: Record<string, TreeNode>  = {}

const init = (name: string, tree: TreeNode) => {
    if (!refs[name]) {
        refs[name] = new Tree(name, tree)
    }

    return refs[name]
}

const destroyed = (name: string) => {
    refs[name] && delete refs[name]
}

const get = (name: string) => {
    return refs[name] && refs[name].get(name)
}

const set = (name: string, tree: TreeNode) => {
    refs[name] && refs[name].set(tree)
}

export {
    init,
    destroyed,
    get,
    set
}