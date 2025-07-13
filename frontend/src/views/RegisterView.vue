<script setup>
    import Dialog from '@/components/Dialog.vue'
</script>
<template>
    <div class="flex justify-center items-center h-screen w-full bg-slate-300">
        <form @submit="onSubmit" class="flex flex-col w-96 h-[460px] bg-white rounded-3xl border-green-500 border-2 space-y-3">
            <p class="text-4xl font-bold text-center mt-6 mb-6">InstaApp - gUral</p>
            <p class="text-xl text-center">Panel rejestracji</p>
            <input type="text" v-model="name" placeholder="imie" class="w-64 h-9 p-1.5 rounded-xl border-green-500 border-2 self-center transition duration-300 ease-in-out focus:scale-105 focus:outline-none focus:shadow-2xl focus:shadow-green-800 focus:ring-green-500 focus:border-green-500 focus:border-1">
            <input type="text" v-model="lastName" placeholder="nazwisko" class="w-64 h-9 p-1.5 rounded-xl border-green-500 border-2 self-center transition duration-300 ease-in-out focus:scale-105 focus:outline-none focus:shadow-2xl focus:shadow-green-800 focus:ring-green-500 focus:border-green-500 focus:border-1">
            <input type="text" v-model="email" placeholder="email" class="w-64 h-9 p-1.5 rounded-xl border-green-500 border-2 self-center transition duration-300 ease-in-out focus:scale-105 focus:outline-none focus:shadow-2xl focus:shadow-green-800 focus:ring-green-500 focus:border-green-500 focus:border-1">
            <input type="password" v-model="password" placeholder="hasło" class="w-64 h-9 p-1.5 rounded-xl border-green-500 border-2 self-center transition duration-300 ease-in-out focus:scale-105 focus:outline-none focus:shadow-2xl focus:shadow-green-800 focus:ring-green-500 focus:border-green-500 focus:border-1">
            <button type="submit" class="font-semibold bg-sky-300 hover:bg-sky-500 w-36 p-1.5 rounded-lg self-end mr-14 transition duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:shadow-sky-900">Utwórz konto</button>
            <div class="h-3"></div>
            <RouterLink to="/login" class="text-xs underline self-center">Masz konto? - zaloguj sie</RouterLink>
        </form>
    </div>
    <dialog ref="dialog" class="w-96 min-h-fit rounded-xl shadow-2xl p-3 mt-20">
        <Dialog :message="message" @exit="exit"></Dialog>
   </dialog>
</template>

<script>
export default {
    data() {
        return {
                name: "",
                lastName:"",
                email: "",
                password: "",
                message:''
        };
    },
    methods:{
        async onSubmit(e) {
            e.preventDefault();
            let data={
                name:this.name,
                lastName:this.lastName,
                email:this.email, 
                password:this.password
            }
            try {
                await this.$store.dispatch("POST_API_REGISTER", data)
                let recived=this.$store.getters.GET_MESSAGE
                console.log(recived);
                this.message=recived
                this.openDialog()
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

<style lang="scss" scoped>

</style>