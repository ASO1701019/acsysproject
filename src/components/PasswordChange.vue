<template>
    <div class="container">
        <form>
            <!--現在のパスワード-->
            <div class="form-group row mx-auto mt-5">
                <label for="OldPass"  class="col-sm-4  col-form-label text-center col-auto">現在のパスワード</label><br>
                <input type="password" class="col-sm-8 col-auto form-control ml-xs-5 " id="OldPass" v-model="form.account_old_pass">
            </div>
            <p class="text-danger text-center h5 col-9">
                {{ OldPasswordResult }}
            </p>
            <!--新しいパスワード-->
            <div class="form-group row mx-auto mt-5">
                <label for="NewPass" class="col-sm-4  col-form-label text-center col-auto">新しいパスワード</label><br>
                <input type="password" class="col-sm-8 col-auto form-control ml-xs-5 " id="NewPass" v-model="form.account_new_pass">
            </div>
            <p class="text-danger text-center h5 col-9">
                {{ NewPasswordResult }}
            </p>
            <!--新しいパスワード確認-->
            <div class="form-group row mx-auto mt-5">
                <label for="ConNewPass" class="col-sm-4  col-form-label text-center col-auto">新しいパスワード確認</label><br>
                <input type="password" class="col-sm-8 col-auto form-control ml-xs-5 " id="ConNewPass" v-model="form.account_con_new_pass">
            </div>
            <p class="text-danger text-center h5 col-9">
                {{ ConNewPasswordResult }}
            </p>
        </form>
        <div class="row mt-3 md-5">
            <button id="password_decision" class="btn btn-success col-6 mx-auto" @click="checkHandler(form,$event)">決定</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PasswordChange",
        data: function () {
            return{
                form: {
                    account_pass: "",
                    account_old_pass: "",
                    account_new_pass: "",
                    account_con_new_pass: "",
                }
            }
        },methods: {
            checkHandler: function (event) {
                this.checkForm(event);
            },


            //-----------------------------バリデーション-------------------------------------
            checkForm: async function(event) {
                let OldPass
                let NewPass
                let ConNewPass
                let re3 = /^[A-Za-z0-9]+$/



                //現在のパスワードのバリデーション
                if (!this.form.account_old_pass) {
                    this.OldPasswordResult = "パスワードを入力してください"
                    console.log(this.OldPasswordResult)
                    this.errors.push(this.OldPasswordResult)
                    OldPass = false
                } else if(this.account_old_pass != this.account_pass){
                    this.OldPasswordResult = "現在のパスワードと一致しません。"
                    console.log(this.OldPasswordResult)
                }else{
                    OldPass = true
                    this.OldPasswordResult = ""
                }


                // 新しいパスワードのバリデーション
                if(this.account_old_pass === this.account_new_pass){
                    this.NewPasswordResult = "前のパスワードと別のパスワードを入力してください。"
                    console.log(this.NewPasswordResult)
                }
                else if(!re3.test(this.form.account_new_pass)){
                    console.log("パスワードに使用できない文字、もしくは全角が含まれています")
                    this.NewPasswordResult = "パスワードに使用できない文字、もしくは全角が含まれています"
                    this.errors.push(this.NewPasswordResult)
                    OldPass = false
                }else if(this.form.account_new_pass.length < 6){
                    this.NewPasswordResult = "パスワードの文字数が少ないです"
                    console.log(this.NewPasswordResult)
                    this.errors.push(this.NewPasswordResult)
                    NewPass = false
                }else if(this.form.account_new_pass.length > 128){
                    this.NewPasswordResult = "パスワードの文字数オーバー"
                    console.log(this.NewPasswordResult)
                    this.errors.push(this.NewPasswordResult)
                    NewPass = false
                }else{
                    NewPass = true
                    this.NewPasswordResult = ""
                }


                // 新しいパスワード確認のバリデーション
                if(this.account_new_pass != this.account_con_new_pass){
                    this.ConNewPasswordResult = "新しいパスワードとパスワード確認が一致しません。"
                    NewPass = false
                }else{
                    ConNewPass = true
                    this.ConNewPasswordResult = ""
                }

                // バリデーションをクリアした時にパスワード更新
                if(OldPass === true && NewPass === true && ConNewPass === true){
                    const check = await this.Data_post(this.from)
                    if(check != 0){
                        // パスワード更新完了時
                        await this.$router.replace("/savecalorie")
                        alert("パスワードが更新されました！")
                    }else{
                        // エラー時
                        console.log("バリデーションチェックが通らなかった、又はエラー")
                        alert("変更ができませんでした。。もう一度やり直してください")
                    }
                }


                event.preventDefault();
            },
            created() {
            }
        }
    }

</script>

<style scoped>

</style>