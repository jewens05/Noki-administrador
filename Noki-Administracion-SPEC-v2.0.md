# Noki Administración — SPEC (v2.0 / v2.5)

**Metodología:** Spec-Driven Development (SDD) & Enterprise UI/UX Engineering  
**Tipo de documento:** Especificación del producto objetivo.  
**Versión del documento:** 2.0 (Actualizada a versión operativa 2.5).  
**Fecha:** 28 de septiembre de 2026.  
**Equipo:** Luis Miguel Castañeda y Jeffry Giovanny Caro Arango.  
**Producto:** Sitio web administrativo de Noki.  
**Producto relacionado:** Noki App — SPEC profesional v3.0.  
**Estado:** Especificación obligatoria para construir la versión profesional del sitio administrativo.  
**Seguridad y Restricción de Uso:**  
> [!WARNING]  
> *(Este panel es para uso netamente administrativo. Cualquier persona que entre sin autorización o haga un mal manejo del programa será sancionada.)*

---

## 1. Problema y necesidades administrativas

### 1.1 Situación que atiende el sitio
El sitio web administrativo de Noki es la consola centralizada de gestión operativa y analítica para supervisar la recolección de residuos electrónicos (e-waste). Proporciona herramientas para coordinar centros de acopio, gestionar al personal receptor en campo, fiscalizar entregas y generar informes estructurados para auditorías externas.

### 1.2 Necesidades administrativas

| ID | Necesidad | Solución y Respuesta del Panel Web |
| --- | --- | --- |
| **NA-01** | **Falta de reportes para una auditoría.** | Módulo de **Reportes** con desgloses operativos diarios, semanales y mensuales, incluyendo métricas consolidadas de e-waste, volumen de entregas y desglose por categorías. |
| **NA-02** | **Falta de un mecanismo para agregar o eliminar puntos de recolección.** | Módulo de **Directorio** con creación de fichas de centros de acopio, asignación de horarios, estados de operatividad y baja/eliminación de puntos inactivos. |
| **NA-03** | **Falta de visibilidad sobre el volumen y rendimiento de reciclaje.** | Módulo de **Resumen** con 4 KPIs estratégicos: toneladas mensuales, total de usuarios, 9.852 dispositivos acumulados y dispositivos reciclados hoy. |
| **NA-04** | **Carencia de supervisión sobre las entregas en tiempo real.** | Módulo de **Supervisión de Entrega** con trazabilidad de códigos de entrega, estado de recepción (`Recibido` / `No recibido`) y desglose de unidades declaradas. |
| **NA-05** | **Falta de control sobre el personal de atención y sus jornadas.** | Módulo de **Receptores y Horarios** para administrar turnos de atención y dar de alta/baja cuentas de encargados receptores. |
| **NA-06** | **Falta de un sistema de notificaciones de auditoría interna.** | Drawer interactivo de notificaciones en Header para registrar cambios de horarios, altas de directorios y recepciones confirmadas. |

---

## 2. Objetivo, alcance y producto final

### 2.1 Objetivo general
Construir una plataforma web privada y profesional para que el equipo autorizado de Noki pueda coordinar la red de centros de acopio, administrar el personal receptor, supervisar entregas de la comunidad y auditar la operación mediante reportes estructurados.

### 2.2 Áreas principales
El menú principal contiene 5 secciones exclusivas:
1. **Resumen**
2. **Directorio**
3. **Receptores y Horarios**
4. **Supervisión de Entrega**
5. **Reportes**

---

## 3. Usuarios, actores y permisos

### 3.1 Actores y Jerarquía
* **Administrador (Único actor con acceso al panel web):**
  * Tiene acceso irrestricto a la consola web.
  * Gestiona centros de acopio, modifica horarios, da de alta/baja a receptores, supervisa entregas y descarga reportes.
* **Receptor / Encargado de Centro de Acopio (Exclusivo Noki App móvil):**
  * Es el personal asignado a los puntos físicos/académicos para recibir los dispositivos.
  * **Regla estricta:** Su cuenta es creada por el administrador desde el panel web (con correo y contraseña), pero **SOLO puede iniciar sesión y operar desde Noki App móvil**.
  * Si un receptor intenta ingresar al sitio web administrativo, el sistema deniega el acceso con el mensaje:  
    > *"Esta pagina solo es para administradores"*
