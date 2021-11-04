<template>
	<view class="music-head" :style="{ color:color}">
		<view v-if="icon" class="music-head-icon">
			<!-- @tap绑定事件 -->
			<text class="iconfont icon-zuojiantou" @tap="handleToBack"></text> | <text class="iconfont icon-shouye" @tap="handleToHome"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['title','icon','color'],
		methods:{
			handleToBack(){
				uni.navigateBack();
			},
			handleToHome(){
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style scoped>
	.music-head{width: 100%;height: 75px;font-size: 16px;line-height: 80px;text-align: center;position: relative;color: black;}
	.music-head-icon{position: absolute; left: 8px;width: 90px;top: 26px;height: 30px;background: rgba(0,0,0,0.4);color: white;line-height: 31px;border-radius: 15px;display: flex;justify-content: space-evenly;}
</style>
