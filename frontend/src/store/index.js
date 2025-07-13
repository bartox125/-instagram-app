import  {createStore} from "vuex";
import {postFile, getPhotos, postLogIn, postRegister, patchTags, getOnePhoto } from "@/api/index.js"
const store = createStore({
  state: {
    photos:[],
    hash:'',
    message:'',
    id: null
  }, 

  getters: {
    GET_PHOTOS(state){
      console.log("Getter GET_PHOTOS:", state.photos);
      return state.photos
    },
    GET_HASH(state){
      console.log("Getter GET_HASH:", state.hash);
      return state.hash
    },
    GET_MESSAGE(state){
      return state.message
    },
    GET_ID(state){
      return state.id
    }
  }, 

  actions: {
    async POST_API_PHOTOS({ commit }, obj) {
      console.log(obj);
      try {
        const data = await postFile(obj);
        commit('SET_MESSAGE', 'Pliki zostały pomyślnie przesłane.');
      } catch (err) {
        console.log("err", err);
        commit('SET_MESSAGE', 'Błąd podczas przesyłania plików.');
      } finally {
        console.log("finally");
      }
    },
    async GET_API_PHOTOS({ commit }, fdObject) {
        try {
        const data = await getPhotos(fdObject);
        console.log("Fetched photos:", data)
        commit('SET_PHOTOS', data)
        commit('SET_MESSAGE', data)
      } catch (err) {
        console.log("err", err);
        commit('SET_MESSAGE', 'Błąd w trakcie pobierania zdjęć')
      } finally {
        console.log("finally");
      }
      },
      async GET_API_PHOTO({ commit }, id) {
        console.log(id);
        try {
        const data = await getOnePhoto(id);
        commit('SET_PHOTOS', data)
      } catch (err) {
        console.log("err", err);
        commit('SET_MESSAGE', 'Błąd w trakcie pobierania zdjęć')
      } finally {
        console.log("finally");
      }
      },
      async POST_API_LOGIN({ commit }, fdObject) {
        try {
          const data = await postLogIn(fdObject);
          console.log("hash",data);
          commit('SET_HASH', data)
        } catch (err) {
          console.log("err", err);
        } finally {
          console.log("finally");
        }
      },
      async PATCH_API_PHOTOS_TAGS({ commit }, fdObject) {
        try {
          const data = await patchTags(fdObject);
          console.log("Fetched photos:", data)
          commit('SET_PHOTOS', data)
          commit('SET_MESSAGE', data)
        } catch (err) {
          console.log("err", err);
          commit('SET_MESSAGE', 'Błąd w aktualizacji tagów')
        } finally {
          console.log("finally");
        }
      },
      async LOGOUT({commit}){
        commit('SET_HASH', '')
      },
      async POST_API_REGISTER({ commit }, fdObject) {
        try {
          const data = await postRegister(fdObject);
          commit("SET_MESSAGE", data)
        } catch (err) {
          console.log("err", err);
        } finally {
          console.log("finally");
        }
      }
    },
  mutations: {
    SET_PHOTOS(state, photos) {
      state.photos = photos;
    },
    SET_HASH(state, hash){
      state.hash=hash
      console.log("store",state.hash);
    },
    SET_MESSAGE(state, message){
      state.message=message
    },
    SET_ID(state,id){
      state.id=id
    },
  },
});


export {store}
