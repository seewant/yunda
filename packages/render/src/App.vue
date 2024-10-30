<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-01-16 17:59:17
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-03-15 14:52:26
-->
<script>
export default {
  onLaunch: function () {
    console.log("进入小程序");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-plus/index.scss";
</style>
