// 将字符串转换为十六进制
export const stringToHex = (str: string): string => {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

// 将十六进制转换为字符串
export const hexToString = (hex: string): string => {
  const bytes = hexToUint8Array(hex)
  const decoder = new TextDecoder()
  return decoder.decode(bytes)
}

// 将十六进制转换为Uint8Array
export const hexToUint8Array = (hex: string): Uint8Array => {
  const match = hex.match(/.{1,2}/g)
  if (!match) {
    throw new Error('Invalid hex string')
  }
  return new Uint8Array(match.map((byte) => parseInt(byte, 16)))
}

// 校验字符串是否为有效的十六进制
export const isHex = (hex: string): boolean => {
  const hexPattern = /^[0-9a-fA-F]+$/
  return hexPattern.test(hex) && hex.length % 2 === 0
}

export const uint8ArrayToHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export const hexToUnsignedInt = (hex: string) => {
  return parseInt(hex, 16)
}

export const hexToSignedInt = (hex: string) => {
  const number = parseInt(hex, 16)
  const byteLength = hex.length / 2
  const max = Math.pow(2, byteLength * 8 - 1)
  return number >= max ? number - 2 * max : number
}

export const hexToFloat = (hex: string) => {
  const buffer = new ArrayBuffer(4)
  const view = new DataView(buffer)

  hex.match(/../g)?.forEach((b, i) => {
    view.setUint8(i, parseInt(b, 16))
  })

  return view.getFloat32(0)
}

export const hexToDouble = (hex: string) => {
  const buffer = new ArrayBuffer(8)
  const view = new DataView(buffer)
  hex.match(/../g)?.forEach((b, i) => {
    view.setUint8(i, parseInt(b, 16))
  })
  return view.getFloat64(0)
}

export const hexToBCD = (hex: string) => {
  const decimalNumber = parseInt(hex, 16)
  const decimalString = decimalNumber.toString()
  let bcdString = ''
  for (const char of decimalString) {
    const digit = parseInt(char, 10)
    const bcd = digit.toString(2).padStart(4, '0')
    bcdString += bcd
  }

  return bcdString
}
