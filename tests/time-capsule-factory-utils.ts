import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  TimeCapsuleCreated
} from "../generated/TimeCapsuleFactory/TimeCapsuleFactory"

export function createTimeCapsuleCreatedEvent(
  owner: Address,
  capsuleAddress: Address
): TimeCapsuleCreated {
  let timeCapsuleCreatedEvent = changetype<TimeCapsuleCreated>(newMockEvent())

  timeCapsuleCreatedEvent.parameters = new Array()

  timeCapsuleCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  timeCapsuleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "capsuleAddress",
      ethereum.Value.fromAddress(capsuleAddress)
    )
  )

  return timeCapsuleCreatedEvent
}
