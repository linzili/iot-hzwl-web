const HexUtils = {
  // 将字符串转换为十六进制
  stringToHex(str: string): string {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(str)
    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  },

  // 将十六进制转换为字符串
  hexToString(hex: string): string {
    const match = hex.match(/.{1,2}/g)
    if (!match) {
      throw new Error('Invalid hex string')
    }
    const bytes = new Uint8Array(match.map((byte) => parseInt(byte, 16)))
    const decoder = new TextDecoder()
    return decoder.decode(bytes)
  },

  // 校验字符串是否为有效的十六进制
  isHex(hex: string): boolean {
    const hexPattern = /^[0-9a-fA-F]+$/
    return hexPattern.test(hex) && hex.length % 2 === 0
  }
}

export default HexUtils
