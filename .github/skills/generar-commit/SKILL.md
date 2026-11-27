---
name: generar-commit
description: Analiza los cambios preparados en Git (stage), redacta un mensaje siguiendo Conventional Commits y crea el commit. Úsala cuando se solicite generar, redactar o realizar un commit.
---

# Generar un commit convencional

Crea un commit cuyo mensaje describa fielmente **los cambios que ya están en el stage**. No deduzcas el mensaje solo a partir de la conversación o de cambios sin preparar.

## Procedimiento

1. Comprueba la rama y el estado con `git status --short --branch`.
2. Inspecciona exclusivamente los cambios preparados:
   - `git diff --cached --stat`
   - `git diff --cached`
   - Si hay archivos nuevos preparados, comprueba también sus nombres y contenido en el diff.
3. Si el stage está vacío, no crees ningún commit. Indica que no hay cambios preparados y pide al usuario que prepare los cambios que quiera incluir. **No ejecutes `git add` por iniciativa propia.**
4. Si hay cambios, identifica su propósito principal y redacta un mensaje breve y específico en el formato:

   ```text
   tipo(ámbito opcional): resumen imperativo
   ```

   Usa minúsculas para el tipo y, preferiblemente, para el resumen. No termines el resumen con punto. El ámbito es opcional; inclúyelo solo cuando aporte claridad.
5. Cuando el usuario haya pedido crear/generar el commit, ejecuta `git commit -m "..."` con el mensaje decidido. No incluyas cambios que no estén en el stage ni alteres el stage.
6. Verifica el resultado con `git status --short --branch` y comunica el mensaje del commit y cualquier incidencia.

## Tipos permitidos

Elige el tipo que mejor represente el cambio principal:

- `feat`: añade una capacidad o funcionalidad.
- `fix`: corrige un error.
- `docs`: modifica documentación.
- `style`: cambios de formato o estilo sin alterar el comportamiento (por ejemplo, espacios o formato visual del código).
- `refactor`: reorganiza o mejora código sin cambiar su comportamiento observable.
- `perf`: mejora el rendimiento.
- `test`: añade, actualiza o corrige pruebas.
- `build`: cambios en el sistema de build o dependencias que afectan a la compilación.
- `ci`: cambios en configuración o automatización de integración continua.
- `chore`: mantenimiento general que no encaja mejor en otro tipo.
- `revert`: revierte un commit anterior; identifica el commit revertido cuando sea posible.

No uses `style` para cambios de estilos de interfaz que sí alteren el aspecto del producto; en ese caso, elige `feat` o `fix` según corresponda.

## Reglas para el mensaje

- Resume el propósito, no enumeres archivos ni describas mecánicamente cada línea.
- Basa el tipo, ámbito y resumen en el diff preparado completo. Para cambios mixtos, prioriza el objetivo dominante; si son cambios independientes y el stage no está vacío, describe el conjunto con precisión sin inventar una intención.
- Usa un ámbito corto solo si resulta evidente, por ejemplo `feat(contacto): valida el formulario`.
- Añade cuerpo únicamente si el cambio necesita contexto que el título no puede expresar. Separa el cuerpo del título con una línea en blanco.
- No añadas un pie de breaking change salvo que el diff muestre una incompatibilidad real; en ese caso, usa `!` (por ejemplo, `feat(api)!: elimina el endpoint antiguo`) y explica `BREAKING CHANGE:` en el cuerpo.
- Si el objetivo no puede determinarse con seguridad a partir del diff, pregunta antes de crear el commit.

## Seguridad y límites

- Nunca ejecutes `git add`, `git reset`, `git checkout`, `git clean` ni otros comandos para modificar archivos o el stage.
- No hagas `commit --amend`, no reescribas historia y no omitas hooks (`--no-verify`) salvo petición explícita del usuario.
- No incluyas secretos en el mensaje. Si el diff preparado parece contener credenciales o datos sensibles, detente y advierte al usuario antes de confirmar.
- Si el comando de commit falla, informa del error; no intentes cambiar el stage ni eludir validaciones automáticamente.
