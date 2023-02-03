import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useAccount } from "wagmi";


export function MintNFT() {

  const { address } = useAccount();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: address,
    abi: [
      {
        name: "mint",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [],
        outputs: [],
      },
    ],
    functionName: "mint",
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    write?.();
    // console.log(event);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <button disabled={!write || isLoading} onClick={clickHandler}>
        {isLoading ? "Minting..." : "Mint"}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  );
}
