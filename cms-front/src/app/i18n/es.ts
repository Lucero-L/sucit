import type { Translations } from "./en";

export const es: Translations = {
  common: {
    loading: "Cargando...",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    create: "Crear",
    search: "Buscar",
    confirm: "Confirmar",
    yes: "Sí",
    no: "No",
    error: "Error",
    success: "Éxito",
    warning: "Advertencia",
    info: "Información",
  },
  auth: {
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    username: "Usuario",
    password: "Contraseña",
    email: "Correo electrónico",
    rememberMe: "Recordarme",
    forgotPassword: "¿Olvidaste tu contraseña?",
    loginSuccess: "Inicio de sesión exitoso",
    loginError: "Credenciales inválidas",
    sessionExpired: "Sesión expirada, por favor inicia sesión nuevamente",
  },
  validation: {
    required: "Este campo es requerido",
    email: "Por favor ingresa un correo válido",
    minLength: "Mínimo {0} caracteres requeridos",
    maxLength: "Máximo {0} caracteres permitidos",
  },
  errors: {
    generic: "Ocurrió un error",
    network: "Error de red",
    unauthorized: "Acceso no autorizado",
    notFound: "Recurso no encontrado",
  },
};
