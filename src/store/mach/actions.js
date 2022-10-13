import axios from 'axios';

const actions = {
  async fetchData({
    commit, state, getters, dispatch,
  }) {
    const prefix = process.env.NODE_ENV === "production" ? "/et-alive/" : "/";
    return axios
      .get(`${prefix}etmadata.json`, {
        responseType: "json",
      })
      .then((data) => {
        commit('updateData', data.data.data);
      });
  },
};

export default actions;
