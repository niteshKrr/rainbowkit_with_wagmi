import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "use-debounce";

export function MintNFTForm() {
  const [tokenId, setTokenId] = React.useState("");
  const [debouncedTokenId] = useDebounce(tokenId, 500);

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
        inputs: [{ internalType: "uint32", name: "tokenId", type: "uint32" }],
        outputs: [],
      },
    ],
    functionName: "mint",
    args: [parseInt(debouncedTokenId)],
    enabled: Boolean(debouncedTokenId),
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const onchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenId(event.target.value);
  };

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    write?.();
    // console.log(event);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <label>Token ID</label>
      <div>
        <input
          id="tokenId"
          onChange={onchangeHandler}
          placeholder="420"
          value={tokenId}
        />
      </div>
      <button disabled={!write || isLoading}>
        {isLoading ? "Minting..." : "Mint"}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  );
}