* **Usuario Ciudadano:**
  * Interactúa exclusivamente con Noki App móvil para registrar sus dispositivos y generar códigos de entrega.

### 3.2 Matriz de Autorización
| Acción | Sin sesión | Usuario de App | Receptor (Móvil) | Administrador (Web) |
| --- | :---: | :---: | :---: | :---: |
| Abrir panel web administrativo | No | No | **No (Denegado)** | **Sí** |
| Ver Dashboard y KPIs | No | No | No | **Sí** |
| Crear / Modificar / Eliminar Centros de Acopio | No | No | No | **Sí** |
| Crear / Eliminar Cuentas de Receptores | No | No | No | **Sí** |
| Modificar Horarios de Atención | No | No | No | **Sí** |
| Supervisar Entregas y Detalles | No | No | No | **Sí** |
| Descargar Reportes de Auditoría | No | No | No | **Sí** |
| Confirmar Recepción de Dispositivos en Campo | No | No | **Sí (En App Móvil)** | No (Supervisa) |

---

## 4. Glosario técnico y operativo

* **Centro de Acopio / Punto de Operación:** Espacio físico o punto académico autorizado por Noki para la recolección clasificada de e-waste.
* **Receptor / Encargado:** Persona autorizada para operar el punto físico y registrar la recepción de dispositivos mediante Noki App móvil.
* **Código de Entrega:** Identificador alfanumérico único generado por Noki App para asociar los dispositivos de un usuario a un centro de acopio.
* **Estado de Recepción:** Condición de una entrega: `Recibido` (validado por el receptor en campo) o `No recibido` (declarado por el usuario pero pendiente de recepción física).
* **Estado de Ficha / Centro:** Indicador de operatividad: `Funcional` (verde), `Remodelación` (naranja) o `Inoperativo` (rojo).
* **Reporte Operativo:** Documento de balance periódico (diario, semanal, mensual) que consolida entregas, peso estimado y desglose por categorías para auditorías.
* **Unidad E-Waste:** Equipo o residuo electrónico registrado dentro del flujo de recolección.
* **Punto Académico:** Centro de acopio situado en instituciones universitarias o colegios vinculados a la red de Noki.
* **Idempotencia:** Propiedad de las transacciones web para evitar duplicidad de registros ante reintentos de red.

---

## 5. Requisitos funcionales

### 5.1 Acceso, Seguridad y Sesión
* **AF-01 (Pantalla de Acceso):** Formulario con Logo, Correo electrónico, Contraseña, botón Mostrar/Ocultar, botón primario Ingresar y aviso permanente:  
  > *(Este panel es para uso netamente administrativo. Cualquier persona que entre sin autorización o haga un mal manejo del programa será sancionada.)*
* **AF-02 (Validaciones y Errores en Rojo):**
  * Formato de correo inválido: texto en color rojo: `"El formato del correo electrónico no es válido."`.
  * Cuenta no encontrada o contraseña errónea: texto en color rojo: `"cuenta no encontrada o contraseña incorrecta"`.
* **AF-03 (Exclusividad Web del Admin):** Si un receptor intenta autenticarse en web, se bloquea con el mensaje: `"Esta pagina solo es para administradores"`.
* **AF-04 (Prevención Doble Envío):** Botón deshabilitado durante validación con estado *"Verificando acceso…"*.

### 5.2 Resumen y Analítica
* **AF-09 (Accesos Rápidos):** 4 botones superiores que enlazan a:
  1. `Gestión de directorio`
  2. `Receptores y horarios`
  3. `Supervisión de entrega`
  4. `Reportes operativos`
* **AF-11 (Indicadores Principales):** 4 tarjetas destacadas:
  1. **Toneladas recicladas este mes**
  2. **Usuarios registrados (en total)**
  3. **9852 dispositivos reciclados (en total)**
  4. **Dispositivos reciclados hoy**

### 5.3 Gestión de Directorio (Centros de Acopio)
* **AF-18 (Tabla Principal):** Columnas: `Lugar`, `Categoría`, `Estado`, `Acciones`.
* **AF-18.1 (Badges de Estado):**
  * **Funcional:** Botón/Badge verde (`#146C43`).
  * **Remodelación:** Botón/Badge naranja (`#B54708`).
  * **Inoperativo:** Botón/Badge rojo (`#B42318`).
