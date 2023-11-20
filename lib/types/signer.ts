import { EncryptionHandler } from '../abstract';
import { AbstractLogger } from '@rosen-bridge/abstract-logger';
import { GuardDetection } from '../detection/GuardDetection';
import { ActiveGuard } from './abstract';

export interface SignerConfig {
  logger?: AbstractLogger;
  guardsPk: Array<string>;
  signer: EncryptionHandler;
  submitMsg: (message: string, guards: Array<string>) => unknown;
  messageValidDuration?: number;
  timeoutSeconds?: number;
  tssApiUrl: string;
  callbackUrl: string;
  detection: GuardDetection;
  turnDurationSeconds?: number;
  turnNoWorkSeconds?: number;
  getPeerId: () => Promise<string>;
  shares: Array<string>;
  thresholdTTL?: number;
  responseDelay?: number;
}

export interface Sign {
  msg: string;
  callback: (status: boolean, message?: string, signature?: string) => unknown;
  request?: {
    guards: Array<ActiveGuard>;
    index: number;
    timestamp: number;
  };
  signs: Array<string>;
  addedTime: number;
  posted: boolean;
}

export interface PendingSign {
  msg: string;
  guards: Array<ActiveGuard>;
  index: number;
  timestamp: number;
  sender: string;
}
export interface SignRequestPayload {
  msg: string;
  guards: Array<ActiveGuard>;
}

export interface SignApprovePayload {
  msg: string;
  guards: Array<ActiveGuard>;
  initGuardIndex: number;
}

export interface SignStartPayload {
  msg: string;
  guards: Array<ActiveGuard>;
  signs: Array<string>;
}

export type SignMessageType = 'request' | 'approve' | 'start';

export enum StatusEnum {
  Success = 'success',
  Failed = 'failed',
}

export interface Threshold {
  value: number;
  expiry: number;
}
