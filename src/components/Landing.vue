<template>
    <div class="landing">
        <!-- Blank -->
        <div style="height:15vh"></div>
        <!-- Main -->
        <div id="msg">
            <h1>Online Uni Resources</h1>
            <br>
            <h3>Academic guidance can be difficult to come by in University. </h3>
            <h3 id="uds">We understand.</h3>
            
            <h3>Therefore, we created UniSOS as a platform for seniors to sell juniors</h3>
            <h3>their resources for the modules they have completed.</h3>
            
            <router-link class="unauth" to="/login"><h2 class="inline" id="login">Log in</h2></router-link>
            <h2 class="inline">or</h2>
            <router-link class="unauth" to="/register"><h2 class="inline" id="signup">Sign up</h2></router-link>
            <h2 class="inline">now!</h2>
            <!-- Button 1 -->
        </div>
        <!-- Blank 
        <div style="height:30vh"></div>-->
    </div>
</template>

<script>
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
.landing {
    margin: auto;
    padding: 20px;
    text-align: center;
    font-family: 'FredokaOne';
    background-image: url('../assets/Background.png');
    height: 80vh;
    color: white;
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
h1 {
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
.inline {
  display: inline-block;
  padding: 10px;
  vertical-align: middle;
}
#login, #signup {
    text-decoration: underline;
    color: darkslategrey;
}
#login:hover {
    color: darkslateblue;
    border-radius: 0.5em;
    padding: 10px 20px;
}
#signup:hover {
    color: darkslateblue;
    /*border-radius: 0.5em;
    padding: 10px 20px;*/
}
</style>