* **AF-19 (Búsqueda Omnicanal):** Búsqueda en tiempo real por: **Nombre**, **Lugar**, **Barrio** o **Dirección**.
* **AF-20 (Botón Principal):** Botón superior **`Crear nuevo directorio`**.
* **AF-21 / AF-22 (Formulario de Nuevo Directorio):** Modal con 9 campos obligatorios:
  1. Nombre de lugar
  2. Dirección física
  3. Barrio / comuna
  4. Horario de atención
  5. Teléfono de contacto
  6. Tipos de residuos aceptados (e-waste)
  7. Fuente oficial (HTTPS)
  8. Fecha de revisión editorial
  9. Estado de la ficha (`Funcional`, `Remodelación`, `Inoperativo`)

### 5.4 Receptores y Horarios
* **Objetivo:** Administrar y modificar los horarios de atención en los centros de acopio de Noki, así como dar de alta o baja al personal encargado de la recepción.
* **AF-34 (Tabla):** Sin filtros superiores y sin botón principal general. Columnas: `Lugar`, `Encargados`, `Horario`, `Estado`, `Acciones`.
* **AF-35 (Gestión de Horarios):** Permite editar la franja horaria de atención del punto directamente.
* **AF-36 (Gestión de Encargados):**
  * Muestra el correo administrativo de cada encargado asignado.
  * **Crear nuevo encargado:** Solicita correo y contraseña, aprovisionando una cuenta que **solo podrá operar desde Noki App móvil**.
  * **Eliminar encargado:** Permite desvincular al encargado seleccionado.

### 5.5 Supervisión de Entrega
* **Acceso:** Si un receptor ingresa por URL: `"Esta pagina solo es para administradores"`.
* **AF-44 (Tabla Principal):** Columnas: `Código`, `Propietario`, `Punto`, `Estado` (`Recibido` / `No recibido`), `Acción` (*Ver más*).
* **AF-45 (Modal de Detalle):** Muestra: *Código de entrega, Estado de recepción, Propietario/usuario, Punto académico, Fecha y hora de creación*.
* **AF-46 (Tabla Secundaria — Líneas Declaradas):**
  * Título: **`Líneas de dispositivos declarados (AF-13)`**.
  * Columnas: `Categoría`, `Descripción`, `Cantidad`, `Condición`.
  * Leyenda inferior: *“Todas las unidades declaradas”*.

### 5.6 Reportes
* **AF-52 (Tabla de Reportes):** Columnas: `Reporte`, `Tipo`, `Fecha`, `Resumen operativo`, `Acción`.
* **AF-53 (Filtros de Periodicidad):** Segmentación por `Reportes diarios`, `Reportes semanales` y `Reportes mensuales`.
* **AF-54 (Resumen Operativo y Desglose):** Despliega panel con:
  * Código de reporte, Tipo y período, Total entregas, Unidad e-waste, Puntos activos.
  * **Desglose por categoría de residuos recolectados (Tabla):** `Categoría`, `Unidades`, `Peso estimado`, `Estado de recepción`.

---

## 10. Navegación, Usabilidad, Accesibilidad y Header Avanzado

### 10.1 Navegación General
* **Sidebar Izquierda:** Acceso permanente a Resumen, Directorio, Receptores y Horarios, Supervisión de Entrega y Reportes.

### 10.2 Header Superior
* **Botón `A+`:** Escala tipográfica fluida de la interfaz hasta un **`125%`** (16px a 20px).
* **Selector de Alto Contraste / Modo Oscuro:** Alterna entre fondo blanco por defecto y fondo oscuro con texto reforzado (no disponible en la vista de Login).
* **Campana de Notificaciones (Drawer):** Registro de cambios de horarios, directorios y entregas recibidas en tiempo real + botón **`Marcar todas las entregas como leídas`**.
* **Módulo de Perfil y Sesión:** Despliega Nombre, Correo, Rol (*Administrador*) y flecha (`⌄`) con acción para **`Cerrar sesión`**.

---

## 15. Historias de Usuario y Criterios de Aceptación

