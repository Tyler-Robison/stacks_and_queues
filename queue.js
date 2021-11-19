const LinkedList = require('./linked_list')

/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    const newNode = new Node(val);

    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    }

    else {
      const prevLast = this.last
      this.last = newNode
      prevLast.next = newNode
    }
    this.size++;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if (this.size === 0) throw new Error('Queue is empty!')

    // If 1 item in queue empty queue and return item
    if (this.size === 1) {
      const firstNode = this.first
      this.first = null;
      this.last = null;
      this.size--;
      return firstNode.val;
    }
    // if > 1 items in queue return first and make second item new first.
    const firstNode = this.first
    this.first = firstNode.next;
    this.size--;
    return firstNode.val;

  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    if (!this.first) return 'Queue is empty'
    return this.first.val
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return (this.size === 0 ? true : false)
  }
}

// Challenges

// Composition

// class Queue {
//   constructor() {
//     this.size = 0;
//     this.first = null;
//     this.last = null;
//     this._list = new LinkedList();
//     // Why _list instead of list?
//   }

//   enqueue(val) {
//     this._list.push(val)
//     this.first = this._list.head
//     this.last = this._list.tail
//     this.size++;
//   }

//   dequeue() {
//     if (this.size === 0) throw new Error('Queue is empty!')

//     const firstNode = this._list.shift()
//     this.first = this._list.head
//     this.last = this._list.tail

//     this.size--;
//     return firstNode;
//   }

//   peek() {
//     if (this.size === 0) throw new Error('Queue is empty!')
//     const firstNode = this._list.getAt(0)
//     return firstNode
//   }

//   isEmpty() {
//     return (this.size === 0 ? true : false)
//   }
// }

const myQueue = new Queue()
myQueue.enqueue('Apple')
myQueue.enqueue('Banana')
myQueue.enqueue('Cat')

const queue = new Queue()
queue.enqueue(10)
queue.enqueue(100);

const listQueue = new Queue()
listQueue.enqueue('Apple')
listQueue.enqueue('Banana')
listQueue.enqueue('Cat')


module.exports = Queue;


// class LinkedList {
//   constructor(vals = []) {
//       this.head = null;
//       this.tail = null;
//       this.length = 0;

//       for (let val of vals) this.push(val);
//   }

//   /** push(val): add new value to end of list. */

//   traverse() {
//       if (!this.head) return 'List is empty'
//       let currentNode = this.head;
//       while (currentNode) {
//           console.log(currentNode.val);
//           currentNode = currentNode.next
//       }
//   }

//   push(val) {
//       const newNode = new Node(val)

//       if (!this.head) {
//           this.head = newNode;
//           this.tail = newNode;
//       }

//       else {
//           this.tail.next = newNode
//           this.tail = newNode
//       }
//       this.length++
//   }

//   /** unshift(val): add new value to start of list. */

//   unshift(val) {
//       const newNode = new Node(val);
//       if (!this.head) {
//           this.head = newNode;
//           this.tail = newNode;
//       }

//       else {
//           const prevHead = this.head
//           this.head = newNode;
//           this.head.next = prevHead
//       }
//       this.length++
//   }

//   /** pop(): return & remove last item. */

//   // popped d -> c -> a -> d (d wasn't in this at this point)
//   pop() {
//       // list contains 0 items
//       if (!this.head) throw 'List is empty!'
//       let currentNode = this.head;

//       // If list contains only 1 item, empty it
//       if (!currentNode.next) {
//           const prevTail = this.tail
//           this.head = null;
//           this.tail = null;
//           this.length--
//           return prevTail.val
//       }

//       // list contains >= 2 items
//       while (currentNode) {
//           if (!currentNode.next.next) {
//               const prevTail = currentNode.next
//               currentNode.next = null
//               this.tail = currentNode;
//               this.length--
//               return prevTail.val
//           }
//           currentNode = currentNode.next
//       }
//   }

//   /** shift(): return & remove first item. */

//   shift() {
//       if (!this.head) throw 'List is empty!'
//       let currentNode = this.head;

//       // If list contains only 1 item, empty it
//       if (!currentNode.next) {
//           const prevHead = this.head
//           this.head = null;
//           this.tail = null;
//           this.length--
//           return prevHead.val
//       }

//       // list contains >= 2 items
//       const prevHead = this.head
//       this.head = currentNode.next
//       this.length--
//       return prevHead.val
//   }

//   /** getAt(idx): get val at idx. */

//   getAt(idx) {
//       let nodeCount = 0;
//       if (!this.head) throw 'List is empty!'
//       let currentNode = this.head;
//       while (currentNode) {
//           if (idx === nodeCount) return currentNode.val
//           nodeCount++
//           currentNode = currentNode.next
//       }
//       return `List does not contain index ${idx}`
//   }

//   /** setAt(idx, val): set val at idx to val */

//   setAt(idx, val) {
//       let nodeCount = 0;
//       if (!this.head) throw 'List is empty!'
//       let currentNode = this.head;
//       while (currentNode) {
//           if (idx === nodeCount) {
//               const oldVal = currentNode.val
//               currentNode.val = val
//               return `Value at Index ${idx} has been changed from ${oldVal} to ${currentNode.val}`
//           }
//           nodeCount++
//           currentNode = currentNode.next
//       }
//       return `List does not contain index ${idx}`
//   }

//   /** insertAt(idx, val): add node w/val before idx. */

//   insertAt(idx, val) {
//       let nodeCount = 0;
//       const newNode = new Node(val);
//       if (!this.head) {
//           this.head = newNode;
//           this.tail = newNode;
//           this.length++
//           return
//       }
//       if (idx === 0) {
//           newNode.next = this.head;
//           this.head = newNode
//       }
//       // If inserting after the current head
//       let currentNode = this.head;
//       while (currentNode) {
//           if (nodeCount === idx - 1) {
//               const oldNext = currentNode.next
//               currentNode.next = newNode;
//               newNode.next = oldNext
//               this.length++
//               if (!newNode.next) this.tail = newNode
//               return
//           }
//           nodeCount++
//           currentNode = currentNode.next
//       }
//       throw 'Invalid idx'
//   }

//   /** removeAt(idx): return & remove item at idx, */

//   removeAt(idx) {
//       let nodeCount = 0;
//       if (!this.head) throw 'List is empty!'
//       let currentNode = this.head;

//       if (idx === 0) {
//           this.head = currentNode.next
//           if (!currentNode.next) this.tail = currentNode.next
//           this.length--
//           return
//       }

//       while (currentNode) {
//           const prevNode = currentNode;
//           nodeCount++
//           currentNode = currentNode.next
//           if (nodeCount === idx) {
//               prevNode.next = currentNode.next
//               this.length--
//               if (!currentNode.next) this.tail = prevNode
//               return
//           }
//       }
//       throw 'Invalid idx'
//   }

//   /** average(): return an average of all values in the list */

//   average() {
//       if (!this.head) return 0
//       let currentNode = this.head;
//       let total = 0
//       while (currentNode) {
//           total += currentNode.val
//           currentNode = currentNode.next
//       }
//       return total / this.length
//   }
// }