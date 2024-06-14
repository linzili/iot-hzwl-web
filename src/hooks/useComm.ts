const sn = '94fd99589e3317ce5921001aee9f9f070dbcc583db20d63d52441f22308532777ae632ba33a39caac537aca94a5147ce'

export class Comm {
  private comm?: TComm = undefined

  constructor(properties: CommProperties) {
    import('@/assets/js/TCTRL.min.js').then(() => {
      this.comm = new TComm(
        properties.com,
        `${properties.baud},${properties.parity},${properties.dataBits},${properties.stopBits}`,
        properties.dateType,
        properties.timeout,
        properties.rts
      )
    })
  }

  public register(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.comm) {
        this.comm.Register(sn, (dat) => {
          if (dat.STAT === 11) {
            this.comm!!.init((ret) => {
              if (ret.STAT === 1) {
                resolve()
              } else {
                reject(new Error('打开串口失败'))
              }
            })
          } else if (dat.STAT === -99) {
            reject(new Error('插件未安装'))
          } else {
            reject(new Error('串口异常'))
          }
        })
      }
    })
  }

  public close() {
    this.comm?.Close()
  }
  public send(data: string) {
    this.comm?.Send(data)
  }

  public onData(callback: (data: DataIn) => void) {
    if (this.comm) {
      this.comm.OnDataIn = callback
    }
  }
}

export function useComm() {
  async function openComm(properties: CommProperties, callback: (data: DataIn) => void): Promise<Comm> {
    return new Promise((resolve, reject) => {
      const comm = new Comm(properties)
      comm.onData(callback)
      comm
        .register()
        .then(() => {
          resolve(comm)
        })
        .catch(() => reject(new Error('打开串口失败')))
    })
  }

  function getCommList(): Promise<ComPort[]> {
    return new Promise((resolve, reject) => {
      import('@/assets/js/TCTRL.min.js').then(() => {
        const tcomm = new TComm('COM1', '9600,N,8,1', 'hex', 10, 0)
        tcomm.Register(sn, (dat) => {
          if (dat.STAT === 11) {
            tcomm.getComList((data) => {
              resolve(data.COMS)
            })
          } else if (dat.STAT === -99) {
            reject(new Error('插件未安装'))
          } else {
            reject(new Error('注册失败'))
          }
        })
      })
    })
  }

  return {
    openComm,
    getCommList
  }
}
