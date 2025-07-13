<template>
  <div class="w-96 h-64 bg-sky-200 rounded-2xl m-8 shadow-2xl p-4">
    <p class="font-bold text-3xl text-center m-3">Upload plików</p>
    <form @submit="onSubmit">
      <input
        class="block w-full text-sm text-gray-900 border border-gray-500 rounded-lg cursor-pointer bg-gray-300 focus:outline-none"
        aria-describedby="file_input_help" id="file_input" type="file" name="filetoupload" @change="handleFileUpload"
        accept=".jpg, .jpeg, .png, .bmp, .gif">
      <p class="mt-1 text-sm text-gray-500" id="file_input_help">Tylko pliki w formacie: PNG, JPG, BMP or GIF </p>
      <div class="min-h-12">
        <p v-if="message" class="">{{ message }}</p>
        <p v-if="loading">Trwa przesyłanie plików...</p>
      </div>
      <div class="flex">
        <div class="grow"></div>
        <div v-if="loading">
          <div role="status">
            <svg aria-hidden="true" class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-rose-400"
              viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
          </div>
        </div>
        <button v-if="!loading" type="submit" class="w-24 p-3 bg-rose-400 font-semibold rounded-lg text-center inline-flex items-center hover:bg-rose-500 hover:shadow-xl">
          <svg class="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
          </svg> Prześlij
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      token: '',
      photos: [],
      loading: false,
      message: null
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
        const fd = new FormData();
        fd.append("file", this.file);
        let data = {
          fd: fd,
          token: this.token,
        };
        this.loading = true;
        this.message = false
        this.$store.dispatch("POST_API_PHOTOS", data).finally(() => {
        this.loading = false;
        this.message = this.$store.getters.GET_MESSAGE
      });
    },
    handleFileUpload(e) {
      this.file = e.target.files[0];
      this.token = this.$store.getters.GET_HASH;
    },
    async getPhoto() {
      await this.$store.dispatch("GET_API_PHOTOS");
      this.photos = this.$store.getters.GET_PHOTOS;
    },
  },
};
</script>

<style></style>