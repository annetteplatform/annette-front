

export enum MessageType {
  Info = 'I',
  Warning = 'W',
  Error = 'E'
}

export interface Message {
  code: string
  messageType: MessageType
  params: any
}

export interface AnnetteError {
  code: string
  errorCode?: number
  messageType?: MessageType
  params: any
  originError?: any
}
