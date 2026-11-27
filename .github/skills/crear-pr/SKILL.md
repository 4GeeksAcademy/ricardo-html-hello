---
name: crear-pr
description: Analiza los cambios de la rama y prepara o crea una pull request con destino, título, clasificación PATCH/MINOR/MAJOR, resumen y pasos manuales de prueba. Úsala cuando se solicite crear, redactar o preparar una PR.
---

# Crear una Pull Request

Prepara una PR basándote en el código realmente cambiado y en los planes relevantes existentes en el repositorio. No inventes alcance, motivaciones, resultados de pruebas ni requisitos previos.

## Procedimiento

1. Comprueba la rama actual y el estado del repositorio (`git status --short --branch`). No crees una PR desde la rama base ni asumas el destino.
2. Identifica la rama de destino:
   - Si el usuario indicó explícitamente una rama destino, úsala.
   - Si no la indicó, **pregunta cuál es la rama destino y espera la respuesta antes de crear la PR**. No adivines ni uses automáticamente la rama por defecto.
3. Revisa el contenido que formará parte de la PR comparando la rama actual con la destino, incluyendo commits y diff (`git log <destino>..HEAD` y `git diff <destino>...HEAD`). Comprueba el estado de trabajo para no atribuir cambios sin commit a la PR sin advertirlo.
4. Busca planes o especificaciones directamente relevantes que existan en el repositorio (por ejemplo, documentos de planificación enlazados o citados por los cambios). Basa el “por qué” en esos planes si los hay; si no hay evidencia, explica el propósito observable sin especular. No hagas búsquedas masivas sin relación con el cambio.
5. Decide el nivel de cambio y redacta la propuesta de PR. Si la herramienta de creación pide título y descripción pero no permite un campo de tipo, incluye el tipo claramente en la descripción.
6. Presenta el título y descripción para revisión, salvo que el usuario haya pedido inequívocamente crearla de inmediato. No publiques ni crees la PR hasta tener destino confirmado y autorización clara para crearla.
7. Al crearla, usa la rama actual como origen y la rama confirmada como destino. Comunica el enlace y el resultado. Si no se dispone de una herramienta de PR, entrega el título y cuerpo listos para copiar; no afirmes que la PR fue creada.

## Tipo de cambio: PATCH / MINOR / MAJOR

Clasifica según el impacto del cambio entregado:

- **PATCH**: corrección compatible, ajuste menor o documentación/mantenimiento sin añadir una capacidad de usuario relevante.
- **MINOR**: nueva funcionalidad o mejora visible compatible con el uso existente.
- **MAJOR**: cambio incompatible que requiere adaptación de usuarios, consumidores, configuración o datos existentes.

Es una clasificación de release/impacto, no reemplaza el tipo de Conventional Commit. Explica brevemente la razón. No llames MAJOR a un cambio solo porque sea grande; debe existir incompatibilidad real. Si la información no alcanza para saber si rompe compatibilidad, dilo y pregunta cuando sea necesario.

## Título y cuerpo

Título conciso y específico, en el idioma de la solicitud, con una forma como:

```text
[MINOR] Añade el menú de productos con precios
```

El cuerpo debe incluir estas secciones:

```markdown
## Tipo de cambio
MINOR — motivo breve basado en el impacto.

## Resumen
- Qué cambió, según el diff.
- Por qué se hizo, según el objetivo explícito o los planes existentes; si no hay evidencia del motivo, indicarlo sin inventar.

## How to test
1. Pasos manuales concretos y reproducibles para comprobar el cambio.
2. Resultado esperado de cada comprobación.

### Requisitos previos
- Configuración, servicios, datos, credenciales no sensibles o comandos necesarios para probar.
- Si no se necesita nada especial, escribir: “No se requiere configuración previa.”
```

Adapta las secciones a la naturaleza del cambio: pasos de prueba solo verificables y pertinentes; no inventes funcionalidades ni afirmes que se ejecutaron pruebas que no se realizaron. Indica los comandos o el servidor local apropiado solo después de comprobar el proyecto. Si algún paso no puede validarse por falta de entorno, señálalo claramente.

## Límites

- No cambies archivos, commits, ramas ni el stage como parte del proceso de PR.
- No incluyas secretos, credenciales ni datos sensibles en el cuerpo.
- No marques checks como exitosos salvo que se hayan ejecutado y observado.
- Si el diff está vacío, hay conflictos o la rama destino no existe/no es accesible, informa del problema y no crees una PR.
