type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginFormDataType = {
  email: string;
  password: string;
};

class Authentication {
  private authenticated: boolean;
  private registered: boolean;

  constructor() {
    this.authenticated = false;
    this.registered = false;
  }

  async register(
    registerFormData: RegisterFormData,
    formDataHandler: React.Dispatch<React.SetStateAction<RegisterFormData>>,
    formErrorHandler: React.Dispatch<React.SetStateAction<undefined>>
  ) {
    try {
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(registerFormData),
      });
      const result = await resp.json();

      if (result) {
        const { error, registered } = result;
        if (error) return formErrorHandler(result.error);
        this.registered = registered;
      }

      formDataHandler({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  async logIn(
    loginFormData: LoginFormDataType,
    formErrorHandler: React.Dispatch<React.SetStateAction<undefined>>
  ) {
    try {
      const resp = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(loginFormData),
      });
      const result = await resp.json();

      if (result) {
        const { error, loggedIn } = result;

        if (error) return formErrorHandler(error);
        this.authenticated = loggedIn;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async logOut() {
    try {
      const resp = await fetch("/api/logout");
      const result = await resp.json();

      if (result) {
        this.authenticated = !result.loggedOut;
      }
    } catch (err) {
      console.error(err);
    }
  }

  isAuthenticated() {
    return this.authenticated;
  }

  isRegistered() {
    return this.registered;
  }
}

export default new Authentication();
