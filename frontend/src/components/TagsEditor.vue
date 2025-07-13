<template>
    <div>
      <p class="text-center m-2 font-medium">EDYCJA TAGÓW</p>
      <form @submit="sendTags">
        <textarea v-model="tagsList" class="resize-none rounded-md border-slate-400 border-2 p-1 outline-none transition duration-300 ease-in-out focus:scale-105 focus:outline-none focus:shadow-xl focus:shadow-slate-500"></textarea>
      <div class="flex h-10 justify-center items-center">
        <div class="grow"></div>
        <button class="text-end m-2 transition duration-300 hover:scale-105" @click="exit">Zaktualizuj tagi</button>
      </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tags: {
        type: Array,
        required: true
      },
      photoid: Number
    },
    data() {
      return {
        tagsList: '',
        token:''
      }
    },
    methods:{
        sendTags(e){
            e.preventDefault()
            let arr=this.tagsList.replaceAll(" ","")
            arr=arr.split("#")
            console.log(arr);
            let newtags=[]
            for(let i=1;i<arr.length;i++){
                if(arr[i]!=' '){
                    const obj={name:"#"+arr[i]}
                    newtags.push(obj)
                }
            }
            let data = {
                tags: newtags,
                photoId: this.photoid
            };
            this.$store.dispatch("PATCH_API_PHOTOS_TAGS", data)
        },
        exit(){
          this.$emit('exit')
        }
    },
    mounted() {
        for(let i=0;i<this.tags.length;i++){
            this.tagsList=this.tagsList+" "+this.tags[i].name
        }
    }
  }
  </script>
  