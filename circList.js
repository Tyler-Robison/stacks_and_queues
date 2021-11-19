class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

// singly linked circular list
class CircularLinkedList2 {
    constructor(vals = []) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        for (let val of vals) this.push(val);
    }

    push(val) {
        const newNode = new Node(val)

        // If list is empty, newNode is head/tail
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }

        // If not empty, newNode becomes tail
        else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
    }

    pop() {
        if (!this.head) throw new Error('Circ List is empty!')

        let currentNode = this.head;

        // If list contains 1 item, empty list and return item
        if (!currentNode.next) {
            const prevTail = this.tail
            this.head = null;
            this.tail = null;
            this.length--
            return prevTail.val
        }

        // list contains >= 2 items
        while (currentNode) {
            // When reach 2nd to last element
            if (!currentNode.next.next) {
                const prevTail = currentNode.next
                currentNode.next = null
                this.tail = currentNode;
                this.length--
                return prevTail.val
            }
            currentNode = currentNode.next
        }
    }


}

class LinkedList {
    constructor(vals = []) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        for (let val of vals) this.push(val);
    }

    /** push(val): add new value to end of list. */

    traverse() {
        if (!this.head) return 'List is empty'
        let currentNode = this.head;
        while (currentNode) {
            console.log(currentNode.val);
            currentNode = currentNode.next
        }
    }

    push(val) {
        const newNode = new Node(val)

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }

        else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
    }

    /** unshift(val): add new value to start of list. */

    unshift(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }

        else {
            const prevHead = this.head
            this.head = newNode;
            this.head.next = prevHead
        }
        this.length++
    }

    /** pop(): return & remove last item. */

    // popped d -> c -> a -> d (d wasn't in this at this point)
    pop() {
        // list contains 0 items
        if (!this.head) throw 'List is empty!'
        let currentNode = this.head;

        // If list contains only 1 item, empty it
        if (!currentNode.next) {
            const prevTail = this.tail
            this.head = null;
            this.tail = null;
            this.length--
            return prevTail.val
        }

        // list contains >= 2 items
        while (currentNode) {
            if (!currentNode.next.next) {
                const prevTail = currentNode.next
                currentNode.next = null
                this.tail = currentNode;
                this.length--
                return prevTail.val
            }
            currentNode = currentNode.next
        }
    }

    /** shift(): return & remove first item. */

    shift() {
        if (!this.head) throw 'List is empty!'
        let currentNode = this.head;

        // If list contains only 1 item, empty it
        if (!currentNode.next) {
            const prevHead = this.head
            this.head = null;
            this.tail = null;
            this.length--
            return prevHead.val
        }

        // list contains >= 2 items
        const prevHead = this.head
        this.head = currentNode.next
        this.length--
        return prevHead.val
    }

    /** getAt(idx): get val at idx. */

    getAt(idx) {
        let nodeCount = 0;
        if (!this.head) throw 'List is empty!'
        let currentNode = this.head;
        while (currentNode) {
            if (idx === nodeCount) return currentNode.val
            nodeCount++
            currentNode = currentNode.next
        }
        return `List does not contain index ${idx}`
    }

    /** setAt(idx, val): set val at idx to val */

    setAt(idx, val) {
        let nodeCount = 0;
        if (!this.head) throw 'List is empty!'
        let currentNode = this.head;
        while (currentNode) {
            if (idx === nodeCount) {
                const oldVal = currentNode.val
                currentNode.val = val
                return `Value at Index ${idx} has been changed from ${oldVal} to ${currentNode.val}`
            }
            nodeCount++
            currentNode = currentNode.next
        }
        return `List does not contain index ${idx}`
    }

    /** insertAt(idx, val): add node w/val before idx. */

    insertAt(idx, val) {
        let nodeCount = 0;
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.length++
            return
        }
        if (idx === 0) {
            newNode.next = this.head;
            this.head = newNode
        }
        // If inserting after the current head
        let currentNode = this.head;
        while (currentNode) {
            if (nodeCount === idx - 1) {
                const oldNext = currentNode.next
                currentNode.next = newNode;
                newNode.next = oldNext
                this.length++
                if (!newNode.next) this.tail = newNode
                return
            }
            nodeCount++
            currentNode = currentNode.next
        }
        throw 'Invalid idx'
    }

    /** removeAt(idx): return & remove item at idx, */

    removeAt(idx) {
        let nodeCount = 0;
        if (!this.head) throw 'List is empty!'
        let currentNode = this.head;

        if (idx === 0) {
            this.head = currentNode.next
            if (!currentNode.next) this.tail = currentNode.next
            this.length--
            return
        }

        while (currentNode) {
            const prevNode = currentNode;
            nodeCount++
            currentNode = currentNode.next
            if (nodeCount === idx) {
                prevNode.next = currentNode.next
                this.length--
                if (!currentNode.next) this.tail = prevNode
                return
            }
        }
        throw 'Invalid idx'
    }

    /** average(): return an average of all values in the list */

    average() {
        if (!this.head) return 0
        let currentNode = this.head;
        let total = 0
        while (currentNode) {
            total += currentNode.val
            currentNode = currentNode.next
        }
        return total / this.length
    }
}

