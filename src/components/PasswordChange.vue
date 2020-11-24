<template>
    <div class="container">
        <form>
            <!--現在のパスワード-->
            <div class="form-group row mx-auto mt-5">
                <label for="OldPass"  class="col-md-3  col-form-label text-center col-auto">現在のパスワード</label><br>
                <input type="password" class="col-md-9 col-auto form-control ml-xs-5 " id="OldPass" v-model="form.account_old_pass">
            </div>
            <p class="text-danger text-center h5 col-9">
                {{ OldPasswordResult }}
            </p>
            <!--新しいパスワード-->
            <div class="form-group row mx-auto mt-5">
                <label for="NewPass" class="col-md-3  col-form-label text-center col-auto">新しいパスワード</label><br>
                <input type="password" class="col-md-9 col-auto form-control ml-xs-5 " id="NewPass" v-model="form.account_new_pass">
            </div>
            <p class="text-danger text-center h5 col-9">
                {{ NewPasswordResult }}
            </p>
            <!--新しいパスワード確認-->
            <div class="form-group row mx-auto mt-5">
                <label for="ConNewPass" class="col-md-3  col-form-label text-center col-auto">新しいパスワード確認</label><br>
                <input type="password" class="col-md-9 col-auto form-control ml-xs-5 " id="ConNewPass" v-model="form.account_con_new_pass">
            </div>
            <p class="text-danger text-center h5 col-9">
                {{ ConNewPasswordResult }}
            </p>
        </form>
        <div class="row mt-5 md-5">
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
                },
                errors:[],
                //バリデーション結果
                OldPasswordResult: "",
                NewPasswordResult: "",
                ConNewPasswordResult: ""
            }
        },methods: {
            checkHandler: function (form, event) {
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
                    this.errors.push(this.OldPasswordResult)
                    OldPass = false
                }else if(this.form.account_old_pass.length > 128){
                    this.OldPasswordResult = "パスワードの文字数オーバー"
                    this.errors.push(this.OldPasswordResult)
                    OldPass = false
                }else{
                    OldPass = true
                    this.OldPasswordResult = ""
                }
                // 新しいパスワードのバリデーション
                if(!this.form.account_new_pass){
                    this.NewPasswordResult = "新しいパスワードを入力してください"
                    this.errors.push(this.NewPasswordResult)
                    NewPass = false
                }
                else if(this.form.account_old_pass === this.form.account_new_pass){
                    this.NewPasswordResult = "前のパスワードと別のパスワードを入力してください"
                    this.errors.push(this.NewPasswordResult)
                    NewPass = false
                }
                else if(!re3.test(this.form.account_new_pass)){
                    console.log("パスワードに使用できない文字、もしくは全角が含まれています")
                    this.NewPasswordResult = "パスワードに使用できない文字、もしくは全角が含まれています"
                    this.errors.push(this.NewPasswordResult)
                    NewPass = false
                }else if(this.form.account_new_pass.length < 6){
                    this.NewPasswordResult = "パスワードの文字数が少ないです"
                    this.errors.push(this.NewPasswordResult)
                    NewPass = false
                }else if(this.form.account_new_pass.length > 128){
                    this.NewPasswordResult = "パスワードの文字数オーバー"
                    this.errors.push(this.NewPasswordResult)
                    NewPass = false
                }else{
                    NewPass = true
                    this.NewPasswordResult = ""
                }
                // 新しいパスワード確認のバリデーション
                if(!this.form.account_con_new_pass){
                    this.ConNewPasswordResult = "もう一度入力してください"
                    this.errors.push(this.ConNewPasswordResult)
                    ConNewPass = false
                }
                else if(this.form.account_new_pass !== this.form.account_con_new_pass){
                    this.ConNewPasswordResult = "新しいパスワードとパスワード確認が一致しません"
                    NewPass = false
                }else{
                    ConNewPass = true
                    this.ConNewPasswordResult = ""
                }
                // バリデーションをクリアした時にパスワード更新
                if(OldPass === true && NewPass === true && ConNewPass === true){

                    // APIと通信
                    const URL = "https://fat3lak1i2.execute-api.us-east-1.amazonaws.com/acsys/users/pass/change"
                    const post_data={
                        account_token:this.$store.state.accountToken,
                        current_pass:this.form.account_old_pass,
                        new_pass:this.form.account_new_pass,
                    }
                    const json_data = JSON.stringify(post_data)
                    await fetch(URL,{
                        mode:'cors',
                        method:'POST',
                        body:json_data,
                        headers:{'Content-type':'application'},
                    })
                        .then(function (response) {
                            return response.json()
                        })
                        .then(data => {
                            const flg_data = data['isSuccess']
                            if(flg_data){
                                console.log('パスワード変更ok')
                                this.loginResult = true
                                //topへ
                                this.$router.replace("/savecalorie")
                            }else {
                                console.log('パスワード変更ng')
                                //パスワードが違う
                                alert("入力されたパスワードが間違っています")
                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                }
                event.preventDefault();
            },
        }
    }
</script>