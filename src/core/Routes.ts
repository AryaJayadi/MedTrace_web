export const ROUTES = {
  ROOT: "/",
  FORBIDDEN: "/forbidden",
  TRACE_DRUG_QR: "/drug/trace/qr/:drugID",

  APP_MAIN_SEGMENT: "app",

  AUTH_SEGMENT: "auth",

  APP_BATCH: "batch",
  APP_BATCH_CREATE: "batch/create",
  APP_BATCH_UPDATE: "batch/update/:batchID",

  APP_TRANSFER: "transfer",
  APP_TRANSFER_VIEW: "transfer/detail/:transferID",
  APP_TRANSFER_CREATE: "transfer/create",

  APP_DRUG_TRACE: "drug/trace",

  AUTH_LOGIN: "login",

  FULL_PATH_APP_BATCH: "/app/batch",
  FULL_PATH_APP_BATCH_CREATE: "/app/batch/create",
  FULL_PATH_APP_BATCH_UPDATE: "/app/batch/update/:batchID",
  FULL_PATH_APP_TRANSFER: "/app/transfer",
  FULL_PATH_APP_TRANSFER_VIEW: "/app/transfer/detail/:transferID",
  FULL_PATH_APP_TRANSFER_CREATE: "/app/transfer/create",
  FULL_PATH_APP_DRUG_TRACE: "/app/drug/trace",
  FULL_PATH_AUTH_LOGIN: "/auth/login",
};
