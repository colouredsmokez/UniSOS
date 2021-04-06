<template>
    <div id="content">
      <img id="bckgrnd" src="../../assets/Rectangle.png">
      <router-link to="/mynotes" exact><img id="cross" src="../../assets/X.png"></router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#cross {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 40px;
    top: 140px;
    display: flex;
    align-items: center;
}
</style>