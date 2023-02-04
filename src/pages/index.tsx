import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import UseAccount from "@/components/UseAccount";
import useIsMounted from "@/hooks/useIsMounted";
import UseBalance from "@/components/UseBalance";
import SentTransaction from "@/components/SentTransaction";
import { MintNFT } from "@/components/ContractWrite";
import { SignMessage } from "@/components/SignMessage";
import { MintNFTForm } from "@/components/DynamicContractWrite";

export default function Home() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const mounted = useIsMounted();

  return (
    <>
      <div>
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
      </div>
      <div>{mounted ? <UseAccount /> : ""}</div>
      <div>{mounted ? <UseBalance /> : ""}</div>
      <div>{mounted ? isConnected && <SentTransaction /> : ""}</div>
      <div>{mounted ? isConnected && <MintNFT /> : ""}</div>
      <div>{mounted ? isConnected && <SignMessage /> : ""}</div>
      <div>{mounted ? isConnected && <MintNFTForm /> : ""}</div>
    </>
  );
}
