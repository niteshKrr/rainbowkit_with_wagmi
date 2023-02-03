import React from "react";
import { useBalance } from "wagmi";
import { useAccount } from "wagmi";

const UseBalance = () => {
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
    // formatUnits: "gwei",
    // token: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  );
};

export default UseBalance;
