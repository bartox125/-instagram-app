 <script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Image from '@/components/Image.vue'
</script>
<template>
  <Header></Header>
  <div class="min flex justify-center max-w-full">
    <div class="mt-4 mb-4">
      <p class="text-center text-3xl font-bold">Strona domowa twojego profilu</p>
      <p v-if="!photos" class="text-center text-sm font-medium">to tutaj wyświetlają się twoje zdjęcia</p>
      <div v-if="loading" class="flex flex-row justify-center mt-4 space-x-3"><p class="text-2xl">Ładowanie... </p>
        <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
      </div>
      </div>
      <div v-else-if="message" class="text-center mt-3 font-bold text-rose-600 text-lg">{{ message }}</div>
      <div v-if="photos" class="mt-4 grid grid-cols-5 gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2">
        <div v-for="photo in photos">
          <Image :object="photo"></Image>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
export default {
  data() {
    return {
      token: '',
      photos: [],
      loading: false,
      message: null,
      showed: false,
    };
  },
  methods: {
    showElement(){
      console.log("pokaż");
      this.showed=!this.showed
    },
    async getPhoto() {
      this.loading = true;
      try {
        let data = {
          token: this.token,
        };
        await this.$store.dispatch("GET_API_PHOTOS", data);
        this.photos = this.$store.getters.GET_PHOTOS;
        console.log("zdjęcia" ,this.photos);
        let recived=this.$store.getters.GET_MESSAGE
        if(Array.isArray(recived)){
          this.photos = this.$store.getters.GET_PHOTOS;
        }
        else{
          this.photos=null
          this.message=recived
        }
      } catch (error) {
        this.message = 'Wystąpił błąd podczas pobierania zdjęć';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    try {
      this.token = this.$store.getters.GET_HASH;
      await this.getPhoto();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
.min{
  min-height: calc(100vh - 160px);
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 20px;
}
</style>
