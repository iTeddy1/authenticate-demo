import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import authAPI from "./authAPI";
import { getSignature, getWalletAddress } from "@/services/metamask";

export interface AccountInformation {
  signature: string;
  publicAddress: string;
  nonce: string;
  accessToken: string;
  xrip: string;
  deviceId: string;
}

export interface AuthSliceState {
  status: "idle" | "loading" | "success" | "failed";
  isAuthenticated: boolean;
  accountInformation: AccountInformation | null;
  walletAddress: string | null;
  currentNonce: string | null;
  signature: string | null;
  error: string | null;
  message: string | null;
}

const initialState: AuthSliceState = {
  status: "idle",
  isAuthenticated: false,
  accountInformation: null,
  walletAddress: null,
  currentNonce: null,
  signature: null,
  error: null,
  message: null,
};

const getSignMessageAsync = createAsyncThunk("auth/getSignMessageAsync", authAPI.getSignMessage);
const signInWithWalletAsync = createAsyncThunk("auth/signInWithWalletAsync", authAPI.signInWithWallet);
const signInWithGoogleAsync = createAsyncThunk("auth/signInWithGoogleAsync", authAPI.signInWithGoogle);
const getWalletAddressAsync = createAsyncThunk("auth/getWalletAddressAsync", getWalletAddress);
const getSignatureAsync = createAsyncThunk("auth/getSignatureAsync", getSignature);

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSignMessageAsync.pending, state => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getSignMessageAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.currentNonce = action.payload.data.nonce;
      state.message = action.payload.data.message;
      state.error = action.payload.error;
    });
    builder.addCase(getSignMessageAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Unknown error occurred";
      state.message = null;
    });
    builder.addCase(signInWithWalletAsync.pending, state => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(signInWithWalletAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.accountInformation = action.payload.data;
      state.isAuthenticated = true;
      state.message = null;
    });
    builder.addCase(signInWithWalletAsync.rejected, (state, action) => {
      state.status = "failed";
      state.accountInformation = null;
      state.error = action.error.message || "Unknown error occurred";
      state.isAuthenticated = false;
      state.message = null;
    });
    builder.addCase(signInWithGoogleAsync.pending, state => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(signInWithGoogleAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.accountInformation = action.payload.data;
      state.isAuthenticated = true;
      state.message = null;
    });
    builder.addCase(signInWithGoogleAsync.rejected, (state, action) => {
      state.status = "failed";
      state.accountInformation = null;
      state.error = action.error.message || "Unknown error occurred";
      state.isAuthenticated = false;
      state.message = null;
    });
    builder.addCase(getWalletAddressAsync.pending, state => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getWalletAddressAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.walletAddress = action.payload;
      state.isAuthenticated = true;
      state.message = null;
    });
    builder.addCase(getWalletAddressAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Unknown error occurred";
      state.walletAddress = null;
      state.isAuthenticated = false;
      state.message = null;
    });
    builder.addCase(getSignatureAsync.pending, state => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getSignatureAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.signature = action.payload;
      state.isAuthenticated = true;
      state.message = null;
    });
    builder.addCase(getSignatureAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Unknown error occurred";
      state.signature = null;
      state.isAuthenticated = false;
      state.message = null;
    });
  },
  selectors: {
    selectMessage: (state: AuthSliceState) => state.message,
    selectWalletAddress: (state: AuthSliceState) => state.walletAddress,
    selectAccountInformation: (state: AuthSliceState) => state.accountInformation,
    selectCurrentNonce: (state: AuthSliceState) => state.currentNonce,
    selectSignature: (state: AuthSliceState) => state.signature,
    selectStatus: (state: AuthSliceState) => state.status,
    selectError: (state: AuthSliceState) => state.error,
    selectIsAuthenticated: (state: AuthSliceState) => state.isAuthenticated,
  },
});

export { getSignMessageAsync, signInWithWalletAsync, signInWithGoogleAsync, getWalletAddressAsync, getSignatureAsync };

export const {
  selectMessage,
  selectWalletAddress,
  selectStatus,
  selectError,
  selectIsAuthenticated,
  selectCurrentNonce,
  selectAccountInformation,
  selectSignature,
} = authSlice.selectors;

export default authSlice.reducer;
