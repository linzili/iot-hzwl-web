export interface Event {
  action: ActionEnum
  client?: string
  data?: string
  addr?: string
  hex?: boolean
  port?: number
  type?: string
  host?: string
}

export enum ActionEnum {
  NEW = 'new',
  SEND = 'send',
  CONNECTED = 'connected',
  DATA = 'data',
  DISCONNECT = 'disconnect',
  PORT = 'port'
}

export interface connection {
  client: string
  addr: string
  online: boolean
}

export interface messageInfo {
  hex: string
  ascii: string
  time: string
  type: 'send' | 'receive'
}

type checkType = 'CRC16'

export interface IReadConfig {
  slaveAddress?: string
  functionCode?: string
  registerAddress?: string
  registerCount?: string
  checkType: checkType
}

export type parseType = 'asc' | 'desc' | 'ascAndDesc' | 'descAndAsc'

export interface IParseConfig {
  startAddress?: number
  charCount?: number
  charOrder?: parseType
  dataType?: dataType
  checkType?: checkType
}

export type dataType = 'SignedInt' | 'UnsignedInt' | 'Float' | 'Double' | 'BCD' | 'HEX'
