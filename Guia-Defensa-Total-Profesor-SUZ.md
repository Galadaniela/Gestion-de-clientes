# SUZ CRM Comercial — Guía de Estudio y Defensa Total del Proyecto
> **Material de Examen, Estudio y Defensa Técnica para Estudiante de Programación**  
> **Proyecto:** SUZ (Gestión Comercial y Fidelización de Clientes Mayoristas)  
> **Stack:** React 18, Redux, Redux-Thunk, React Router v5, Node.js, Express, Sequelize, MySQL  
> **Estado:** 100% Funcional, Testeado y Listo para Producción

---

## 📖 Índice General
1. [Explicación General del Proyecto](#1-explicación-general-del-proyecto)
2. [Estructura de Carpetas y Archivos](#2-estructura-de-carpetas-y-archivos)
3. [Explicación del Código Paso a Paso: Backend (API REST)](#3-explicación-del-código-paso-a-paso-backend)
4. [Explicación del Código Paso a Paso: Frontend (React & Redux)](#4-explicación-del-código-paso-a-paso-frontend)
5. [Recorrido Integral del Dato (Flujo y Diagramas)](#5-recorrido-integral-del-dato)
6. [Las 5 Partes Más Difíciles del Proyecto Explicadas](#6-las-5-partes-más-difíciles-del-proyecto-explicadas)
7. [Banco de Preguntas de Examen y Respuestas Modelo](#7-banco-de-preguntas-de-examen-y-respuestas-modelo)
8. [Guion Oral para la Presentación Frente al Profesor](#8-guion-oral-para-la-presentación-frente-al-profesor)
9. [Glosario Técnico de Programación](#9-glosario-técnico-de-programación)
10. [Plan de Estudio y Checklist de Autoevaluación](#10-plan-de-estudio-y-checklist-de-autoevaluación)

---

## 1. Explicación General del Proyecto

### 1.1 ¿Qué hace la aplicación y cuál es su objetivo?
**SUZ** es un **CRM Comercial y de Fidelización de Ventas Recurrentes** desarrollado a medida para una empresa distribuidora mayorista de materias primas (principalmente harina y azúcar).

Su objetivo es dejar atrás las libretas de papel y planillas estáticas para convertirse en una **herramienta comercial predictiva**: calcula en tiempo real cuándo se quedará sin mercadería cada cliente (panadería, fábrica de pastas, supermercado) según su frecuencia de compra habitual y alerta al vendedor con un **Semáforo Comercial** para coordinar la reposición por WhatsApp antes de que le compre a la competencia.

### 1.2 ¿Qué problema real resuelve?
1. **Pérdida de ventas por falta de seguimiento:** En el negocio mayorista, los clientes compran cada 7, 15 o 30 días. Si el preventista no se comunica a tiempo, la venta se pierde. El sistema predice la fecha exacta de reposición.
2. **Errores humanos en cuentas corrientes:** Maneja ventas de gran tonelaje con pagos parciales y señas. Automatiza el cálculo: `Total = Kilos × Precio` y `Deuda = Total - Monto Pagado`, con botón directo para saldar cuentas a $0 en un clic.
3. **Privacidad y confidencialidad zonal:** Los vendedores de una provincia no deben interferir con carteras ajenas. Implementa control de acceso y roles que segmenta:
   * **Chaco (Gran Resistencia)**
   * **Corrientes**
   * **Interior de Chaco** (Presidencia Roque Sáenz Peña, Villa Ángela, Castelli, Charata, etc.)
   * **Administración General** (acceso universal).

### 1.3 Stack Tecnológico y Justificación
* **React 18 (Frontend SPA):** Permite una interfaz reactiva sin recargas de página, modularizada en componentes reutilizables (`Card`, `Form`, `HeaderNav`).
* **Redux & Redux-Thunk:** Centraliza el estado global de clientes. Thunk permite despachar peticiones asíncronas con Axios a la API REST.
* **React Router v5:** Enrutamiento del lado del cliente y protección de vistas mediante el componente guardián `ProtectedRoute`.
* **Node.js & Express:** Servidor HTTP ágil y liviano con arquitectura modular de Rutas y Controladores.
* **Sequelize ORM:** Mapeador objeto-relacional para MySQL. Permite migraciones seguras en caliente con `sync({ alter: true })`.
* **MySQL 2:** Base de datos relacional para garantizar consistencia transaccional y financiera con campos `DECIMAL(12, 2)`.
* **Dotenv (.env):** Seguridad para aislar contraseñas y puertos fuera del repositorio Git.

> **🗣️ Speech para el Profesor:**  
> *"El proyecto se llama SUZ y es un CRM comercial full-stack desarrollado con React, Redux, Node.js y MySQL. Nació de la necesidad real de una empresa distribuidora de harina y azúcar de transformar una libreta estática de clientes en una herramienta predictiva. El sistema analiza la fecha de última compra y la frecuencia habitual del cliente para alertar mediante un semáforo visual cuándo se le va a terminar el stock, facilitando contactarlo por WhatsApp en un clic. Además, calcula cuentas corrientes en vivo con montos de hasta diez mil millones de pesos y restringe la información por zonas geográficas mediante un sistema de login con roles."*

---

## 2. Estructura de Carpetas y Archivos

```text
Gestion-de-clientes/
├── .gitignore                   <- Ignora archivos .env para no filtrar claves a GitHub
├── README.md                    <- Portada del proyecto
├── Server/                      <- BACKEND (Node.js + Express + Sequelize + MySQL)
│   ├── .env                     <- Variables privadas de entorno (puerto, MySQL, CORS)
│   ├── .env.example             <- Plantilla pública sin contraseñas para colaboradores
│   ├── package.json             <- Dependencias del backend
│   └── src/
│       ├── index.js             <- Punto de inicio: conecta a MySQL, sincroniza tablas y arranca Express
│       ├── app.js               <- Configura middlewares (CORS dinámico, Morgan, JSON parser)
│       ├── db.js                <- Conexión Sequelize a MySQL con fallbacks de seguridad
│       ├── crear_tablas.js      <- Script de migración segura con alter: true
│       ├── controller/
│       │   └── clientesController.js <- Métodos CRUD (findAll, create, findByPk, save, destroy)
│       ├── models/
│       │   ├── Clientes.js      <- Modelo relacional de clientes (UUID, kilos, precio, deuda)
│       │   └── Pedidos.js       <- Modelo de pedidos (scaffolding inicial)
│       └── routes/
│           ├── Index.js         <- Enrutador principal
│           ├── clientesRouter.js<- Endpoints REST /clientes (GET, POST, PUT, DELETE)
│           └── pedidosRouter.js <- Enrutador secundario (scaffolding inicial)
└── my-app/                      <- FRONTEND (React 18 + Redux)
    ├── .env                     <- REACT_APP_API_URL=http://localhost:3001
    ├── .env.example             <- Plantilla pública del frontend
    ├── package.json             <- Dependencias frontend y script de build con memoria ampliada
    └── src/
        ├── index.js             <- Montaje de React con Provider de Redux, BrowserRouter y ToastProvider
        ├── index.css            <- Variables CSS globales, Dark Mode y fuentes Space Grotesk / Inter
        ├── App.js               <- Enrutador central con HeaderNav y ProtectedRoute
        ├── context/
        │   ├── ToastContext.jsx <- Contexto global para notificaciones flotantes (sin alert nativo)
        │   └── Toast.css        <- Estilos Glassmorphism Dark Mode
        ├── components/
        │   ├── ProtectedRoute.jsx <- Componente de seguridad para verificar roles y sesión
        │   ├── HeaderNav/       <- Barra superior con badges, menú admin y logout
        │   ├── Card/            <- Tarjeta CRM con semáforo, botón WhatsApp y Saldar en vivo
        │   └── SearchBar/       <- Input reactivo de búsqueda multicriterio
        ├── redux/
        │   ├── store.js         <- Configuración del Store con Thunk middleware
        │   ├── actions.js       <- Peticiones HTTP asíncronas con Axios
        │   └── reducer.js       <- Reducer puro con inmutabilidad
        ├── utils/
        │   ├── auth.js          <- Catálogo de usuarios por provincia y gestión en localStorage
        │   └── config.js        <- Centralización de API_URL para todo el cliente
        └── views/
            ├── Login/           <- Inicio de sesión con accesos rápidos de demo de 1 clic
            ├── Landing/         <- Portada general con selector de provincias
            ├── Form/            <- Formulario con cálculos automáticos y selector de zona
            └── Home/            <- Vistas zonales (Chaco, Corrientes, Interior de Chaco)
```

---

## 3. Explicación del Código Paso a Paso: Backend

### 3.1 Conexión a Base de Datos (`Server/src/db.js`)
```javascript
require('dotenv').config(); // Carga las variables desde el archivo .env
const { Sequelize } = require('sequelize');
const Clientesmodels = require("./models/Clientes");

// Leemos credenciales desde variables de entorno con fallbacks seguros
const DB_NAME = process.env.DB_NAME || 'gestionclientes';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'gala12345';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql', // Motor relacional
  logging: false,   // Limpia la consola de consultas SQL en crudo
});

Clientesmodels(sequelize); // Inicializa el modelo pasándole la conexión activa
```
* **¿Qué hace?** Lee las credenciales protegidas desde `.env`, crea la conexión Sequelize a MySQL y activa el modelo `Clientes`.
* **Concepto para el alumno:** En lugar de poner la contraseña visible en el código, usamos `process.env`. Si el archivo `.env` no existe, el fallback previene que el servidor crashee en desarrollo local.

### 3.2 Modelo de Clientes (`Server/src/models/Clientes.js`)
```javascript
sequelize.define("Clientes", {
  id: {
    type: DataTypes.STRING(36),
    defaultValue: () => uuidv4(), // Genera un identificador único universal
    primaryKey: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, unique: true },
  contacto: { type: DataTypes.STRING, allowNull: true },
  provincia: { type: DataTypes.STRING, allowNull: false },
  frecuencia: { type: DataTypes.INTEGER, defaultValue: 7 },
  cantidadKg: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  precioKg: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  monto: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  deuda: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
});
```
* **¿Por qué `DECIMAL(12, 2)`?** Con `DECIMAL(8, 2)` el número más alto permitido era $999.999,99. Como un cliente real debía $1.320.000, MySQL crasheaba. Con `DECIMAL(12, 2)` soportamos operaciones mayoristas de hasta diez mil millones de pesos.
* **¿Por qué UUID?** Impide que terceros adivinen la cantidad de clientes o accedan a datos ajenos enumerando IDs secuenciales (1, 2, 3...).

### 3.3 Arranque y Migración Segura (`Server/src/index.js`)
```javascript
await sequelize.authenticate(); // Prueba de autenticación con MySQL
await sequelize.sync({ alter: true }); // Migración segura: crea columnas sin borrar datos
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
```
* **Pregunta de examen:** *¿Por qué nunca usar `force: true`?* Porque `force: true` ejecuta un `DROP TABLE` destructivo que borra todas las filas existentes de clientes reales. Con `{ alter: true }`, Sequelize ejecuta `ALTER TABLE ADD COLUMN` solo para lo que falta y preserva todos los clientes intactos.

---

## 4. Explicación del Código Paso a Paso: Frontend

### 4.1 Guardián de Rutas (`my-app/src/components/ProtectedRoute.jsx`)
```javascript
const ProtectedRoute = ({ component: Component, render, rolPermitido, ...restoDeProps }) => {
  return (
    <Route
      {...restoDeProps}
      render={(props) => {
        const usuario = obtenerUsuarioActual(); // Lee sesión desde localStorage

        if (!usuario) return <Redirect to="/login" />; // Sin sesión -> al login

        if (usuario.rol === "admin") return Component ? <Component {...props} /> : render(props);

        if (usuario.rol === rolPermitido) return Component ? <Component {...props} /> : render(props);

        // Si intenta entrar a una zona no autorizada, lo devuelve a su provincia
        const mapaRutas = { chaco: "/Chaco", corrientes: "/corrientes", interior: "/Interior" };
        return <Redirect to={mapaRutas[usuario.rol] || "/login"} />;
      }}
    />
  );
};
```
* **Concepto:** Actúa como un interceptor de seguridad en el cliente. Impide que un usuario no autenticado o un vendedor de una zona acceda a carteras ajenas modificando la URL del navegador.

### 4.2 Motor del Semáforo Comercial (`my-app/src/components/Card/Card.js`)
```javascript
export const calcularCicloComercial = (fechaUltima, diasFrecuencia = 7) => {
  if (!fechaUltima) return { badgeTexto: "⚪ Sin fecha", estado: "sin-fecha" };

  const dias = Number(diasFrecuencia) || 7;
  const ultima = new Date(fechaUltima);
  
  // Próxima compra estimada = Última compra + Frecuencia habitual
  const proxima = new Date(ultima);
  proxima.setDate(proxima.getDate() + dias);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // Diferencia de días
  const diffDias = Math.round((proxima.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDias < 0) {
    return { badgeTexto: `🔴 Vencido (${Math.abs(diffDias)} días)`, estado: "vencido" };
  } else if (diffDias <= 2) {
    return { badgeTexto: "🟡 ¡Toca comprar HOY!", estado: "hoy" };
  }
  return { badgeTexto: `🟢 En fecha (${diffDias} días restantes)`, estado: "en-fecha" };
};
```
* **Valor comercial:** Da prioridad de llamado telefónico a los clientes con semáforo amarillo (toca hoy) o rojo (vencido), evitando que se queden sin stock o le compren a un competidor.

### 4.3 Sistema de Notificaciones Toast (`my-app/src/context/ToastContext.jsx`)
* Reemplazó los `window.alert()` nativos que congelaban el hilo de JavaScript y afeaban el Dark Mode.
* Usa React Context nativo (`useToast()`) con tarjetas flotantes translúcidas (Glassmorphism) que desaparecen solas a los 3.5 segundos con animación de entrada.

---

## 5. Recorrido Integral del Dato

```text
[ FORMULARIO REACT (Form.jsx) ]
    │  Usuario ingresa: Cliente, 500 kg harina a $850/kg, pago de $300.000.
    │  Cálculo en vivo: Total = $425.000 | Deuda = $125.000.
    ▼
[ REDUX THUNK (actions.js) ]
    │  dispatch(postClientes(cliente))
    │  Axios envía HTTP POST a http://localhost:3001/clientes
    ▼
[ EXPRESS BACKEND (Server/src/app.js) ]
    │  Middleware cors() valida origen (CLIENT_URL).
    │  Middleware express.json() parsea el cuerpo de la petición.
    ▼
[ CONTROLADOR (clientesController.js) ]
    │  Desestructura req.body, valida números y llama a Clientes.create().
    ▼
[ SEQUELIZE ORM & MYSQL2 ]
    │  Traduce a SQL: INSERT INTO Clientes (...) VALUES (...)
    ▼
[ BASE DE DATOS MYSQL (Puerto 3306) ]
    │  Guarda la fila con clave primaria UUID v4.
    ▼
[ RESPUESTA & RENDERIZADO ]
    │  Backend responde status 200 con el JSON del cliente creado.
    │  ToastContext muestra notificación verde flotante: "¡Cliente registrado exitosamente!".
    │  Redux guarda el cliente en el Store.
    │  history.push("/Chaco") redirige a la vista provincial.
    │  Chaco.jsx filtra automáticamente al cliente en la sección roja "Con Deuda Pendiente".
```

---

## 6. Las 5 Partes Más Difíciles del Proyecto Explicadas

### 1. ¿Por qué Redux en lugar de simple `useState`?
* `useState` es local a un solo componente.
* `Redux` provee un estado global compartido: cuando el formulario da de alta un cliente, la vista de Chaco, de Corrientes o del Interior se enteran inmediatamente sin tener que pasar propiedades por 10 niveles (evitando el llamado *Prop Drilling*).

### 2. Migración Segura en Sequelize (`alter: true` vs `force: true`)
* `force: true` borra todas las tablas de MySQL en cada inicio del servidor.
* `alter: true` compara los modelos de JavaScript contra la base de datos y solo ejecuta sentencias `ALTER TABLE` para agregar columnas nuevas, preservando todos los clientes guardados.

### 3. Inmutabilidad y Spread Operator (`...state`)
* React detecta cambios comparando referencias de memoria.
* Si hacemos `state.clientes.push(nuevo)`, React no nota el cambio y la pantalla no se actualiza.
* Con `[...state.clientes, action.payload]`, creamos una copia nueva con distinta dirección de memoria, forzando a React a redibujar la pantalla al instante.

### 4. Guardián de Rutas `ProtectedRoute`
* Encapsula la lógica de verificación de sesión (`localStorage`) y permisos zonales antes de renderizar un componente de React Router, garantizando que un vendedor no acceda a información confidencial de otra provincia.

### 5. Tipado `DECIMAL(12, 2)` para Alta Inflación Mayorista
* En commodities (harina y azúcar), una sola venta por toneladas supera el millón de pesos. `DECIMAL(8, 2)` provocaba desbordamiento de memoria (`Out of range value`). `DECIMAL(12, 2)` soporta hasta $9.999.999.999,99.

---

## 7. Banco de Preguntas de Examen y Respuestas Modelo

### P1: "¿Por qué utilizaste Redux si React ya cuenta con Context API?"
> **Respuesta:** *"Utilicé Redux para el estado comercial porque necesitábamos un flujo predecible con acciones asíncronas bien estructuradas a través de Redux Thunk. Para componentes visuales ligeros como las alertas Toast sí utilizamos Context API, demostrando que sabemos combinar ambas herramientas según la complejidad del estado."*

### P2: "¿Cómo protegiste las contraseñas de la base de datos?"
> **Respuesta:** *"Implementamos la librería `dotenv` para cargar credenciales desde un archivo `.env` privado fuera del código fuente. Además, configuramos el archivo `.gitignore` para asegurar que las claves nunca se suban a GitHub, y dejamos plantillas `.env.example` para que otros desarrolladores puedan configurar su entorno de trabajo de manera segura."*

### P3: "¿Por qué aclararon 'Interior de Chaco' en lugar de dejar solo 'Interior'?"
> **Respuesta:** *"El término 'Interior' era genérico y ambiguo para la logística de la distribuidora, ya que podía confundirse con el interior de Corrientes o de otra provincia. Lo estandarizamos como 'Interior de Chaco' en la portada, encabezados, roles y navegación para dar claridad comercial absoluta entre Resistencia Capital, Corrientes e Interior chaqueño."*

### P4: "¿Cómo funciona el semáforo comercial de reposición?"
> **Respuesta:** *"Es una función matemática que suma la fecha de última compra más la frecuencia habitual del cliente en días. Luego resta la fecha actual para obtener los días restantes: si faltan más de 2 días se muestra verde (con stock); entre 0 y 2 días se muestra amarillo ('¡Toca comprar hoy!'); y con valores negativos se muestra rojo ('Vencido'). Esto permite al vendedor priorizar llamados por WhatsApp de manera proactiva."*

### P5: "¿Qué pasaría si la base de datos MySQL se cae mientras el vendedor usa el sistema?"
> **Respuesta:** *"El sistema cuenta con manejo de errores mediante bloques `try/catch` tanto en Axios como en el formulario. Si el backend no responde, el sistema no se rompe: notifica al usuario con un Toast informativo en modo de contingencia y registra el error en consola sin congelar la interfaz."*

---

## 8. Guion Oral para la Presentación Frente al Profesor

* **1. Saludo e Introducción (0:00 - 0:45):**  
  *"Buenos días, profesor. Hoy presento SUZ, un CRM comercial y de reposición predictiva full-stack para distribución mayorista de materias primas. El objetivo del proyecto fue resolver un problema real: predecir cuándo cada cliente se queda sin harina o azúcar y controlar cuentas corrientes en vivo."*
* **2. Tecnologías y Arquitectura (0:45 - 1:30):**  
  *"Utilicé una arquitectura desacoplada: React 18, Redux con Thunk y React Router v5 en el frontend; y Node.js, Express, Sequelize y MySQL en el backend. Todas las credenciales están protegidas bajo variables de entorno con `dotenv`."*
* **3. Demostración en Vivo (1:30 - 3:00):**  
  *"Ingresamos al Login. Muestro los 4 roles disponibles. Si entro como vendedor de Chaco, el guardián de rutas me lleva directo a mi zona y me bloquea el acceso a otras provincias. En la pantalla vemos los clientes divididos entre quienes tienen deuda y quienes están al día. El semáforo nos indica a quién contactar hoy por WhatsApp, y el botón 'Saldar' pone la deuda en $0 en tiempo real disparando una alerta Toast Dark Mode."*
* **4. Desafíos Técnicos (3:00 - 4:00):**  
  *"Los mayores retos fueron migrar MySQL de forma segura con `alter: true`, ampliar los tipos numéricos a `DECIMAL(12, 2)` para ventas millonarias, y sincronizar los nombres de los atributos en las 3 capas para no perder datos."*
* **5. Cierre (4:00 - 4:30):**  
  *"El resultado es un sistema fluido, probado con datos reales y listo para producción. Quedo a disposición para profundizar en cualquier parte del código."*

---

## 9. Glosario Técnico de Programación

* **API REST:** Interfaz de comunicación entre frontend y backend basada en verbos HTTP (GET, POST, PUT, DELETE).
* **ORM (Sequelize):** Herramienta que traduce tablas y consultas de bases de datos a objetos y métodos de JavaScript.
* **Redux Thunk:** Middleware que permite que las acciones de Redux ejecuten funciones asíncronas con promesas.
* **Prop Drilling:** Mala práctica de pasar datos a través de muchos componentes intermediarios que no los necesitan. Redux lo soluciona centralizando el estado.
* **Glassmorphism:** Estilo visual moderno que utiliza desenfoques de fondo (`backdrop-filter: blur`) imitando un cristal translúcido.
* **Single Source of Truth:** Principio de diseño donde el estado de la aplicación reside en un único lugar centralizado (el Store).

---

## 10. Plan de Estudio y Checklist de Autoevaluación

### Cronograma de Estudio:
* **Día 1:** Navegación en el sistema y entendimiento del semáforo comercial y cuentas corrientes.
* **Día 2:** Estudio del flujo del dato (Capítulo 5) y del backend (Sequelize y controladores).
* **Día 3:** Práctica del guion oral y del banco de 5 preguntas de examen.

### Checklist de Control:
- [ ] Puedo explicar la fórmula del semáforo comercial de memoria.
- [ ] Sé qué diferencia hay entre `alter: true` y `force: true`.
- [ ] Entiendo por qué `DECIMAL(12, 2)` resolvió el error de desbordamiento numérico.
- [ ] Conozco las credenciales de demo (`admin`, `chaco`, `corrientes`, `interior` con clave `123`).
- [ ] Puedo explicar qué hace `ProtectedRoute.jsx` y cómo lee `localStorage`.
- [ ] Sé justificar por qué se aclaró "Interior de Chaco".
