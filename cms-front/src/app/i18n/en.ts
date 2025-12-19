export const en = {
  common: {
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    search: "Search",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Info",
  },
  auth: {
    login: "Login",
    logout: "Logout",
    username: "Username",
    password: "Password",
    email: "Email",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    loginSuccess: "Login successful",
    loginError: "Invalid credentials",
    sessionExpired: "Session expired, please login again",
  },
  validation: {
    required: "This field is required",
    email: "Please enter a valid email",
    minLength: "Minimum {0} characters required",
    maxLength: "Maximum {0} characters allowed",
  },
  errors: {
    generic: "An error occurred",
    network: "Network error",
    unauthorized: "Unauthorized access",
    notFound: "Resource not found",
  },
};

export type Translations = typeof en;
