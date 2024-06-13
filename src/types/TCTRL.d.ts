// src/types/TCTRL.d.ts
declare module '@/assets/js/TCTRL.min.js' {
  export default function TCTRL(): void
}
interface ComPort {
  PName: string
  FName: string
  HWID: string
}
interface Response {
  STAT: number
}
interface DataIn {
  MSTAT: string
  data: string
}
// 全局类型声明
declare class TComm {
  constructor(comPort?: string, settings?: string, format?: string, timeout?: number, rts?: number)

  Register(registrationCode: string, callback: (data: Response) => void): void
  getComList(callback: (data: { COMS: ComPort[] }) => void): void
  OnDataIn: (data: DataIn) => void
  init(callback: (result: Response) => void): void
  Send(data: string): void
  Close(): void
}
type baudType = '300' | '600' | '1200' | '2400' | '4800' | '9600' | '19200' | '38400' | '57600' | '115200'

interface CommProperties {
  com?: string
  baud: baudType
  dataBits: 5 | 6 | 7 | 8
  parity: 'N' | 'O' | 'E' | 'M' | 'S'
  stopBits: 1 | 2
  dateType: 'hex' | 'utf-8' | 'unicode'
  timeout: number
  rts: 0 | 1
}
