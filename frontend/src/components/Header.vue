<template>
    <div class="w-screen bg-white min-h-20 p-3 flex bg-cyan-300 shadow-xl max-w-full">
        <div class="flex justify-center items-center">
            <RouterLink to="/home" class="mr-5 ml-5 font-medium text-xl text-center inline-flex items-center">
                <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>Home
            </RouterLink>
        </div>
        <div class="flex justify-center items-center">
            <RouterLink to="/upload" class="font-medium text-xl text-center inline-flex items-center">
                <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                </svg>Upload
            </RouterLink>
        </div>
        <div class="grow"></div>
        <button @click="logOut" class="rounded-md bg-rose-400 p-3 mr-5 font-medium hover:bg-rose-500 hover:shadow-xl text-center inline-flex items-center">
            <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
            </svg>Wyloguj się
        </button>
    </div>
</template>
<script>
    export default {
    data() {
        return {
        
        };
    },
    methods:{
        logOut(){
            this.$store.dispatch('LOGOUT')
            this.$router.push({ name: 'login' });
        }
    }
}
</script>

<style>

</style>