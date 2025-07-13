<script setup>
</script>
<template>
   <div class="flex justify-center items-center h-screen w-full bg-slate-300">
        <form @submit="onSubmit" class="flex flex-col w-96 h-96 bg-white rounded-3xl border-green-500 border-2 space-y-4">
            <p class="text-4xl font-bold text-center mt-6 mb-6">InstaApp - gUral</p>
            <p class="text-xl text-center">Panel logowania</p>
            <input type="text" v-model="email" placeholder="Podaj email" class="w-64 h-9 p-1.5 rounded-xl border-green-500 border-2 self-center transition duration-300 ease-in-out focus:scale-105 focus:outline-none focus:shadow-2xl focus:shadow-green-800 focus:ring-green-500 focus:border-green-500 focus:border-1"/>
            <input type="password" v-model="password" placeholder="Podaj hasło" class="w-64 h-9 p-1.5 rounded-xl border-green-500 border-2 self-center transition duration-300 ease-in-out focus:scale-105 focus:border-green-500 focus:shadow-2xl focus:shadow-green-800 focus:ring-green-500 focus:border-green-500 focus:border-1"/>
            <button type="submit" class="font-semibold bg-sky-300 hover:bg-sky-500 w-24 p-1.5 rounded-lg self-end mr-14 transition duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:shadow-sky-900">Zaloguj</button>
            <div class="h-5"></div>
            <RouterLink to="/register" class="text-xs underline self-center">Kliknij by założyć konto</RouterLink>
        </form>
   </div>
   <dialog ref="dialog" class="w-60 rounded-xl shadow-2xl shadow-rose-400 bg-rose-100 border-2 border-rose-400 p-3 mt-20">
        <p class="font-bold">{{ message }}</p>
        <button @click="exit" class="w-10 bg-rose-400 h-7 font-bold mt-3 rounded hover:scale-105">OK</button>
   </dialog>
</template>

<script>
export default {
    data() {
        return {
                email: "",
                password: "",
                message:"",
        };
    },
    methods:{
        async onSubmit(e) {
            e.preventDefault();
            let data={email:this.email, password:this.password}
            try {
                await this.$store.dispatch("POST_API_LOGIN", data);
                let recived=this.$store.getters.GET_HASH  
                if(recived!="Nieprawidłowe dane"){
                    this.$router.push({ name: 'home' }); 
                }
                else{
                    this.message=recived
                    console.log(this.message);
                    this.openDialog()
                }
            } catch (error) {
                console.error("Login failed:", error);
            }
        },
        openDialog() {
            this.$refs.dialog.showModal();
        },
        exit(){
            this.$refs.dialog.close();
        }
    }
}
</script>

<style>

</style>