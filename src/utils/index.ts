import { ethereum } from '@graphprotocol/graph-ts'
import { Lock, Transaction } from "../../generated/schema"


export function removeEntityFromArray(
  lock: Lock, locks: Array<string> 
): Array<string> {

  let index = -1;
  for (let i = 0; i < locks.length; i++) {
    if (locks[i] == lock.id) {
      index = i;
      break;
    }
  }

  if (index >= 0) {
    // Remove the element at the found index by shifting elements
    for (let i = index; i < locks.length - 1; i++) {
      locks[i] = locks[i + 1];
    }

    // Resize the array to remove the last element
    locks.pop();
  }


  return locks
}

export function loadTransaction(event: ethereum.Event): Transaction {
    let transaction = Transaction.load(event.transaction.hash.toHexString())
    if (transaction === null) {
      transaction = new Transaction(event.transaction.hash.toHexString())
      transaction.blockNumber = event.block.number
      transaction.timestamp = event.block.timestamp
      transaction.origin = event.transaction.from
      if (event.transaction.to !== null) {
        transaction.to = event.transaction.to!
      }
      transaction.save()
    }
   

    return transaction as Transaction
  }
  