<template>
	<view class="index">
		<MusicHead title="云云音乐" :icon='false'></MusicHead>
		<view class="container">
			<!-- 设置保持头部不用MusicHead不动，只有下面主题部分滑动 -->
			<scroll-view scroll-y="true" >
				<view class="index-search">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲"/>
				</view>
				<view class="index-list">
					<!-- <view class="index-list-item">
						<view class="index-list-item-img">
							<image src="../../static/logo.png" mode=""></image>
							<text>每日更新</text>
						</view>
						<view class="index-text">
							<view>1.与我无关</view>
							<view>2.与我无关</view>
							<view>3.与我无关</view>
						</view>
					</view> -->
					<view class="index-list-item" v-for="(item,index) in topList" :key='index' @tap="headleToList(item.ListId)">
						<view class="index-list-item-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="index-text">
							<view v-for="(list,index) in item.tracks" :key='index'>{{index +1}}.{{list.first}}-{{list.second}}</view>
						</view>
					</view>
					
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/common/iconfont.css'
	import MusicHead from '../../components/MusicHead/MusicHead'
	import {topList} from '../../common/api.js'
	export default {
		data() {
			return {
				topList:[]
			}
		},
		components:{
			MusicHead
		},
		onLoad() {
			topList().then((res)=>{
				//console.log(res)
				if(res.length){
					this.topList = res
				}
				
			})
		},
		methods: {
			headleToList(ListId){
				uni.navigateTo({
					url: '/pages/list/list?ListId=' + ListId,
				});
			}

		}
	}
</script>

<style scoped>
	.index{}
	.index-search{display: flex;align-items: center;height: 70rpx;margin: 20rpx 30rpx 30rpx 30rpx;background: #f7f7f7;border-radius: 50rpx;}
	.index-search text{ font-size: 26rpx;margin: 0 26rpx 0 28rpx;}
	.index-search input{ font-size: 28rpx;flex: 1;}
	.index-list{margin: 0 30rpx;}
	.index-list-item{display: flex;margin-bottom: 34rpx;}
	.index-list-item-img{width: 212rpx;height: 212rpx;position: relative;border-radius: 30rpx;overflow: hidden;margin-right: 22rpx;}
	.index-list-item-img image{width: 100%;height: 100%;}
	.index-list-item-img text{position: absolute;left: 12rpx;bottom: 16rpx;color: white;font-size: 20rpx;}
	.index-text{font-size: 24rpx;line-height: 66rpx;margin-left: 16rpx;}
</style>
