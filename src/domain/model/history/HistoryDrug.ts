import { Drug } from "../drug/Drug";

export interface HistoryDrug {
  Drug: Drug;
  TxID: string;
  Timestamp: string;
  IsDelete: boolean;
}
