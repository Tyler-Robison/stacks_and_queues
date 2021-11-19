// const Stack = require('./stack')
// const Queue = require('./queue')

// Browser back/Forward

// This would be better to do with a doubly linked list but challenge asks for 2 stacks
// backStack stack will keep track of sites visited, most recent on "top" of stack
// forwardStack will receive items from backStack when we go "backwards" through history

// 1) visit Google, Yahoo, EBay in that order
// 2) backStack.push(google) .push(yahoo) 
// 3) backStack now has yahoo on top, google 1 below.
// 4) click "go back"
// 5) add current site (EBay) to top of forward Stack
// 6) Pop yahoo off backStack and visit it.
// 7) If we go back again, yahoo would be added to top of forwardStack, google popped of backStack
// 8) If we go forward yahoo pushed onto backstack, Ebay popped off forwardStack and visited
// 9) go to apple.com
// 10) Ebay pushed onto backStack
// 11) forwardStack now empty b/c no sites in "forward" direction
// 12) Again, would be better to use doubly-linked-list for this.

// String Reversal

// Want to use stack for this so string can be easily reversed.

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
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
        if (this.size === 0) return null

        if (this.size === 1) {
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

    removeNode(skip) {
        if (skip < 1 || skip >= this.length) throw new Error('Invalid skip');

        // current node = tail so that 1 will be on head
        let currentNode = this.head;
        let prevNode;

        while (this.length > 1) {
            let counter = 1;

            while (this.length > 1) {
                // when come back to if statement, prevNode = node we remove
                if (counter === skip) {
                    prevNode.next = currentNode.next;
                    currentNode = currentNode.next;
                    this.length--;
                    break
                }
                counter++
                prevNode = currentNode
                currentNode = currentNode.next
            }
        }
        return currentNode
    }
}





// challenges start here

function stringReverse(str) {
    const stack = new Stack;
    const strArr = str.split('')

    for (let i = 0; i < strArr.length; i++) {
        const char = strArr[i];
        stack.push(char)
    }

    const revArr = [];
    const stackSize = stack.size
    for (let i = 0; i < stackSize; i++) {
        const char = stack.pop();
        revArr.push(char);
    }

    return revArr.join('')
}

// console.log(stringReverse('kitty_cat'))

// Balanced Brackets

// have (([ top of stack will be [
// if hit ], pop stack and compare to what comes off
// if matched pair, good if not, then unbalanced

function checkBalance(str) {
    const stack = new Stack;
    const openBrackets = '{[('
    const closedBrackets = '}])'

    for (let i = 0; i < str.length; i++) {
        if (openBrackets.indexOf(str[i]) !== -1) stack.push(str[i])
        else if (closedBrackets.indexOf(str[i]) !== -1) {
            const openBracket = stack.pop();
            const closedBracket = str[i]
            if (!checkMatch(openBracket, closedBracket)) return 'unbalanced'
        }
    }
    if (stack.size !== 0) return 'unbalanced'
    return 'balanced'
}

function checkMatch(openBracket, closedBracket) {
    if (openBracket === '[' && closedBracket === ']') return true
    if (openBracket === '{' && closedBracket === '}') return true
    if (openBracket === '(' && closedBracket === ')') return true
    return false
}

// balanced
// console.log(checkBalance('kitty'))
// console.log(checkBalance('(hi) [there]'))
// console.log(checkBalance('(hi [there])'))
// console.log(checkBalance('(((hi)))'))

// imbalanced
// console.log(checkBalance('(hello'))
// console.log(checkBalance('(nope]'))
// console.log(checkBalance('((ok) [nope)]'))

// Josephus Survivor
// new loops start at 1, 2 or 3 depending on where last ended
// stack?

function findSurvivor(numPeople, skip) {
    const circle = new CircularLinkedList()

    for (let i = 1; i <= numPeople; i++) {
        circle.push(i)
    }

    // circle access with 'this' inside method
    const survivor = circle.removeNode(skip)
    return survivor
}

// findSurvivor(10, 3)

// Calculator

function calculator(strExpression) {
    const stack = new Stack()
    const operators = '+-/*'
    let value
    for (let i = strExpression.length - 1; i >= 0; i--) {
        const potentialInteger = parseInt(strExpression[i])

        // Check if character is an integer
        if (typeof potentialInteger === 'number' && !isNaN(potentialInteger)) {
            stack.push(potentialInteger)
        }

        // Check if character is an operator
        else if (operators.indexOf(strExpression[i]) !== -1) {
            const operator = strExpression[i]
            const num1 = stack.pop()
            const num2 = stack.pop()

            // If 2 nums, solve expression with nums and operator
            if (num2) value = performCalc(operator, num1, num2)
            // If 1 num, solve expression with num1, previous value and operator
            if (!num2) value = performCalc(operator, num1, null, value)
        }
    }
    console.log('final value:', value)
    return value
}

function performCalc(operator, num1, num2 = null, value) {
    if (num2) {
        if (operator === '+') return num1 + num2
        if (operator === '-') return num1 - num2
        if (operator === '/') return num1 / num2
        if (operator === '*') return num1 * num2
    }
    if (operator === '+') return num1 + value
    if (operator === '-') return num1 - value
    if (operator === '/') return num1 / value
    if (operator === '*') return num1 * value
}

calculator("+ 1 2")     //3
calculator("* 2 + 1 2") //6
calculator("+ 9 * 2 3") //15
calculator("- 1 2")     //-1
calculator("- 9 * 2 3") // 3
calculator("/ 6 - 4 2") // 3
calculator("* 4 / 6 - 6 3") // 8














