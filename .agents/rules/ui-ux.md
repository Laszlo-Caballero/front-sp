---
trigger: always_on
---

# Reglas de Interfaz de Usuario y Experiencia (UI / UX)

## 1. Prohibición de Alerts Nativos y Uso Obligatorio de Toasts

### Regla Obligatoria

Está estrictamente prohibido utilizar funciones nativas del navegador para interactuar o mostrar mensajes al usuario:

- `alert()`
- `confirm()`
- `prompt()`

Bajo ninguna circunstancia.

---

### Notificaciones con Toast

Para mostrar notificaciones, advertencias, errores o mensajes de éxito, se debe utilizar el hook global de toasts de la aplicación (`useToast` de `@/modules/common/hooks/use-toast`).

Ejemplo:

❌ **Incorrecto**

```ts
alert("Ocurrió un error al guardar los datos");
if (confirm("¿Desea anular el registro?")) { ... }
```

✅ **Correcto**

```ts
const { toast } = useToast();

toast({
  title: "Éxito",
  description: "Se guardaron los datos correctamente.",
});

toast({
  title: "Error",
  description: "Ocurrió un error al procesar la solicitud.",
  variant: "destructive",
});
```

---

## 2. Uso Obligatorio de Skeletons (No Loaders / Spinners)

### Regla Obligatoria

Está strictly prohibido utilizar overlays con texto "Cargando...", loaders o spinners genéricos para la carga de datos en tablas o vistas completas.

Para brindar una mejor experiencia de usuario (UX/UI) y evitar colapsos visuales o layout shifts, **siempre se deben usar Skeletons** que simulen y adapten la forma del contenido visual mientras se obtienen los datos.

### Abstracción Obligatoria en Componente Independiente

Está prohibido escribir Skeletons in-line mezclados directamente en el cuerpo del componente principal. **Cada Skeleton debe crearse en su propio componente dedicado independiente** (ejemplo: `CajaSkeletonTable`, `CounterSkeletonTable`, `ClienteSkeletonTabla`), cumpliendo con la estructura modular del proyecto (Carpeta propia con `NombreComponente.tsx` y `index.ts`).

### Fidelidad Visual del 100% (Respetar el Diseño Real)

Los Skeletons **DEBEN imitar con un 100% de precisión la estructura visual del contenido final real** (mismas tarjetas, misma distribución grid, mismos encabezados de tabla, mismas columnas y pies de página). Está estrictamente prohibido usar Skeletons genéricos, simplificados o con layouts aproximados que provoquen desalineaciones o colapsos visuales.

---

### Ejemplo de Migración

❌ **Incorrecto (Inline Skeleton o Loader)**

```tsx
// ❌ Inline Skeleton mezclado en la tabla principal
{isLoading ? (
  Array.from({ length: 5 }).map((_, index) => (
    <tr key={index}>
      <td><Skeleton className="h-4 w-20" /></td>
    </tr>
  ))
) : (
  <CajaTable data={data} />
)}
```

✅ **Correcto (Extraído a Componente Independiente)**

```tsx
// ✅ Componente Skeleton independiente
{isLoading ? (
  <CajaSkeletonTable />
) : (
  <CajaTable data={data} />
)}
```
