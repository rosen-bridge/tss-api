import { AbstractLogger } from '@rosen-bridge/logger-interface';

/**
 * MessageType type for communication between nodes in the network
 */
type MessageType = 'register' | 'approve' | 'heartbeat';

/**
 * Message interface for communication between nodes in the network
 * @param type - type of message (sign, register, approve)
 * @param payload - message payload
 * @param signature - message signature
 * @param receiver - public key of receiver
 * @param pk - public key of sender
 */
type Message = {
  type: MessageType;
  payload: string;
  signature: string;
  receiver: string;
  pk: string;
};

/**
 * MessageHandler interface for communication between nodes in the network
 * @param sign - sign a message
 * @param encrypt - encrypt a message
 * @param checkSign - check message sign
 * @param decrypt - decrypt a message
 * @param send - send message
 */
interface MessageHandler {
  sign(message: string): string;
  encrypt(message: string): string;
  checkSign(
    message: string,
    signature: string,
    signerPublicKey: string
  ): boolean;
  decrypt(message: string): string;
  send(message: Message): Promise<void>;
}

interface RegisterPayload {
  nounce: string;
  timestamp: number;
}

interface ApprovePayload {
  nounce?: string;
  receivedNounce: string;
  timestamp: number;
}
interface HeartbeatPayload {
  nounce: string;
  timestamp: number;
}

/**
 * GuardInfo interface for communication between nodes in the network
 * @param peerId - peer id of the guard
 * @param nounce - nounce of the guard
 * @param lastUpdate - last update of the guard (timestamp)
 **/
interface GuardInfo {
  peerId: string;
  nounce: string;
  lastUpdate: number; // timestamp
  publicKey: string;
}

interface GuardDetectionConfig {
  logger?: AbstractLogger;
  guardsPublicKey: string[];
  publicKey: string;
  guardsRegisterTimeout?: number;
  guardsHeartbeatTimeout?: number;
  timestampTolerance?: number;
  guardsUpdateStatusInterval?: number;
}

export {
  MessageHandler,
  Message,
  RegisterPayload,
  ApprovePayload,
  HeartbeatPayload,
  GuardInfo,
  GuardDetectionConfig,
  MessageType,
};
