import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import useContract from "../hooks/useContract";
import { selectBlockchain } from "../redux/features/blockchain/blockchainSlice";
import { useAppSelector } from "../redux/hooks";

const CanathaiLogo = () => (
  <Image
    src="/images/CcLogo.402a6dad.png" // Route of the image file
    height={75} // Desired size with correct aspect ratio
    width={90} // Desired size with correct aspect ratio
    alt="Canathai Logo"
  />
);

const Nav = () => {
  const { connect, disconnect, getWeb3Modal } = useContract();

  const { web3Provider, address } = useAppSelector(selectBlockchain);

  const cachedProvider = useCallback(async () => {
    const web3Modal = await getWeb3Modal();
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [getWeb3Modal]);

  // Auto connect to the cached provider
  useEffect(() => {
    cachedProvider();
    return () => {};
  }, [cachedProvider]);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-transparent p-6">
      {/* <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/homepage">
          <CanathaiLogo />
        </a>
      </div> */}
      <div className="flex items-center w-auto opacity-50">
        <div className="flex ml-auto text-sm flex-grow">
          <a
            href="about/about"
            className="block mt-4 inline-block mt-0 text-white hover:text-white mr-4 text-xl mr-auto"
          >
            About
          </a>
          <a
            href="/thejourney/thejourney"
            className="block mt-4 inline-block mt-0 text-white hover:text-white mr-4 text-xl"
          >
            The Journey
          </a>
          <a
            href="/rarity/rarity"
            className="block mt-4 mr-4 inline-block mt-0 text-white hover:text-white text-xl"
          >
            Rarity
          </a>
          <a
            href="/roadmap/roadmap"
            className="block mt-4 mr-4 inline-block mt-0 text-white hover:text-white text-xl"
          >
            Roadmap
          </a>
          <a
            href="/faq/faq"
            className="block mt-4 mr-4 inline-block mt-0 text-white hover:text-white text-xl"
          >
            FAQ
          </a>
        </div>
        <div className="flex mr-auto inline-block ml-auto">
          {web3Provider ? (
            <div>
              <span className="text-white opacity-25">{address}</span>
              <button
                onClick={disconnect}
                className="inline-block text-xl px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 mt-0"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              className="inline-block text-xl px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 mt-0"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
