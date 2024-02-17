import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Initialized,
  Locked,
  Withdrawal,
} from "../generated/TimeCapsule/TimeCapsule"

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createLockedEvent(
  tag: Bytes,
  tokenAddress: Address,
  lockIndex: BigInt,
  amount: BigInt,
  fee: BigInt,
  lockTime: BigInt,
  unlockTime: BigInt,
  lockType: i32
): Locked {
  let lockedEvent = changetype<Locked>(newMockEvent())

  lockedEvent.parameters = new Array()

  lockedEvent.parameters.push(
    new ethereum.EventParam("tag", ethereum.Value.fromFixedBytes(tag))
  )
  lockedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  lockedEvent.parameters.push(
    new ethereum.EventParam(
      "lockIndex",
      ethereum.Value.fromUnsignedBigInt(lockIndex)
    )
  )
  lockedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  lockedEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  lockedEvent.parameters.push(
    new ethereum.EventParam(
      "lockTime",
      ethereum.Value.fromUnsignedBigInt(lockTime)
    )
  )
  lockedEvent.parameters.push(
    new ethereum.EventParam(
      "unlockTime",
      ethereum.Value.fromUnsignedBigInt(unlockTime)
    )
  )
  lockedEvent.parameters.push(
    new ethereum.EventParam(
      "lockType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(lockType))
    )
  )

  return lockedEvent
}


export function createWithdrawalEvent(
  tokenAddress: Address,
  lockIndex: BigInt,
  amount: BigInt
): Withdrawal {
  let withdrawalEvent = changetype<Withdrawal>(newMockEvent())

  withdrawalEvent.parameters = new Array()

  withdrawalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam(
      "lockIndex",
      ethereum.Value.fromUnsignedBigInt(lockIndex)
    )
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawalEvent
}

