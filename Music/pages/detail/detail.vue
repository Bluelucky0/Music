<template>
	<view class="detail">
		<view class="fixbg" :style="{'background-image':'url(static/about1.jpg)'}"></view>
		<MusicHead title="歌单" :icon='true' color="white"></MusicHead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="detail-play">
					<image src="../../static/logo.png" mode=""></image>
					<text class="iconfont icon-bofang1"></text>
					<view></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap">
						<view class="detail-lyric-item">aaaaaa</view>
						<view class="detail-lyric-item active">aaaaaa</view>
						<view class="detail-lyric-item">aaaaaa</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">喜欢这首歌的人也听</view>
					<view class="detail-like-item">
						<view class="detail-like-img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>蓝心羽</view>
							<view>
								<image src="../../static/shiting.png" mode=""></image>
								<image src="../../static/SQ.png" mode=""></image>
								lanxiny-lan
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
				
				<view class="detail-like">
					<view class="detail-like-head">喜欢这首歌的人也听</view>
					<view class="detail-like-item">
						<view class="detail-like-img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>蓝心羽</view>
							<view>
								<image src="../../static/shiting.png" mode=""></image>
								<image src="../../static/SQ.png" mode=""></image>
								lanxiny-lan
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">喜欢这首歌的人也听</view>
					<view class="detail-like-item">
						<view class="detail-like-img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>蓝心羽</view>
							<view>
								<image src="../../static/shiting.png" mode=""></image>
								<image src="../../static/SQ.png" mode=""></image>
								lanxiny-lan
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">喜欢这首歌的人也听</view>
					<view class="detail-like-item">
						<view class="detail-like-img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>蓝心羽</view>
							<view>
								<image src="../../static/shiting.png" mode=""></image>
								<image src="../../static/SQ.png" mode=""></image>
								lanxiny-lan
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/common/iconfont.css'
	import MusicHead from '../../components/MusicHead/MusicHead'
	export default {
		data() {
			return {
				
			}
		},
		components:{MusicHead},
		onLoad(options) {
			console.log(options.songid)
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.detail-play{width: 580rpx;height: 580rpx;background-size: cover;margin: 214rpx auto 0 auto;position: relative;}
	.detail-play image{width: 580rpx;height: 580rpx;border-radius: 50%;position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin: auto;}
	.detail-play text{width: 100rpx;height: 100rpx;font-size: 100rpx;color: white;position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin: auto;}
	/* 如果有网易云播放的CD就可以用，那个指针 */
	/* .detail-play view{width: 230rpx;height: 360rpx;background: url();position: absolute;left: 80rpx;right: 0;top: -20rpx;margin: auto;background-size: cover;} */

	.detail-lyric{height: 246rpx;font-size: 32rpx;line-height: 82rpx;text-align: center;overflow: hidden;color: #6f6e73;}
	.detail-lyric-wrap{}
	.detail-lyric-item{height: 82rpx;}
	.detail-lyric.active{color: white;}
	
	.detail-like{margin: 0 30rpx;}
	.detail-like-head{font-size: 36rpx;color: white;margin: 50rpx 0;}
	.detail-like-item{display: flex;align-items: center;margin-bottom: 28rpx;}
	.detail-like-img{width: 82rpx;height: 82rpx;border-radius: 20rpx;overflow: hidden;margin-right: 20rpx;}
	.detail-like-img image{width: 100%;height: 100%;}
	.detail-like-song{flex: 1;color: #c6c2bf;}
	.detail-like-song view:nth-child(1){font-size: 28rpx;color: white;margin-bottom: 12rpx;}
	.detail-like-song view:nth-child(2){font-size: 22rpx;}
	.detail-like-song image{width: 26rpx;height: 20rpx;margin-right: 10rpx;}
	.detail-like-item text{font-size: 50rpx;color: #c6c2bf;}
</style>
