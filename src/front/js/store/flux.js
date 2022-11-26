const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      errorMessage: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      verifyUser: (token) => {
        fetch(
          "https://3001-tgonz089-jwtauthenticat-ooe4lzs1hr0.ws-us75.gitpod.io/api/protected",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        )
          .then((response) => {
            if (response.status >= 400) {
              setStore({ errorMessage: "An error has occured. Please Login." });
            }
            console.log(response.status);
            return response.json();
          })
          .then((result) => console.log(result))
          .catch((error) => console.log("There is an error:", error));
      },

      signup: (email, password) => {
        fetch(
          "https://3001-tgonz089-jwtauthenticat-ooe4lzs1hr0.ws-us75.gitpod.io/api/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password }),
          }
        )
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.log(error));
      },

      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
      },

      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const resp = await fetch(
            "https://3001-tgonz089-jwtauthenticat-ooe4lzs1hr0.ws-us75.gitpod.io/api/login",
            opts
          );
          if (resp.status !== 200) {
            alert("There was an error.");
            return false;
          }
          const data = await resp.json();
          console.log("This came from the backend", data);
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error("There is an error when logging in.");
        }
      },

      getMessage: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer" + store.token,
          },
        };
        fetch(
          "https://3001-tgonz089-jwtauthenticat-ooe4lzs1hr0.ws-us75.gitpod.io/api/hello",
          opts
        )
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from the backend", error)
          );
      },
      changeColor: (index, color) => {
        const store = getStore();

        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
