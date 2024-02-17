import {
  Address,
  BigInt,
} from "@graphprotocol/graph-ts"
import { ADDRESS_ZERO } from "./constants"

export class StaticTokenDefinition {
  address : Address
  symbol: string
  name: string
  decimals: BigInt

  constructor(address: Address, symbol: string, name: string, decimals: BigInt) {
    this.address = address
    this.symbol = symbol
    this.name = name
    this.decimals = decimals
  }

  static getStaticDefinitions(): Array<StaticTokenDefinition> {
    let staticDefinitions = new Array<StaticTokenDefinition>(4)

    // HEX
    let tokenHEX = new StaticTokenDefinition(
      Address.fromString('0x2b591e99afe9f32eaa6214f7b7629768c40eeb39'),
      'HEX',
      'HEX',
      BigInt.fromI32(8)
    )
    staticDefinitions.push(tokenHEX)

    let tokenPLSX = new StaticTokenDefinition(
      Address.fromString('0x95B303987A60C71504D99Aa1b13B4DA07b0790ab'),
      'PLSX',
      'PulseX',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenPLSX)

    let tokenPls = new StaticTokenDefinition(
      Address.fromString(ADDRESS_ZERO),
      'Native',
      'Native',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenPls)

     let tokenINC = new StaticTokenDefinition(
      Address.fromString('0x2fa878ab3f87cc1c9737fc071108f904c0b0c95d'),
      'INC',
      'Incentive',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenINC)

    return staticDefinitions
  }

  // Helper for hardcoded tokens
  static fromAddress(tokenAddress: Address) : StaticTokenDefinition | null {
    let staticDefinitions = this.getStaticDefinitions()
    let tokenAddressHex = tokenAddress.toHexString()

    for (let i = 0; i < staticDefinitions.length; i++) {
      let staticDefinition = staticDefinitions[i]
      if(staticDefinition.address.toHexString() == tokenAddressHex) {
        return staticDefinition
      }
    }

    return null
  }

}