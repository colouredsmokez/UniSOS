<template>
    <div>
      <div id= "localview">
        <router-link to="/mynotes" exact><img id="cross" src="../../assets/X.png"></router-link>
      </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#localview {
  background: #47E4E4;
  margin-top: 0%;
  overflow: auto;
}
#cross {
    position: relative;
    width: 50px;
    height: 50px;
    margin-left: 40px;
    margin-top: 40px;
}
</style>