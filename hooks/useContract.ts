import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { useCallback } from "react";
import {
  RESET_WEB3_PROVIDER,
  selectBlockchain,
  SET_WEB3_PROVIDER,
} from "../redux/features/blockchain/blockchainSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCookie, setCookie } from "../utils/cookie";
import CannathaiMintNFT from "../configs/ABI/CannathaiMintNFT.json";

const useContract = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required

      options: {
        // infuraId: INFURA_ID, // required
        rpc: {
          80001: `https://matic-mumbai.chainstacklabs.com`,
        },
      },
    },
    // 'custom-walletlink': {
    //   display: {
    //     logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
    //     name: 'Coinbase',
    //     description: 'Connect to Coinbase Wallet (not Coinbase App)',
    //   },
    //   options: {
    //     appName: 'Coinbase', // Your app name
    //     networkUrl: https://mainnet.infura.io/v3/${INFURA_ID},
    //     chainId: 1,
    //   },
    //   package: WalletLink,
    //   // @ts-ignore
    //   connector: async (_, options) => {
    //     console.log(options);

    //     const { appName, networkUrl, chainId } = options
    //     const walletLink = new WalletLink({
    //       appName,
    //     })
    //     const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
    //     await provider.enable()
    //     return provider
    //   },
    // },
  };
  const dispatch = useAppDispatch();
  const { provider, web3Provider, address, chainId } =
    useAppSelector(selectBlockchain);

  const getWeb3Modal = useCallback(async () => {
    const web3Modal = new Web3Modal({
      network: "testnet",
      cacheProvider: true,
      theme: "dark",
      providerOptions,
    });
    return web3Modal;
  }, []);

  const connect = useCallback(async () => {
    try {
      const web3Modal = await getWeb3Modal();
      const provider = await web3Modal.connect();
      const web3Provider = await new providers.Web3Provider(provider);
      const network = await web3Provider.getNetwork();

      if (network) {
        // const chainData = getChainData(network.chainId)
        // console.log(48, chainData);
        // if (network.chainId !== Number(CHAIN_ID)) {
        //   await provider.request({
        //     method: "wallet_addEthereumChain",
        //     params: [
        //       {
        //         chainId: 0x${(Number(CHAIN_ID)).toString(16)},
        //         chainName: CHAIN_NAME,
        //         rpcUrls: [RPC_URLS],
        //         iconUrls: [ICON_URLS],
        //         blockExplorerUrls: [BLOCKEXPLORERURLS],
        //         nativeCurrency: {
        //           name: NATIVE_CURRENCY_NAME,
        //           symbol: NATIVE_CURRENCY_SYMBOL,
        //           decimals: Number(NATIVE_CURRENCY_DECIMALS)
        //         }
        //       }
        //     ]
        //   })
        //   window.location.reload()
        //   return false
        // }

        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
        console.log("address => ", address);

        const auth = await getCookie("auth");

        if (!auth) {
          const _signature = await signer.signMessage(
            `UpOnly Authentication: ${address}`
          );

          if (_signature) {
            setCookie({ name: "auth", value: _signature, daysToLive: 30 });
          }
        }
        dispatch(
          SET_WEB3_PROVIDER({
            provider,
            web3Provider,
            address,
            chainId: network.chainId,
          })
        );
      }
    } catch (e) {
      return false;
    }
  }, [getWeb3Modal]);

  const disconnect = useCallback(async () => {
    const web3Modal = await getWeb3Modal();
    web3Modal.clearCachedProvider();
    if (provider?.disconnect && typeof provider.disconnect === "function") {
      await provider.disconnect();
      changeWallet();
    }
    dispatch(RESET_WEB3_PROVIDER());
    localStorage.clear();
    window.location.reload();
  }, [web3Provider]);

  const mintPrivate = useCallback(
    async (n: number) => {
      //console.log(web3Provider);
      const signature = await web3Provider.getSigner();
      console.log(signature);
      const signer = await web3Provider.getSigner();
      //console.log("signer" + signer);
      const contract = await new ethers.Contract(
        "0x501edB1BE98DE4c3E2c465bc334Cc5C3aD3C3308",
        CannathaiMintNFT.abi,
        signer
      );
      //console.log(contract);
      const mintNumbers = 0.35 * n;
      const options = {
        value: ethers.utils.parseEther(mintNumbers.toString()),
      };
      const mint = await contract.mintPrivateSale(n, options);
      await mint.wait();
      console.log("mint...");

      return mintPrivate;
      // return { hash: "" };
    },
    [address, web3Provider]
  );

  const changeWallet = useCallback(async () => {
    const web3Modal = await getWeb3Modal();
    const provider = await web3Modal.connect();

    await provider.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
  }, [getWeb3Modal]);

  return {
    connect,
    disconnect,
    getWeb3Modal,
    changeWallet,
    mintPrivate,
  };
};

export default useContract;
