/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    // Even though we are "pushing" we have to add to front so that pop can be O(1)
    const newNode = new Node(val)

    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    }

    else {
      const prevFirst = this.first
      this.first = newNode
      newNode.next = prevFirst
    }
    this.size++;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if(this.size === 0) throw new Error('Stack is empty!')

    if (this.size === 1){
      const prevFirst = this.first;
      this.first = null;
      this.last = null;
      this.size--;
      return prevFirst.val;
    }

    const prevFirst = this.first;
    this.first = prevFirst.next
    this.size--;
    return prevFirst.val;    
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    if (!this.first) return 'Queue is empty'
    return this.first.val
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return (this.size === 0 ? true : false)
  }
}

module.exports = Stack;