* **HU-ADM-01:** Como administrador autorizado, quiero ingresar mis credenciales válidas en la pantalla de acceso **para poder** gestionar la consola administrativa de Noki de forma segura.
* **HU-ADM-02:** Como administrador del sistema, quiero que las cuentas de receptores no puedan entrar al panel web **para que** solo operen desde la aplicación móvil Noki App.
* **HU-ADM-03:** Como administrador autorizado, quiero consultar el panel de Resumen **para poder** visualizar los 4 indicadores principales de impacto: toneladas recicladas este mes, usuarios registrados, 9852 dispositivos reciclados en total y dispositivos reciclados hoy.
* **HU-ADM-04:** Como administrador autorizado, quiero entrar a directorio **para poder** crear, modificar o eliminar los puntos de centro de acopio.
* **HU-ADM-05:** Como administrador, quiero buscar centros de acopio por nombre, lugar, barrio o dirección **para poder** ubicar rápidamente un punto sin recorrer toda la lista.
* **HU-ADM-06:** Como administrador, quiero entrar a receptores y horarios **para poder** modificar los horarios de atención en los centros de acopio.
* **HU-ADM-07:** Como administrador, quiero entrar a receptores y horarios **para poder** añadir o eliminar a los encargados de la recepción de los dispositivos.
* **HU-ADM-08:** Como administrador, quiero entrar a supervisión de entrega **para poder** mirar el registro de todas las entregas que se han realizado en Noki app.
* **HU-ADM-09:** Como administrador, quiero consultar la gráfica inferior de líneas de dispositivos declarados **para poder** conocer el desglose de categorías, descripción, cantidad y condición de todos los equipos.
* **HU-ADM-10:** Como administrador autorizado, quiero entrar a reportes **para poder** descargar los reportes semanales de Noki.
* **HU-ADM-11:** Como administrador, quiero filtrar reportes por periodicidad diaria, semanal y mensual **para poder** realizar auditorías operativas con métricas consolidadas de e-waste, total de entregas y puntos activos.
* **HU-ADM-12:** Como administrador con necesidades visuales, quiero pulsar el botón `A+` en la barra superior **para poder** aumentar el tamaño del texto hasta un 125% sin desconfigurar la pantalla.
* **HU-ADM-13:** Como administrador, quiero activar el botón de alto contraste **para poder** alternar entre el fondo blanco por defecto y una interfaz en modo oscuro de alto contraste.
* **HU-ADM-14:** Como administrador, quiero abrir la campana de notificaciones **para poder** auditar los cambios recientes de horarios, directorios y entregas recibidas, y marcar todas las entregas como leídas.
* **HU-ADM-15:** Como administrador, quiero hacer clic en el menú desplegable de mi perfil **para poder** verificar mis datos (nombre, correo, rol) y cerrar sesión de manera segura.

---

## 16. Estrategia de Pruebas

### 16.1 Pruebas Unitarias
* Validación de formato de correo electrónico y despliegue del mensaje en rojo.
* Normalización de cadenas en motor de búsqueda omnicanal (Nombre, Lugar, Barrio, Dirección).
* Mapeo de estados de centros de acopio (`Funcional`, `Remodelación`, `Inoperativo`) y estados de entrega (`Recibido`, `No recibido`).
* Algoritmo de escala tipográfica relativa para el control `A+` (100% a 125%).
* Conmutador de clases CSS para el modo Alto Contraste / Modo Oscuro.
* Generador de datos consolidados para reportes diarios, semanales y mensuales.

---

## 22. Definición de Terminado (DoD)

- [ ] Formulario de acceso con aviso de uso administrativo permanente y mensajes de error en rojo.
- [ ] Bloqueo de receptores en web con mensaje *"Esta pagina solo es para administradores"*.
- [ ] Header con `A+` (125%), Modo Oscuro/Contraste, Drawer de Notificaciones con *"Marcar todas las entregas como leídas"* y Dropdown de Perfil con *"Cerrar sesión"*.
- [ ] Resumen con 4 accesos rápidos y 4 KPIs de impacto.
- [ ] Directorio con botón *"Crear nuevo directorio"*, búsqueda omnicanal, badges tricolores y modal con 9 campos.
- [ ] Receptores y Horarios para edición de turnos y aprovisionamiento de cuentas exclusivas para la app móvil.
- [ ] Supervisión de Entrega con tabla principal, modal de detalle y tabla de líneas de dispositivos declarados.
- [ ] Módulo de Reportes con filtros diario/semanal/mensual y desglose de residuos por categoría.
