<template>
    <div class="landing">
        <!-- Blank -->
        <div style="height:30vh"></div>
        <!-- Main -->
        <div>
            <h1>Online Learning</h1>
            <p>We provide a platform for juniors to seek help from seniors. You can help a junior out or find a senior to guide you in your module.</p>
            <!-- Button 1 -->
            <button class="btn"> Find Seniors </button>
            <!-- Button 2 -->
            <button class="btn"> Help Juniors </button>
        </div>
        <!-- Blank -->
        <div style="height:30vh"></div>
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
    background-image: url('../assets/Background.png');
    height: 80vh;
    color: white;
}
.btn {
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
}
</style>