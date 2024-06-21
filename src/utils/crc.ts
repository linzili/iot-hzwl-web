// CRC16/modbus 计算类
export class CRC {
  static calculateCrc16Modbus(data: Uint8Array): string {
    let crc = 0xffff

    for (let i = 0; i < data.length; i++) {
      crc ^= data[i]
      for (let j = 0; j < 8; j++) {
        if (crc & 1) {
          crc = (crc >> 1) ^ 0xa001
        } else {
          crc = crc >> 1
        }
      }
    }
    const crc16LowByte = (crc & 0xff).toString(16).padStart(2, '0')
    const crc16HighByte = ((crc >> 8) & 0xff).toString(16).padStart(2, '0')

    return crc16LowByte + crc16HighByte
  }
}
