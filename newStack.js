const LinkedList = require('./linked_list')

class Stack {
    constructor() {
        this.size = 0;
        this.first = null;
        this.last = null;
        this._list = new LinkedList();
        // Why _list instead of list?
    }

    // more like unshift
    push(val) {
        this._list.unshift(val)
        this.first = this._list.head
        this.last = this._list.tail
        this.size++;
    }

    // more like shift
    pop() {
        if (this.size === 0) throw new Error('Queue is empty!')

        const firstNode = this._list.shift()
        this.first = this._list.head
        this.last = this._list.tail

        this.size--;
        return firstNode;
    }

    peek() {
        if (this.size === 0) throw new Error('Queue is empty!')
        const firstNode = this._list.getAt(0)
        return firstNode
    }

    isEmpty() {
        return (this.size === 0 ? true : false)
    }
}

module.exports = Stack;

