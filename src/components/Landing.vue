<template>
    <div class="landing">
        <div class="landing-all">
            <!-- Blank -->
            <div style="height:15vh"></div>
            <!-- Main -->
            <div id="msg">
                <h1 id="title">Online Uni Resources</h1>
                <br>
                <h3 id="emph">Academic guidance can be difficult to come by in University. 
                    <br> <u> We understand. </u>
                </h3>
                <h3>Therefore, we created UniSOS as a platform for seniors to sell juniors</h3>
                <h3>their resources for the modules they have completed.</h3>
                
                <div v-if="isLoggedOut">
                    <router-link class="unauth" to="/login"><h2 class="inline" id="login">Log in</h2></router-link>
                    <h2 class="inline">or</h2>
                    <router-link class="unauth" to="/register"><h2 class="inline" id="signup">Sign up</h2></router-link>
                    <h2 class="inline">now!</h2>
                </div>
            </div>
        </div>
        <!-- <div class="landing-loggedout" v-if="isLoggedOut">
            <br><br>
            <h2> Established in late-2020, we have over 300 users today and our user base continues growing every day. </h2>
            <br>
            <div id="chart" style="height:600px">
                <UserBase></UserBase>
            </div>

        </div> -->
    </div>
</template>

<script>
import { auth } from '../firebase';
// import UserBase from '././charts/UserBase.vue'

export default {
    data() {
        return {
            isLoggedIn: false,
            isLoggedOut: false
        };
    },
    // components: {
    //     UserBase
    // },
    created() {
        if (auth.currentUser && auth.currentUser.emailVerified) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedOut = true;
        }
    }
}

</script>

<style scoped>
@font-face {
    font-family: 'FredokaOne';
    src: url('/fonts/fredokaone-regular-webfont.woff2') format('woff2'),
         url('/fonts/fredokaone-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
#msg {
    margin: 20px;
    align-items: center;
    text-align: center;
    vertical-align:middle;
}
.landing-all {
    margin: auto;
    padding: 20px;
    text-align: center;
    font-family: 'FredokaOne';
    background-image: url('../assets/Background.png');
    height: 81vh;
    color: white;
    min-width: 960px;
    min-height: 500px;
}
#emph {
    font-size: 32px;
    text-shadow: 2px 2px rgba(47, 79, 79, 0.568);
}
#uds {
    text-decoration: underline;
}
/*.btn {
  font-family: 'FredokaOne';
  border-radius: 0.5em;
  border-color: white;
  padding: 10px 20px;
  transition-duration: 0.4s;
  background-color: white;
  color: #2BD7E2;
}
.btn:hover {
  background-color: #2BD7E2;
  color: white;
}*/
#title {
    color: #fff;
    text-shadow: -2px 2px #000000,
               -3px 3px #2196f3,
               -4px 4px #26c6da,
               -5px 5px #C5ECEC;
    /*text-shadow: -4px 4px #ef3550,
               -8px 8px #f48fb1,
               -12px 12px #7e57c2,
               -16px 16px #2196f3,
               -20px 20px #26c6da,
               -24px 24px #43a047,
               -28px 28px #eeff41,
               -32px 32px #f9a825,
               -36px 36px #ff5722;*/
}
h2 {
    text-align: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
h3 {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.inline {
    display: inline-block;
    padding: 10px;
    vertical-align: middle;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 22px;
}
/* #login, #signup {
    text-decoration: underline;
    color: darkslategrey;
}
#login:hover {
    color: black;
}
#signup:hover {
    color: black;
    border-radius: 0.5em;
    padding: 10px 20px;
} */
#login, #signup {
    border-radius: 16px;
    font-size: 16px;
    padding: 10px 20px;
    transition-duration: 0.4s;
    vertical-align: middle;
    border: none;
    cursor:pointer;
    text-decoration: none;
    background-color: #C5ECEC;
    color:darkslategrey;
}
#login:hover, #signup:hover {
    box-shadow: 0 0 4px #000000;
    background-color: darkslategrey; 
    color: white;
}
</style>