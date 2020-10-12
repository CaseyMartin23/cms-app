type LoginFormDataType = {
  email: string;
  password: string;
};

class Authentication {
  private authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  async register() {}

  async logIn(
    loginFormData: LoginFormDataType,
    handleError: React.Dispatch<React.SetStateAction<undefined>>
  ) {
    try {
      const resp = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(loginFormData),
      });
      const result = await resp.json();
      console.log("result->", result);

      if (result) {
        const { error, loggedIn } = result;
        console.log("error->", error);
        console.log("loggedIn->", loggedIn);

        if (error) return handleError(error);
        this.authenticated = loggedIn;
        console.log("authenticated->", this.authenticated);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async logOut(props: any) {
    try {
      const resp = await fetch("/api/logout");
      const result = await resp.json();

      //   if (result && !result.loggedOut) {
      //     this.authenticated = result.loggedOut;
      //     return props.history.push("/");
      //   }
    } catch (err) {
      console.error(err);
    }
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Authentication();
