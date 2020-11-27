import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        //ユーザー情報
        accountToken:'',
        accountName:'ユーザー',
        accountBirthDay:'',
        accountGender:'',
        accountHeight:'',
        accountWeight:'',
        accountActiveLevel:'',
        accountStartDay:'',
        //Twitter投稿用カロリー情報
        intakeCalorie:'',
        consumptionCalorie:'',
        calorie:'',
    },

    mutations:{
        //トークン登録又は更新
        tokenUpdate(state,newToken){
            state.accountToken = newToken
        },
        //ユーザー情報の削除
        tokenDelete(state){
            state.accountToken = ""
            state.accountName = "ユーザー"
            state.accountBirthDay = ""
            state.accountGender = ""
            state.accountHeight = ""
            state.accountWeight = ""
            state.accountActiveLevel = ""
            state.calorie = ""
            state.intakeCalorie = ""
            state.consumptionCalorie = ""
        },
        //ユーザー取得又は更新
        accountUpdate(state,data){
            state.accountName = data.name
            state.accountBirthDay = data.birthday
            state.accountGender = data.gender
            state.accountHeight = data.height
            state.accountWeight = data.weight
            state.accountActiveLevel = data.activlevel
            state.accountStartDay = data.startday
        },
        //カロリー情報の取得
        calorieAdd(state,data){
            state.calorie = data.userCalorie
            state.intakeCalorie = data.userIntakeCalorie
            state.consumptionCalorie = data.userConsumptionCalorie
        }
    },

    plugins: [createPersistedState({
        key: 'acsys',
        storage: window.sessionStorage
    })]
})