import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export function MintNFT() {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    // address of contract wagmi where "mint" function is defined
    address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
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
            <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>
              Etherscan
            </a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  );
}
