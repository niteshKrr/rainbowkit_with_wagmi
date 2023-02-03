import React from "react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { utils } from "ethers";

const SentTransaction = () => {
  const [to, setTo] = useState("");
  const [debouncedTo] = useDebounce(to, 500);

  const [amount, setAmount] = useState("");
  const [debouncedAmount] = useDebounce(amount, 500);

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
    },
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    sendTransaction?.();
    // console.log(event);
  };

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div style={{ marginTop: "40px" }}>
      <input
        aria-label="Recipient"
        onChange={(e) => setTo(e.target.value)}
        placeholder="0xA0Cf…251e"
        value={to}
      />
      <input
        aria-label="Amount (ether)"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.05"
        value={amount}
      />
      <div>
        <button onClick={clickHandler} disabled={!to || !amount}>
          Send
        </button>
      </div>
      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SentTransaction;
