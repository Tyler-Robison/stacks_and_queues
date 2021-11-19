class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.arr = [];
        this.size = 0;
    }

    // more like unshift
    // end of array is "top" of stack
    // Allows push/pop -> O(1) instead of O(n) from shift/unshift
    // this.first is last ele of array
    push(val) {
        this.arr.push(val)
        this.first = this.arr[this.arr.length - 1]
        this.last = this.arr[0]
        this.size = this.arr.length
    }

    // more like shift
    pop() {
        if (this.arr.length === 0) throw new Error('Queue is empty!')

        this.first = this.arr[this.arr.length - 1]
        this.last = this.arr[0]
        const poppedEle = this.arr.pop();
        this.size = this.arr.length
        return poppedEle;
    }

    peek() {
        if (this.arr.length === 0) throw new Error('Queue is empty!')

        return this.arr[this.arr.length - 1]
    }

    isEmpty() {
        return (this.arr.length === 0 ? true : false)
    }
}

class Queue {
    constructor() {
        this.size = 0;
        this.first = null;
        this.last = null;
        this.arr = [];
    }

    enqueue(val) {
        this.arr.push(val)
        this.first = this.arr[0]
        this.last = this.arr[this.arr.length - 1]
        this.size = this.arr.length
    }

    dequeue() {
        if (this.arr.length === 0) throw new Error('Queue is empty!')

        const firstNode = this.arr.shift()
        this.first = this.arr[0]
        this.last = this.arr[this.arr.length - 1]

        this.size = this.arr.length
        return firstNode;
    }

    peek() {
        if (this.arr.length === 0) throw new Error('Queue is empty!')
        return this.arr[0]
    }

    isEmpty() {
        return (this.arr.length === 0 ? true : false)
    }
}

module.exports = { Stack, Queue };