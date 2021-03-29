<template>
    <div>
        <div class="landing">
            <!-- Main -->
            <div>
                <img src="../assets/UniSOSlogo.png">
                <p>Additional supplementary help for University Students.</p>
            </div>
            <!-- Button 1 -->
            <button class="btn">
                Help Juniors
            </button>
            <!-- Button 2 -->
            <button class="btn">
                Find Seniors
            </button>
        </div>
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
.landing {
    margin: auto;
    padding: 20px;
    text-align: center;
    font-family: 'FredokaOne';
}
.btn {
  font-family: 'FredokaOne';
  border-radius: 0.5em;
  padding: 10px 20px;
  transition-duration: 0.4s;
  background-color: #2BD7E2;
  color: white;
}
.btn:hover {
  background-color: black; /* Green */
  color: white;
}
</style>