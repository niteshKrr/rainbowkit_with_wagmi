import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import useIsMounted from "@/hooks/useIsMounted";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const mounted = useIsMounted();
  const addRecentTransaction = useAddRecentTransaction();

  return (
    <>
      <ConnectButton
        label="Sign in"
        showBalance={{
          smallScreen: false,
          largeScreen: true,
        }}
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
      />
      <div style={{marginTop:"30px"}}>
        {mounted ? (
          address && <div>your address is : {address}</div>
        ) : (
          <div>please connect your wallet</div>
        )}
      </div>
      {/* <div>
        <button
          onClick={() => {
            addRecentTransaction({
              hash: "0x...",
              description: "...",
            });
          }}
        >
          Add recent transaction
        </button>
      </div> */}
    </>
  );
}
