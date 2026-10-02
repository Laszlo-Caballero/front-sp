---
trigger: always_on
---

# Regla de Comentarios en el Código

## Regla Obligatoria

Está estrictamente prohibido incluir comentarios en el código generado o modificado.

Esta regla aplica a:
- Comentarios de una sola línea (`// ...`)
- Comentarios multilínea (`/* ... */`)
- Comentarios JSX (`{/* ... */}`)
- Docstrings / JSDoc (`/** ... */`)

---

## Directrices

1. **Código Autodocumentado**: El código debe ser lo suficientemente claro, declarativo y bien estructurado por sí mismo sin necesidad de comentarios explicativos.
2. **Sin código comentado**: No dejar bloques de código comentados en ningún archivo.
3. **Limpieza al editar**: Al modificar o refactorizar archivos existentes, eliminar cualquier comentario innecesario o remanente en el área de trabajo.
