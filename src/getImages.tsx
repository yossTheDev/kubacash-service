import { Resvg } from "@resvg/resvg-js";
import fs from "fs/promises";
import satori from "satori";
import { CurrencyImage } from "./components/CurrencyImage";
import { getTodayData } from "./getData";

const getImages = async () => {
  const data = await getTodayData();
  const { rates } = data;

  const poppinsRegularData = await fs.readFile(
    "./src/assets/fonts/Poppins-Regular.ttf"
  );
  const poppinsBoldData = await fs.readFile(
    "./src/assets/fonts/Poppins-Regular.ttf"
  );

  const svg = await satori(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundImage:
          "url(https://products.ls.graphics/mesh-gradients/images/29.-Pale-Cornflower-Blue_1.jpg)",
        backgroundPosition: "center",
        backgroundSize: "600px 400px",
        backgroundRepeat: "no-repeat",
        padding: "3rem",
        alignItems: "center",
        width: "600px",
        height: "400px",
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
            Tasas de Cambio Informal
          </p>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            <p style={{ marginLeft: "1rem" }}>Moneda</p>
            <p>Compra</p>
            <p>Venta</p>
          </div>

          {Object.entries(rates)
            .filter(([currency]) => currency !== "CUP")
            .map(([currency, rate]) => (
              <div
                key={currency}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                  borderBottom: "1px solid #ddd",
                  width: "260px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CurrencyImage currency={currency}></CurrencyImage>

                  <p style={{ marginLeft: "1rem" }}>{currency}</p>
                </div>

                <p style={{ marginLeft: "1rem", textAlign: "center" }}>
                  ${rate.buy}
                </p>
                <p style={{ textAlign: "center" }}>${rate.sell}</p>
              </div>
            ))}
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
      height: 400,
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

  fs.writeFile("./image.png", image.asPng());
};

getImages();
