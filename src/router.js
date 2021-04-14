import Vue from "vue";
import Router from "vue-router";
import { auth } from "./firebase";

import AppHeader from "./components/layout/AppHeader";
import AppFooter from "./components/layout/AppFooter";

import Landing from "./components/Landing.vue";
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";

import Admin from "./components/profile/Admin.vue"
import EditProfile from "./components/profile/EditProfile.vue"
import MyProfile from "./components/profile/MyProfile.vue";
import Profile from "./components/profile/Profile.vue";

import Home from './components/views/Home.vue'
import Listings from './components/views/Listings.vue'
import Upload from './components/views/Upload.vue'
import MyNotes from './components/views/MyNotes.vue'

import Chat from './components/chat/Chat.vue'
import PrivateChat from './components/chat/PrivateChat.vue'
import LocalView from './components/views/LocalView'

Vue.use(Router);

let router = new Router({
    linkExactActiveClass: "active",
    routes: [{
            path: "/",
            name: "landing",
            components: {
                header: AppHeader,
                default: Landing,
                footer: AppFooter
            }
        },
        {
            path: "/login",
            name: "login",
            components: {
                header: AppHeader,
                default: Login,
                footer: AppFooter
            },
            meta: {
                requiresGuest: true
            }
        },
        {
            path: "/register",
            name: "register",
            components: {
                header: AppHeader,
                default: Register,
                footer: AppFooter
            },
            meta: {
                requiresGuest: true
            }
        },
        {
            path: "/admin",
            name: "admin",
            components: {
                header: AppHeader,
                default: Admin,
                footer: AppFooter
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/myprofile",
            name: "myprofile",
            components: {
                header: AppHeader,
                default: MyProfile,
                footer: AppFooter
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/profile/:uid",
            name: "profile",
            props: true,
            components: {
                header: AppHeader,
                default: Profile,
                footer: AppFooter
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/home',
            name: "home",
            components: {
                header: AppHeader,
                default: Home,
                footer: AppFooter
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/listings',
            name: "listings",
            props: true,
            components: {
                header: AppHeader,
                default: Listings,
                footer: AppFooter
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/upload',
            name: "upload",
            components: {
                header: AppHeader,
                default: Upload,
                footer: AppFooter
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/mynotes',
            name: "mynotes",
            props: true,
            components: {
                header: AppHeader,
                default: MyNotes,
                footer: AppFooter
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/chats',
            name: "chats",
            components: {
                header: AppHeader,
                default: Chat,
                footer: AppFooter
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/chat/:uid',
            name: "chat",
            props: true,
            components: {
                header: AppHeader,
                default: PrivateChat,
                footer: AppFooter
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/localview/:noteId',
            name: "localview",
            props: true,
            components: {
                header: AppHeader,
                default: LocalView,
                footer: AppFooter
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/editprofile',
            name: "editprofile",
            props: true,
            components: {
                header: AppHeader,
                default: EditProfile,
                footer: AppFooter
            },
            meta: {
                requiresAuth: true
            }
        },
    ],
    scrollBehavior: to => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    },
});

// Nav Guard
router.beforeEach((to, from, next) => {
    var isLoggedIn = (auth.currentUser && auth.currentUser.email == "admin@unisos.com") || (auth.currentUser && auth.currentUser.emailVerified);
    // If require Auth
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn) {
            // Go to login
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
            // If logged in and verified
        } else {
            // Proceed to route
            next();
        }
        // If require Guest
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        // If logged in
        if (isLoggedIn) {
            // Go to landing
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            });
            // If not logged in
        } else {
            // Proceed to route
            next();
        }
    } else {
        // Proceed to route
        next();
    }
});

export default router;