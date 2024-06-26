import * as wasm from 'ergo-lib-wasm-nodejs';
import { AbstractLogger } from '@rosen-bridge/abstract-logger';
import { MultiSigUtils } from './MultiSigUtils';

interface Sign {
  signed: Array<string>;
  simulated: Array<string>;
  transaction: Uint8Array;
}

interface ApproveSigner {
  id: string;
  challenge: string;
}

interface Signer {
  id?: string;
  pub: string;
  unapproved: Array<ApproveSigner>;
}

interface SingleCommitmentJson {
  hint: string;
  pubkey: {
    op: string;
    h: string;
  };
  type: string;
  a: string;
  secret?: string;
  position: string;
}

interface CommitmentJson {
  secretHints: { [index: string]: Array<SingleCommitmentJson> };
  publicHints: { [index: string]: Array<SingleCommitmentJson> };
}

interface TxQueued {
  tx?: wasm.ReducedTransaction;
  boxes: Array<wasm.ErgoBox>;
  dataBoxes: Array<wasm.ErgoBox>;
  secret?: wasm.TransactionHintsBag;
  sign?: Sign;
  commitments: Array<PublishedCommitment | undefined>;
  commitmentSigns: Array<string>;
  resolve?: (value: wasm.Transaction | PromiseLike<wasm.Transaction>) => void;
  reject?: (reason?: any) => void;
  createTime: number;
  requiredSigner: number;
}

interface GeneralPayload {
  index?: number;
  id?: string;
}

interface RegisterPayload extends GeneralPayload {
  nonce: string;
  myId: string;
}

interface ApprovePayload extends GeneralPayload {
  nonce: string;
  nonceToSign?: string;
  myId: string;
}

interface SingleCommitment {
  a: string;
  position: string;
}

interface PublishedCommitment {
  [index: string]: Array<SingleCommitment>;
}

interface CommitmentPayload extends GeneralPayload {
  txId: string;
  commitment: PublishedCommitment;
}

interface SignedCommitment {
  index: number;
  commitment: PublishedCommitment;
  sign: string;
}

interface SignPayload extends GeneralPayload {
  tx: string;
  txId: string;
  signed: Array<string>;
  simulated: Array<string>;
  commitments: Array<SignedCommitment>;
}

type Payload =
  | RegisterPayload
  | ApprovePayload
  | CommitmentPayload
  | SignPayload;

interface CommunicationMessage {
  type: 'register' | 'approve' | 'commitment' | 'sign';
  sign?: string;
  payload: Payload;
}

interface ErgoMultiSigConfig {
  logger?: AbstractLogger;
  multiSigUtilsInstance: MultiSigUtils;
  publicKeys: Array<string>;
  secretHex: string;
  txSignTimeout: number;
  multiSigFirstSignDelay?: number;
  submit: (msg: string, peers: Array<string>) => unknown;
  getPeerId: () => Promise<string>;
}

export {
  TxQueued,
  CommunicationMessage,
  RegisterPayload,
  CommitmentPayload,
  SignPayload,
  Signer,
  ApprovePayload,
  CommitmentJson,
  PublishedCommitment,
  SingleCommitment,
  ErgoMultiSigConfig,
};
