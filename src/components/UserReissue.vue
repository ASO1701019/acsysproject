<template>
    <div id="#app" class="container">
        <div class="text-success mt-5 pt-5 mb-4 text-center h1 font-weight-bold">
            acsysアカウントを探す
        </div>
        <div class="text-success mt-1 pt-1 mb-4 text-center h5 font-weight-bold">
            メールアドレスを入力してください。
        </div>
        <div>
            <div class="pt-2">
                <input type="text" class="form-control col-lg-6 col-md-8 mt-1 mx-auto" id="mail">
            </div>

            <div class="row pt-4 mt-3 mb-5">
                <button href="/message" id="post_btn" class="btn btn-success col-8 mx-auto"  @click="checkHandler(form,$event)">決定</button>
            </div>
        </div>
    </div>
</template>

<script>
    // async created(){
    //
    // }
</script>

<style scoped>

</style>