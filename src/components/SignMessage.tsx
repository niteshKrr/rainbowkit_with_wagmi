import * as React from "react";
import { useState } from "react";
import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";

export function SignMessage() {
  const [inputdata, setInputdata] = useState("");

  const recoveredAddress = React.useRef<string>();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });

  const onchangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputdata(event.target.value);
  };

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const message = inputdata;
    signMessage({ message });
    // console.log(event);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <label htmlFor="message">Enter a message to sign</label>
      <div>
      <textarea
        onChange={onchangeHandler}
        id="message"
        name="message"
        placeholder="The quick brown fox…"
      />
      </div>
      <button onClick={clickHandler} disabled={isLoading}>
        {isLoading ? "Check Wallet" : "Sign Message"}
      </button>

      {data && (
        <div>
          <div>Recovered Address: {recoveredAddress.current}</div>
          <div>Signature: {data}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
}
