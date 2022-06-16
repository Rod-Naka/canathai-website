import Image from "next/image";
import { useCallback, useState } from "react";
import useContract from "../hooks/useContract";

const HomepagePhoto = () => (
  <Image
    src="/images/chambray-light-grey.jpeg" // Route of the image file
    height={300} // Desired size with correct aspect ratio
    width={800} // Desired size with correct aspect ratio
    alt="Canathai Logo"
  />
);

const Homepage = () => {
  const { mintPrivate } = useContract();

  const [MintNumber, setMintNumber] = useState(1);

  const mintHandle = useCallback(async () => {
    const { hash, error }: any = await mintPrivate(MintNumber);
    if (hash) {
      console.log("Mint Success!!");
    }
    if (error) {
      alert("Mint Fail!!");
    }
  }, [MintNumber]);

  return (
    <div>
      <div className="flex justify-center items-center mt-10 opacity-25 rounded-full">
        <HomepagePhoto />
        {/* <div className="absolute w-full py-2.5 bottom-0 inset-x-0 bg-blue-400 text-white text-xs text-center leading-4">
          this is a text
        </div> */}
      </div>

      <div className="flex ml-12 mr-4 mt-32 text-white justify-center items-center">
        <p>
          Mother Plant collection includes 2,000 generative cannabis PFP NFTs
          unique combinations of 7 traits. Mother Plant collection is the
          continuation of CannaThai420 project, illustrating the vegetative
          stage of real-world cannabis growth. The “cloning” process allows
          growers to select the best cannabis plants and replicate them. This
          allows growing many more cannabis plants
        </p>
      </div>

      {/* <div className="mb-1 text-base font-medium text-green-700">Green</div> */}
      <div className="flex justify-center items-center">
        <div className="w-1/2 mt-5 bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-600 h-2.5 rounded-full w-[25%]"></div>
        </div>
      </div>

      <div className="mr-4 mt-4 flex text-white justify-center items-center">
        <p>0/2000</p>
      </div>

      <div className="mr-4 mt-4 flex text-white justify-center items-center">
        <p>Private round mint price: 0.15420</p>
      </div>

      <div className="flex text-black justify-center items-center">
        <input
          onChange={(e) => setMintNumber(Number(e.target.value))}
          value={MintNumber}
          min="1"
          max="5"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4 mt-4"
          id="mintnumber"
          type="number"
          placeholder="Mint Number"
        ></input>
        <button
          onClick={mintHandle}
          className="block mr-4 mt-4 bg-emerald-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Mint
        </button>

        <button className="mt-4 bg-cyan-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-100">
          View On Opensea
        </button>
      </div>
    </div>
  );
};

export default Homepage;
