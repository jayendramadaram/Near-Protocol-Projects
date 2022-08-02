import React from "react";
import getConfig from "./context";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";

declare global {
  interface Window {
    walletConnection: any; // this will be your variable name
    accountId: any; // this will be your variable name
    contract: any; // this will be your variable name
    nearInitPromise: any; // this will be your variable name
  }
}

const nearConfig = getConfig(process.env.NODE_ENV || "testet");

export default async function Nearinit() {
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  );

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near, null);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: ["GetMSGS"],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["setMSG", "DeleteWhole", "Delete_Mine"],
    }
  );

  console.log(window.contract, "give it a shot");
}

export function logout() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName);
}

export async function set_msgs(message: String) {
  let response = await window.contract.setMSG({
    args: { msg: message },
  });
  return response;
}

export async function delete_all() {
  let response = await window.contract.DeleteWhole({
    args: {},
  });
  return response;
}

export async function delete_mine() {
  let response = await window.contract.Delete_Mine({
    args: {},
  });
  return response;
}

export async function get_msgs() {
  let response = await window.contract.GetMSGS();
  return response;
}
