import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'

// components
import StartTop from "../components/StartTop"
import UserLogin from '../components/UserLogin'
import UserSignUp from '../components/UserSignUp'
import SaveCalorie from '../components/SaveCalorie'
import ConsumptionCalorieRegistration from "../components/ConsumptionCalorieRegistration"
import IntakeCalorieRegistration from "../components/IntakeCalorieRegistration"
import Calender from  "../components/Calendar"
import Training from "../components/Training"
import Statistics from "../components/Statistics"
import UserChange from "../components/UserChange"
import NotFound from "../components/NotFound";
import CalorieShare from "../components/CalorieShare";

// store
import Store from '../store/index'
import UpdateInformation from "../components/UpdateInformation";
import UserReissue from "../components/UserReissue";
import UserMessage from "../components/UserMessage";


Vue.use(Router)

const router = new Router({
    //#を外すためhistory
    mode: 'history',
    routes: [
        {
            //Topページ
            //ログイン前にある際とはmetaを追加する
            path: '/',
            name: 'StartTop',
            component: StartTop,
            meta: {
                isPublic: true
            }
        },
        {
            //ログイン
            path: '/login',
            name: 'login',
            component: UserLogin,
            meta: {
                isPublic: true
            }
        },
        {
            //アカウント再発行
            path: '/reissue',
            name: '/reissue',
            component: UserReissue,
            meta: {
                isPublic: true
            }
        },
        {
            //mailを飛ばした先
            path: '/message',
            name: '/message',
            component: UserMessage,
            meta: {
                isPublic: true
            }
        },
        {
            //新規登録
            path: '/signup',
            name: 'signup',
            component: UserSignUp,
            meta: {
                isPublic: true
            }
        },
        {
            //カロリー貯金
            path: '/savecalorie',
            component: SaveCalorie,
            name:'savecalorie',
        },
        {
            //消費カロリー入力
            path: '/consumptioncalorie',
            component: ConsumptionCalorieRegistration,
        },
        {
            //摂取カロリー入力
            path: '/intakecalorie',
            component: IntakeCalorieRegistration,
            name: 'intakecalorie',
        },
        {
            //カレンダー
            path: "/calendar",
            component: Calender,
            name: 'calendar',
        },
        {
            //トレーニング
            path: "/training",
            name: "training",
            component: Training,
        },
        {
            //統計
            path: "/statistics",
            name: "statistics",
            component: Statistics,
        },
        {
            //ユーザー情報変更
            path: "/userchange",
            name: "userchange",
            component: UserChange,
        },
        {
            //更新情報
            path: '/updateinformation',
            name: 'updateinformation',
            component: UpdateInformation,
            meta: {
                isPublic: true
            }
        },
        {
            //投稿
            path: '/tweet',
            name: 'tweet',
            component: CalorieShare,
        },
        {
            //NotFound
            path: "/*",
            name: 'notfound',
            component: NotFound,
        },
    ]
})

Vue.use(VueAnalytics, {
    id: 'UA-178757623-1',
    router
})

// metaかトークンがないとログインに遷移する
router.beforeEach((to, from, next) => {
    if (to.matched.some(page => page.meta.isPublic) || Store.state.accountToken) {
        next()
    } else {
        next('/login')
    }
})

export default router