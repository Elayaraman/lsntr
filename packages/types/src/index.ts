export interface Track {
  id: string
  filename: string
  url: string
  uploadedBy: string
}

export interface SocketEvents {
  'track:play': { trackId: string; timestamp: number }
  'track:pause': { trackId: string; timestamp: number }
  'track:seek': { trackId: string; position: number }
}
