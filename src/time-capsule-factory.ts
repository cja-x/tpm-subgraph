import {
  TimeCapsuleCreated as TimeCapsuleCreatedEvent,
  OwnerChanged as OwnerChangedEvent
} from "../generated/TimeCapsuleFactory/TimeCapsuleFactory"
import {  TimeCapsuleCreated, TimeCapsuleFactory } from "../generated/schema"
import { TimeCapsule } from '../generated/templates'
import { loadTransaction } from "./utils"

export function handleOwnerChanged(event: OwnerChangedEvent): void {

  let tpm = TimeCapsuleCreated.load(event.params.capsuleAddress.toHexString())
  if (tpm !== null) {
    tpm.owner = event.params.newOwner
    tpm.save()
  }
}

export function handleTimeCapsuleCreated(event: TimeCapsuleCreatedEvent): void {

  let factory = TimeCapsuleFactory.load("main")
  if (factory === null) {
    factory = new TimeCapsuleFactory("main")
    factory.timecapsuleCount = 0
    factory.locksCount = 0
    factory.withdrawalsCount = 0
    factory.locksReleasesCount = 0
  }

  factory.timecapsuleCount = factory.timecapsuleCount + 1

  let entity = new TimeCapsuleCreated(
    event.params.capsuleAddress.toHexString()
  ) as TimeCapsuleCreated
  
  entity.owner = event.params.owner
  entity.capsuleAddress = event.params.capsuleAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.transaction = loadTransaction(event).id
  entity.locks = []
  
  entity.save()
  factory.save()

  TimeCapsule.create(event.params.capsuleAddress)
}
