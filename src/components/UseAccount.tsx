import useIsMounted from "@/hooks/useIsMounted";
import React from "react";
import { useAccount } from "wagmi";

const UseAccount = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const mounted = useIsMounted();

  if (isConnecting) return <div style={{marginTop:"20px"}}>Connecting…</div>;
  if (isDisconnected) return <div style={{marginTop:"20px"}}>Disconnected</div>;
  return (
    <div style={{marginTop:"20px"}}>
      {address ? (
        <div>your address is : {address}</div>
      ) : (
        <div>please connect your wallet</div>
      )}
    </div>
  );
};

export default UseAccount;