class CircularLinkedList extends LinkedList {
    constructor() {
        super();
    }

    toString() {
        if (this.length === 0) return '';

        let str = this.head.val;
        // node after the head
        let currentNode = this.head.next;

        // exit while loop once it returns to the head
        while (currentNode && currentNode !== this.head) {
            str += `, ${currentNode.val}`;
            currentNode = currentNode.next;
        }

        return str;
    }

    push(val) {
        const newNode = new Node(val)

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }

        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.tail.next = this.head;

        this.length++;
    }

    // insert(item, index = 0) {
    //     if (index < 0 || index > this.size) return;
    //     const element = this.createElement(item);
    //     // insert at the start
    //     if (index === 0) {
    //         element.next = this.head;
    //         if (this.head) {
    //             this.head.prev = element;
    //         } else {
    //             this.tail = element;
    //         }
    //         this.head = element;
    //         // insert at the end
    //     } else if (index === this.size) {
    //         this.tail.next = element;
    //         element.prev = this.tail;
    //         this.tail = element;
    //         // insert anywhere in the middle
    //     } else {
    //         let previous = this.head;
    //         for (let i = 0; i < index - 1; i++) {
    //             previous = previous.next;
    //         }
    //         element.next = previous.next;
    //         previous.next.prev = element;
    //         previous.next = element;
    //         element.prev = previous;
    //     }
    //     this.tail.next = this.head;
    //     this.head.prev = this.tail;
    //     this.#size += 1;
    //     return this.size;
    // }

    remove(idx) {
        if (idx < 0 || idx >= this.length) throw new Error('Invalid idx');
        let currentNode = this.head;

        // remove at start
        if (idx === 0) {
            this.head = this.head.next;
            this.tail.next = this.head
        }

        // remove at end
        else if (idx === this.length - 1) {
            // while loop stops when currentNode.next is the tail
            let prevNode
            while (currentNode.next !== this.head) {
                prevNode = currentNode;
                currentNode = currentNode.next
            }
            // after while loop currentNode = this.tail
            // prevNode is the node before that
            this.tail = prevNode
            prevNode.next = this.head
            
        }

        // remove anywhere in the middle
        else {
            let prevNode = this.head;
            // if idx = 4 prevNode will equal 4th Node (index 3)
            for (let i = 0; i < idx - 1; i++) {
                prevNode = prevNode.next;
            }
            // currentNode is what we'll remove
            currentNode = prevNode.next;
            prevNode.next = currentNode.next;
    
        }
        if (this.head && this.tail) {
            this.tail.next = this.head;
        } else {
            this.head = null;
            this.tail = null;
        }
        this.length--
        return currentNode.val;
    }
}

const circle = new CircularLinkedList()
circle.push('apple')
circle.push('banana')
circle.push('cat')
circle.push('dog')
circle.remove(1)
circle.remove(1)
// circle.remove(1)
circle.push('eagle')
circle.push('fish')


// remove(1) seems to be issue





