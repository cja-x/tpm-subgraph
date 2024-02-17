import { BigDecimal } from '@graphprotocol/graph-ts'
import { updateDailyTokenData, convertTokenToDecimal, fetchTokenName, fetchTokenSymbol, fetchTokenDecimals } from './utils/token'
import { 
  Locked as LockedEvent,
  Withdrawal as WithdrawalEvent
} from "../generated/templates/TimeCapsule/TimeCapsule"

import {
  TimeCapsuleFactory,
  Locked,
  Withdrawal,
  Token,
} from "../generated/schema"
import { loadTransaction } from './utils'

export function handleLocked(event: LockedEvent): void {

  let entity = new Locked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tag = event.params.tag
  entity.tokenAddress = event.params.tokenAddress
  entity.lockIndex = event.params.lockIndex
  entity.fee = event.params.fee
  entity.lockTime = event.params.lockTime
  entity.unlockTime = event.params.unlockTime
  entity.lockType = event.params.lockType

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash


  let tokenLocked = Token.load(event.params.tokenAddress.toHexString())
  if (tokenLocked === null) {
    tokenLocked = new Token(event.params.tokenAddress.toHexString())
    tokenLocked.amountLocked = BigDecimal.fromString('0')
    tokenLocked.amountLockedVolume = BigDecimal.fromString('0')
    tokenLocked.symbol = fetchTokenSymbol(event.params.tokenAddress)
    tokenLocked.name = fetchTokenName(event.params.tokenAddress)
    tokenLocked.decimals = fetchTokenDecimals(event.params.tokenAddress)
  }

  let _amountLocked = convertTokenToDecimal(event.params.amount, tokenLocked.decimals)
  entity.amount = _amountLocked

  tokenLocked.amountLocked = tokenLocked.amountLocked.plus(_amountLocked)
  tokenLocked.amountLockedVolume = tokenLocked.amountLockedVolume.plus(_amountLocked)

  updateDailyTokenData(tokenLocked, event)

  entity.token = tokenLocked.id
  entity.transaction = loadTransaction(event).id
  entity.save()
  tokenLocked.save()

  let factory = TimeCapsuleFactory.load("main")
  if (factory !== null) {
    factory.locksCount = factory.locksCount + 1
    factory.save()
  }

}


export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokenAddress = event.params.tokenAddress
  entity.lockIndex = event.params.lockIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let tokenLocked = Token.load(event.params.tokenAddress.toHexString())
  if (tokenLocked === null) {
    tokenLocked = new Token(event.params.tokenAddress.toHexString())
    tokenLocked.amountLocked = BigDecimal.fromString('0')
    tokenLocked.amountLockedVolume = BigDecimal.fromString('0')
    tokenLocked.symbol = fetchTokenSymbol(event.params.tokenAddress)
    tokenLocked.name = fetchTokenName(event.params.tokenAddress)
    tokenLocked.decimals = fetchTokenDecimals(event.params.tokenAddress)
  }

  let _amountLocked = convertTokenToDecimal(event.params.amount, tokenLocked.decimals)
    tokenLocked.amountLocked = tokenLocked.amountLocked.minus(_amountLocked)
    tokenLocked.save()

  //update daily data
  updateDailyTokenData(tokenLocked, event)

  entity.amount = _amountLocked

  entity.save()

  let factory = TimeCapsuleFactory.load("main")
  if (factory !== null) {
    factory.withdrawalsCount = factory.withdrawalsCount + 1
    factory.save()
  }
  
}
