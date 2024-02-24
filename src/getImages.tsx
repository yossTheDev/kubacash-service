import { Resvg } from "@resvg/resvg-js";
import fs from "fs/promises";
import satori from "satori";
import { CurrencyImage } from "./components/CurrencyImage";
import { getTodayData, getYesterdayData } from "./getData";
import { ExchangeType } from "./interfaces/CurrencyType";
import dayjs from "dayjs";

const getImages = async (type: ExchangeType) => {
  const data = await getTodayData(type);
  const yesterday = await getYesterdayData(type);
  const { rates } = data;

  const poppinsRegularData = await fs.readFile(
    "./src/assets/fonts/Poppins-Regular.ttf"
  );
  const poppinsBoldData = await fs.readFile(
    "./src/assets/fonts/Poppins-Bold.ttf"
  );

  const svg = await satori(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundImage:
          "url(https://products.ls.graphics/mesh-gradients/images/29.-Pale-Cornflower-Blue_1.jpg)",
        backgroundPosition: "center",
        backgroundSize:
          type === ExchangeType.informal ? "600px 400px" : "600px 700px",
        backgroundRepeat: "no-repeat",
        padding: "3rem",
        alignItems: "center",
        width: "600px",
        height: type === ExchangeType.informal ? "400px" : "700px",
        gap: "2rem",
      }}
      className="items"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#eeffff",
            color: "#212121",
            padding: "2rem",
            borderRadius: "1.2rem",
            marginTop: "2rem",
            backdropFilter: "blur(2px)",
          }}
        >
          <p
            style={{
              fontWeight: "700",
              marginLeft: "auto",
              marginRight: "auto",
              fontFamily: "Poppins-Bold",
            }}
          >
            Tasas de Cambio{" "}
            {type === ExchangeType.formal ? "Formal" : "Informal"}
          </p>

          <table
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <thead
              style={{
                display: "flex",
                gap: "2rem",
                marginBottom: "0.5rem",
                borderBottom: "1px solid #ddd",
              }}
            >
              <tr
                style={{ display: "flex", gap: "2rem", alignItems: "center" }}
              >
                <th style={{ marginLeft: "1rem" }}>Moneda</th>
                <th>Compra</th>
                <th>Venta</th>
              </tr>
            </thead>

            <tbody style={{ display: "flex", flexDirection: "column" }}>
              {Object.entries(rates)
                .filter(([currency]) => currency !== "CUP")
                .map(([currency, rate]) => (
                  <tr
                    style={{
                      display: "flex",
                      gap: "2rem",
                      borderBottom: "1px solid #ddd",
                      alignItems: "center",
                    }}
                    key={currency}
                  >
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CurrencyImage currency={currency}></CurrencyImage>

                        <p style={{ marginLeft: "0.2rem" }}>{currency}</p>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p
                          style={{
                            textAlign: "center",
                            color:
                              yesterday.rates[currency].buy < rate.buy
                                ? "#02ec5a"
                                : "#ff4848",
                          }}
                        >
                          ${rate.buy.toFixed(2)}
                        </p>
                        {yesterday.rates[currency].buy < rate.buy ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="#02ec5a"
                            viewBox="0 0 256 256"
                          >
                            <path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="#ff4848"
                            viewBox="0 0 256 256"
                          >
                            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                          </svg>
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p
                          style={{
                            textAlign: "center",
                            color:
                              yesterday.rates[currency].sell < rate.sell
                                ? "#02ec5a"
                                : "#ff4848",
                          }}
                        >
                          ${rate.sell.toFixed(2)}
                        </p>
                        {yesterday.rates[currency].sell < rate.sell ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="#02ec5a"
                            viewBox="0 0 256 256"
                          >
                            <path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="#ff4848"
                            viewBox="0 0 256 256"
                          >
                            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                          </svg>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            gap: "0.2rem",
            opacity: "0.6",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#eeffff"
            viewBox="0 0 256 256"
          >
            <path d="M236.88,26.19a9,9,0,0,0-9.16-1.57L25.06,103.93a14.22,14.22,0,0,0,2.43,27.21L80,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L173,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L239.77,35A9,9,0,0,0,236.88,26.19Zm-61.14,36L86.15,126.35l-49.6-9.73ZM96,200V152.52l24.79,21.74Zm87.53,8L100.85,135.5l119-85.29Z"></path>
          </svg>
          <p
            style={{
              color: "#eeffff",
            }}
          >
            t.me/kubacash
          </p>
        </div>
      </div>
    </div>,
    {
      width: 600,
      height: type === ExchangeType.informal ? 400 : 700,
      fonts: [
        {
          name: "Poppins-Regular",
          data: poppinsRegularData as Buffer,
          style: "normal",
        },

        {
          name: "Poppins-Bold",
          data: poppinsBoldData as Buffer,
          style: "normal",
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 600,
    },
  });

  const image = resvg.render();

  fs.writeFile(
    `./dist/data/${dayjs().format("YYYY-MM-DD")}/${type}.png`,
    image.asPng()
  );
};

getImages(ExchangeType.formal);
getImages(ExchangeType.informal);
