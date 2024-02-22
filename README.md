# 💸💱 Kubacash-Service API

La API Kubacash-Service proporciona acceso a las tasas de cambio en Cuba para una fecha específica.

## 🛜 Endpoints

Obtener Tasas de Cambio

**Método**: GET

**URL**: <https://yossthedev.me/kubacash-service/data/{date}/{type}.json>

**Descripción**: Obtiene las tasas de cambio informal para la fecha especificada en formato JSON.

**Parámetros de URL**:

* **date** (requerido): Fecha en formato "YYYY-MM-DD".
* **type** (requerido): Tipo de Camabio (Formal o Informal).

Ejemplo de Respuesta Exitosa

```json
{
  "currency": "CUP",
  "exchange_direction": "target",
  "date_time": "2024-02-22T00:00:26.066Z",
  "rates": {
    "USD": {"buy": 305.67, "sell": 307.88, "mid": 306.775},
    "MLC": {"buy": 260.94, "sell": 264.35, "mid": 262.645},
    "CUP": {"buy": 1, "sell": 1, "mid": 1},
    "EUR": {"buy": 311.2, "sell": 313.43, "mid": 312.315}
  }
}
```

**Ejemplo de Solicitud**

```
GET https://yossthedev.me/kubacash-service/data/2024-02-22/informal.json
```

**Respuesta**

```json
{
  "currency": "CUP",
  "exchange_direction": "target",
  "date_time": "2024-02-22T00:00:26.066Z",
  "rates": {
    "USD": {"buy": 305.67, "sell": 307.88, "mid": 306.775},
    "MLC": {"buy": 260.94, "sell": 264.35, "mid": 262.645},
    "CUP": {"buy": 1, "sell": 1, "mid": 1},
    "EUR": {"buy": 311.2, "sell": 313.43, "mid": 312.315}
  }
}
```

## 🤝 Consideraciones

* La fecha en la URL debe estar en el formato correcto ("YYYY-MM-DD").
* Las tasas de cambio se proporcionan para las monedas USD, MLC, CUP y EUR.
* Los valores de compra (buy), venta (sell) y medio (mid) se expresan en la moneda de destino (CUP).
* Datos Guardados a partir del 21/2/2024
