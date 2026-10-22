# 📦 SUZ — CRM Comercial & Gestión de Clientes

**SUZ** es una plataforma web full-stack diseñada como un **CRM comercial y de fidelización de ventas recurrentes** para distribución de mercadería (harina, azúcar, materias primas y commodities).

El sistema permite anticipar las necesidades de reposición de cada comercio, gestionar cuentas corrientes en tiempo real y coordinar pedidos con clientes mediante un solo clic a WhatsApp.

---

## 🚀 Características Principales

* 🗂️ **Tarjetas CRM Inteligentes (Dark Mode):** Interfaz moderna y responsiva que reemplaza las tablas convencionales por fichas ejecutivas claras y legibles en cualquier dispositivo (PC, tablet o celular).
* 📅 **Motor de Ciclo Comercial y Semáforo de Reposición:**
  * Calcula automáticamente la fecha estimada de la próxima compra:
    $$\text{Próxima Compra} = \text{Última Compra} + \text{Frecuencia (7, 15 o 30 días)}$$
  * **Semáforo comercial de alerta:**
    * 🟢 **Al día:** El cliente aún cuenta con stock suficiente.
    * 🟡 **Toca comprar HOY / En 1-2 días:** Momento ideal para contactar al cliente y coordinar la venta.
    * 🔴 **Vencido:** Plazo de reposición excedido (alerta de retención de cliente).
* 💰 **Facturación y Cuenta Corriente en Vivo:**
  * **Monto Total:** Cálculo automático en tiempo real ($\text{Cantidad en kg} \times \text{Precio por kilo}$).
  * **Monto Pagado:** Control del dinero entregado por el cliente.
  * **Deuda Pendiente:** Cálculo en vivo ($\max(0, \text{Monto Total} - \text{Monto Pagado})$) con botón de **Saldar en 1 clic**.
* 📲 **Acción Comercial Directa (WhatsApp):** Botón integrado que abre el chat con el contacto y redacta automáticamente el mensaje para coordinar la reposición del producto.
* 📍 **Segmentación Geográfica:** Organización de clientes por zonas (**Chaco**, **Corrientes**, **Interior**) divididos en dos bloques prioritarios: *Con Deuda Pendiente* y *Clientes al Día*.
* 🔍 **Buscador Multicriterio:** Filtro instantáneo por Razón Social, Persona de Contacto o Localidad.

---

## 🛠️ Tecnologías Utilizadas

### Frontend (`my-app/`)
* **React 18** & **React DOM**
* **Redux** & **React Redux** (Gestión de estado global)
* **Redux Thunk** (Middleware para acciones asíncronas)
* **React Router DOM v5** (Enrutamiento SPA)
* **Axios** (Peticiones HTTP a la API)
* **CSS3 Dark Mode nativo** con variables CSS y tipografías *Space Grotesk* e *Inter*.

### Backend (`Server/`)
* **Node.js** (Entorno de ejecución del servidor)
* **Express** (API REST, middlewares y enrutamiento)
* **Sequelize ORM** (Modelado relacional y consultas SQL)
* **MySQL2** (Conector de alto rendimiento a base de datos MySQL)
* **CORS**, **Morgan** y **Dotenv** (Seguridad, logging y variables de entorno)

---

## 📁 Estructura del Repositorio

```text
Gestion-de-clientes/
├── .gitignore             # Archivos excluidos de Git (node_modules, builds, etc.)
├── README.md              # Documentación principal del repositorio
│
├── Server/                # ⚙️ Backend (API REST Node.js + Express + Sequelize)
│   ├── src/
│   │   ├── controller/    # Lógica de negocio (clientesController.js)
│   │   ├── models/        # Modelos relacionales (Clientes.js, Pedidos.js)
│   │   ├── routes/        # Enrutadores API (clientesRouter.js, Index.js)
│   │   ├── app.js         # Configuración del servidor Express y middlewares
│   │   ├── db.js          # Conexión Sequelize a MySQL
│   │   └── index.js       # Punto de entrada del servidor (puerto 3001)
│   └── package.json
│
└── my-app/                # 🎨 Frontend (Single Page Application React 18)
    ├── public/            # Plantilla HTML y favicon
    ├── src/
    │   ├── components/    # Componentes reutilizables (Card CRM, SearchBar)
    │   ├── redux/         # Store, Actions y Reducers
    │   ├── views/         # Vistas: Landing, Form, Chaco, Corrientes, Interior
    │   ├── App.js         # Enrutador principal
    │   └── index.js       # Montaje en el DOM
    └── package.json
```

---

## ⚙️ Instalación y Puesta en Marcha

### Prerrequisitos
* [Node.js](https://nodejs.org/) (versión 16 o superior).
* [MySQL](https://www.mysql.com/) en ejecución en el puerto `3306` con una base de datos llamada `gestionclientes`.

### 1. Clonar el repositorio
```bash
git clone https://github.com/Galadaniela/Gestion-de-clientes.git
cd Gestion-de-clientes
```

### 2. Configurar y arrancar el Backend (`Server`)
```bash
cd Server
npm install
npm start
```
> El servidor quedará escuchando en: `http://localhost:3001`

### 3. Configurar y arrancar el Frontend (`my-app`)
En una nueva pestaña o ventana de la terminal:
```bash
cd my-app
npm install
npm start
```
> La aplicación se abrirá automáticamente en tu navegador en: `http://localhost:3000`

---

## 📝 Licencia y Créditos
Desarrollado para la optimización de procesos comerciales y logística de distribución.
