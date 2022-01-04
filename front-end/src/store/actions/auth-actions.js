import { uiActions } from "../reducers/ui-slice";
import { authActions } from "../reducers/auth-slice";
import jwtDecode from "jwt-decode";
import config from "../../config.json";

const apiUrl = config.apiUrl;
const logoutHandler = (dispatch) => {
  dispatch(authActions.logout());
};

const setAutoLogout = (milliseconds, dispatch) => {
  setTimeout(() => {
    logoutHandler(dispatch);
  }, milliseconds);
};

export const getAuthenticated = (values) => {
  return async (dispatch) => {
    // dispatch(uiActions.setIsLoading({ loading: true }));
    let url = `${apiUrl}/auth/signin`;
    let response;

    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseData = await response.json();
        // console.log(responseData);
        // dispatch(uiActions.setIsLoading({ loading: false }));

        const decodedJwt = jwtDecode(responseData.token);
        const expiryDate = new Date(decodedJwt.exp * 1000);
        const remainingMilliseconds =
          new Date(decodedJwt.exp * 1000) - new Date();

        dispatch(
          authActions.setTokenData({
            token: responseData.token,
            expiryDate: expiryDate.toISOString(),
            userId: responseData.userId,
          })
        );
        dispatch(
          authActions.setIsLoggedIn({
            loggedIn: true,
          })
        );

        setAutoLogout(remainingMilliseconds, dispatch);
        // navigate("/", { replace: true });
      } else {
        const responseData = await response.json();
        //   console.log(responseData);
        dispatch(authActions.setIsLoggedIn({ loggedIn: false }));
        // dispatch(uiActions.setIsLoading({ loading: false }));

        dispatch(
          uiActions.showNotification({
            title: "Error",
            name: responseData.name || "",
            message: responseData.message,
          })
        );
      }
    } catch (err) {
      dispatch(authActions.setIsLoggedIn({ loggedIn: false }));
      // dispatch(uiActions.setIsLoading({ loading: false }));
      dispatch(
        uiActions.showNotification({
          title: "Error",
          name: err.name,
          message: err.message,
        })
      );
    }
  };
};

export const createAccount = (values, navigate) => {
  return async (dispatch) => {
    // dispatch(uiActions.setIsLoading({ loading: true }));
    let url = `${apiUrl}/auth/signup`;
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        await response.json();
        dispatch(uiActions.setIsLoading({ loading: false }));
        //console.log(responseData);
        navigate("/signin");
      } else {
        const responseData = await response.json();
        // dispatch(uiActions.setIsLoading({ loading: false }));

        dispatch(
          uiActions.showNotification({
            title: "Error",
            name: responseData.name || "",
            message: responseData.message,
          })
        );
      }
    } catch (err) {
      // dispatch(uiActions.setIsLoading({ loading: false }));
      dispatch(
        uiActions.showNotification({
          title: "Error",
          name: err.name,
          message: err.message,
        })
      );
    }
  };
};
