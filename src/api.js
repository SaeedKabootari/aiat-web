import axios from "axios";

// export const BASE_URL = "http://192.168.2.159:8080";
// export const WEB_SOCKET_URL = "ws://192.168.2.159:8080/ws";



// export const BASE_URL = "http://localhost:6000";
// export const WEB_SOCKET_URL = "ws://localhost:6001/ws";


// export const BASE_URL = "http://localhost:5000";
// export const WEB_SOCKET_URL = "ws://localhost:5001/ws";

// export const BASE_URL = "http://192.168.2.211:8000";


// development:
export const BASE_URL = "http://localhost:7000";
export const WEB_SOCKET_URL = "ws://localhost:7001/ws";


// git:
// export const BASE_URL = "";
// export const WEB_SOCKET_URL = "";

axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
// =============== get =====================

export const getAction = function (url) {
  let handleMethod = async function () {
    try {
      return await fetch(BASE_URL + url, { method: "GET" }).then((res) => {
        console.log(res, "in api res");
        return res;
      });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};
export const delAction = function (url) {
  let handleMethod = async function () {
    try {
      return await fetch(BASE_URL + url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        return res;
      });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};
// =============== post ====================

export const postAction = function (url, body) {
  let handleMethod = async function () {
    try {
      return await fetch(BASE_URL + url, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
      }).then((res) => {
        return res;
      });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};
// =============== put ====================
export const putAction = function (url, body) {
  let handleMethod = async function () {
    try {
      return await fetch(BASE_URL + url, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(body),
      }).then((res) => {
        return res;
      });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};

// ================= get axios =================
export const getActionAx = function (url) {
  let handleMethod = async function () {
    try {
      return await axios
        .get(BASE_URL + url, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          console.log(res, "in api res");
          return res;
        });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};

// ================ post axios ============================
export const postActionAx = function (url, body) {
  let handleMethod = async function () {
    try {
      return await axios
        .post(BASE_URL + url, body, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          console.log(res, "in api res");
          return res;
        });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};

// ======================= put axios ========================
export const putActionAx = function (url, body) {
  let handleMethod = async function () {
    try {
      return await axios
        .put(BASE_URL + url, body, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          console.log(res, "in api res");
          return res;
        });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};

// ======================= del axios =========================
export const delActionAx = function (url) {
  let handleMethod = async function () {
    try {
      return await axios
        .delete(BASE_URL + url, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          console.log(res, "in api res");
          return res;
        });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};

// ======================= patch axios ========================
export const patchActionAx = function (url, body) {
  let handleMethod = async function () {
    try {
      return await axios
        .patch(BASE_URL + url, body, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          console.log(res, "in api res");
          return res;
        });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};

// =============== post data ====================

// export const postDataAction = function (url, body) {
//   let handleMethod = async function () {
//     try {
//       return await fetch(BASE_URL + url, {
//         headers: {},
//         method: "POST",
//         body: body,
//       }).then((res) => {
//         return res;
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
//   return handleMethod();
// };

export const postDataAction = function (url, body) {
  let handleMethod = async function () {
    try {
      const response = await axios.post(BASE_URL + url, body, {
        headers: {},
      });
      return response;
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};

// ================= get axios =================
export const getActionAxTest = function (url) {
  let handleMethod = async function () {
    try {
      return await axios
        .get(url, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          console.log(res, "in api res");
          return res;
        });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};

// ================= get axios =================
export const getActionAxToken = function (url,cookie) {
  let handleMethod = async function () {
    try {
      return await axios
        .get(BASE_URL + url, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Cookie': cookie
          },
        })
        .then((res) => {
          console.log(res, "in api res");
          return res;
        });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};

// ================ post axios ============================
export const postActionAxToken = function (url, authToken, body) {
  let handleMethod = async function () {
    try {
      return await axios
        .post(BASE_URL + url, body, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          console.log(res, "in api res");
          return res;
        });
    } catch (err) {
      throw err;
    }
  };
  return handleMethod();
};
