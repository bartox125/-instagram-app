<script setup>
    import TagsEditor from '@/components/TagsEditor.vue'
</script>
<script>
export default {
  props: {
    object: Object,
  },
  data(){
    return{
        showTagsEdit:false,
    }
  },
  methods:{
    funcTags(){
        this.showTagsEdit=!this.showTagsEdit
    },
    funcFilters(id){
        this.$store.commit('SET_ID',id)
        this.$router.push({ name: 'edit' });
    },
    redirect(id){
        console.log(id);
        this.$store.commit('SET_ID',id)
        this.$router.push({ name: 'photo' });
    }
  }
}
</script>
<template>
    <div class="bg-stone-200 border-2 p-3 border-slate-400 w-60 min-h-52 h-fit flex flex-col items-center p-1">
        <img :src="'http://localhost:3000/api/getimage/'+object.id" :alt="object.originalName" @click="redirect(object.id)" class="mb-4 h-28 transition duration-200 hover:scale-105">
        <div class="flex flex-row space-x-2">
            <button @click="funcTags" class="bg-cyan-200 w-24 h-14 rounded-lg hover:border-2 hover:border-cyan-400">Edytuj tagi</button>
            <button @click="funcFilters(object.id)" class="bg-cyan-200 w-24 h-14 rounded-lg hover:border-2 hover:border-cyan-400">Edytuj zdjęcie</button>
        </div>
        <div v-show="showTagsEdit" >
            <TagsEditor :tags="object.tags" :photoid="object.id" @exit="funcTags"></TagsEditor>
        </div>
    </div>
</template>