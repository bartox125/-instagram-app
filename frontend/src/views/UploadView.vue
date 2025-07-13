<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Upload from '@/components/Upload.vue'
</script>
<template>
  <Header></Header>
    <div class="min flex justify-center">
        <Upload></Upload>
    </div>
  <Footer></Footer>
</template>
<style>
.min{
  min-height: calc(100vh - 160px);
}
</style>