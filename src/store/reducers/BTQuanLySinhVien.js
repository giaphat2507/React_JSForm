import { ADD_USER, DELETE_USER, EDIT_USER, UPDATE_USER, SEARCH_USER } from "../types";

const stateDefault = {
    mangSinhVien: [
    ],
    selectedUser: null,
    flag: true,
    key: '',
    svSearch: [],
  };
  
  export const baiTapQuanLySinhVien = (
    state = stateDefault,
    { type, payload }
  ) => {
    switch (type) {
      case ADD_USER: {
        const data = [...state.mangSinhVien];
        const user = { ...payload, id: Date.now() };
        data.push(user);
        state.svSearch = []
        return { ...state, mangSinhVien: data };
      }
      case DELETE_USER: {
        const data = state.mangSinhVien.filter((item) => item.id !== payload);
        const data1 = state.svSearch.filter((item) => item.id !== payload);
        return { ...state, mangSinhVien: data, svSearch: data1 };
      }
      case EDIT_USER: {
        const user = state.mangSinhVien.find((item) => item.id === payload);
        return { ...state, selectedUser: user };
      }
      case UPDATE_USER: {
        const newUserList = state.mangSinhVien.map((item) =>
          item.id === payload.id ? payload : item
        );
        const newUserList1 = state.svSearch.map((item) =>
          item.id === payload.id ? payload : item
        );
        state.selectedUser = null;
        return { ...state, mangSinhVien: newUserList, svSearch: newUserList1 };
      }
      case SEARCH_USER: {
        state.flag = true;
        const data = state.mangSinhVien.filter((item) => item.fullName === payload);
        data.length === 0 && payload !== ""
          ? (state.flag = false)
          : (state.flag = true);
        return { ...state, svSearch: data };
      }
      default:
        return state;
    }
  };
  