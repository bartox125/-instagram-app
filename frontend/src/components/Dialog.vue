<template>
        <p class="font-bold">{{ mes }}</p>
        <a v-if="show" :href="message" target="_blank" class="underline font-semibold text-blue-500">link</a><br>
</template>
<script>
export default {
    props: {
        message: String
    },
    data() {
        return {
            show:false,
            link: '',
            mes:'',
        };
    },
    methods:{
        exit(){
          this.$emit('exit')
        }
    },
    mounted(){
        this.show=true
        this.link=this.message
        this.mes="kliknij powyższy link by aktywować konto"
    }
}
</script>
