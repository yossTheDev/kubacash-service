import React from "react";

interface Props {
  currency: string;
  buy: number;
  sell: number;
}

export const CurrencyItem: React.FC<Props> = ({ buy, currency, sell }) => {
  return (
    <tr>
      <td>
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            alignItems: "center",
          }}
        >
          <img style={{ height: "3rem", width: "3rem" }}></img>
          <p>{currency}</p>
        </div>
      </td>
      <td>{buy}</td>
      <td>{sell}</td>
    </tr>
  );
};
