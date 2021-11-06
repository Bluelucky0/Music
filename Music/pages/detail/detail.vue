<template>
	<view class="detail">
		<view class="fixbg" :style="{'background-image':'url('+ songDetail.al.picUrl +')'}"></view>
		<MusicHead :title="songDetail.name" :icon='icon' color="white"></MusicHead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				
				<view class="detail-play" @tap="handleToPlay">
					<image :src="songDetail.al.picUrl" :class="{'detail-play-run':isPlayRotate}" mode=""></image>
					<text class="iconfont" :class="iconPlay"></text>
					<view></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap" :style="{ transform:'translateY('+ -(lyricIndex-1)*82 +'rpx)'}">
						<view class="detail-lyric-item " :class="{active:lyricIndex == index}" v-for="(item,index) in songLyric" :key="index">{{ item.lyric }}</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">喜欢这首歌的人也听</view>
					<!-- <view class="detail-like-item">
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
					</view> -->
					
					<view class="detail-like-item" v-for="(item,index) in songSimi" :key='index' @tap="handleToSimi(item.id)">
						<view class="detail-like-img">
							<image :src="item.album.picUrl" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>{{ item.name }}</view>
							<view>
								<image v-if="item.privilege.flag > 60 && item.privilege.flag < 70" src="../../static/shiting.png" mode=""></image>
								<image v-if="item.privilege.maxbr == 999000" src="../../static/SQ.png" mode=""></image>
								{{ item.album.artists[0].name }}-{{ item.name }}
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
			
				
				<view class="detail-comment">
					<view class="detail-comment-head">精彩评论</view>
						<!-- <view class="detail-comment-item">
							<view class="detail-comment-img">
								<image src="../../static/logo.png" mode=""></image>
							</view>
							<view class="detail-comment-content">
								<view class="detail-comment-title">
									<view class="detail-comment-name">
										<view>是啊冗的冗</view>
										<view>2021年...</view>
									</view>
									<view class="detail-comment-like">
										5602 <text class="iconfont icon-icon"></text>
									</view>
								</view>
								<view class="detail-comment-text">
									测试文章测试文章测试文章测试文章
								</view>
							</view>
						</view> -->
												
						<view class="detail-comment-item" v-for="(item,index) in songComment" :key='index'>
							<view class="detail-comment-img">
								<image :src="item.user.avatarUrl" mode=""></image>
							</view>
							<view class="detail-comment-content">
								<view class="detail-comment-title">
									<view class="detail-comment-name">
										<view>{{ item.user.nickname }}</view>
										<view>{{ item.time | formatTime}}</view>
									</view>
									<view class="detail-comment-like">
										{{ item.likedCount | formatCount}}
										<text class="iconfont icon-icon"></text>
									</view>
								</view>
								<view class="detail-comment-text">
									{{ item.content }}
								</view>
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
	import {songDetail, songSimi, songComment, songLyric, songUrl} from '../../common/api.js'
	export default {
		data() {
			return {
				songDetail:{
					al:{
						picUrl:'',
						
					},
				},
				songSimi:[],
				songComment:[],
				songLyric:[],
				icon:true,
				lyricIndex:1,
				iconPlay:"icon-zanting",
				isPlayRotate:true,
				isLoading:true
				
			}
		},
		components:{MusicHead},
		onLoad(options) {
			//console.log(options.songid)
			this.getMusic(options.songid);
			//console.log(this.iconPlay)
			
		},
		onUnload(){
			this.cancelLyricIndex();
			// #ifdef H5
			this.bgAudioManager.destroy()
			// #endif
		},
		onHide(){
			this.cancelLyricIndex();
			// #ifdef H5
			this.bgAudioManager.destroy()
			// #endif
		},
		methods: {
			getMusic(songid){
				//this.$store.commit('NEXT_ID',songid)
				this.$store.commit('NEXT_ID',songid)
				uni.showLoading({
					title:'加载中....'
				});
				this.isLoading = true;
				
				Promise.all([ songDetail(songid), songSimi(songid), songComment(songid), songLyric(songid), songUrl(songid)]).then((res)=>{
					//console.log(res)
					if(res[0][1].data.code =='200'){
						this.songDetail = res[0][1].data.songs[0];
					}
					if(res[1][1].data.code == '200'){
						this.songSimi = res[1][1].data.songs;
					}
					if(res[2][1].data.code == '200'){
						this.songComment = res[2][1].data.hotComments;
					}
					if(res[3][1].data.code == '200'){
						let lyric = res[3][1].data.lrc.lyric;
						//console.log(lyric);
						let re = /\[([^\]]+)\]([^\[]+)/g;
						var result = [];
						lyric.replace(re,($0,$1,$2)=>{
							result.push({ "time":this.formatTimeToSec($1),"lyric":$2 })
						});
						this.songLyric =result;
						// console.log(songDetail.lyricIndex+'wosj');
					}
					if(res[4][1].data.code == '200'){
						// 微信端
						// #ifdef MP-WEIXIN
						this.bgAudioManager = uni.getBackgroundAudioManager();
						this.bgAudioManager.title = this.songDetail.name;
						// #endif
						// PC端
						// #ifdef H5
						//解决推出时仍然播放导致的多歌一起放
						if(!this.bgAudioManager){
							this.bgAudioManager = uni.createInnerAudioContext();
						}
						this.iconPlay = "icon-bofang1";
						this.isPlayRotate = false;
						// #endif
						
						
						this.bgAudioManager.src = res[4][1].data.data[0].url || '';
						//console.log(res[4][1].data.data[0].url)
						this.listenLyricIndex()
						this.bgAudioManager.onPlay(()=>{
							this.iconPlay = "icon-zanting";
							this.isPlayRotate = true;
							this.listenLyricIndex()
							//console.log(this.iconPlay)
						});
						this.bgAudioManager.onPause(()=>{
							this.iconPlay = "icon-bofang1";
							this.isPlayRotate = false;
							this.cancelLyricIndex()
						});
						this.bgAudioManager.onEnded(()=>{
							this.getMusic(this.$store.store.nextId)
						})
					}
					this.isLoading=false
					uni.hideLoading()
				})
			},
			formatTimeToSec(value){
				let arr = value.split(':');
				return (Number(arr[0]*60) + Number(arr[1])).toFixed(1);
			},
			handleToPlay(){
				if(this.bgAudioManager.paused){
					this.bgAudioManager.play()
				}
				else{
					this.bgAudioManager.pause()
				}
			},
			listenLyricIndex(){
				clearInterval(this.timer)
				this.timer = setInterval(()=>{
					//判断当歌词到底的时候退出
					for(var i=0;i<this.songLyric.length;i++){
						if(this.bgAudioManager.currentTime>this.songLyric[this.songLyric.length-1].time){
							this.lyricIndex = this.songLyric.length-1;
							break;
						}
						if(this.bgAudioManager.currentTime > this.songLyric[i].time && this.bgAudioManager.currentTime < this.songLyric[i+1].time){
							this.lyricIndex = i;
						}
					}
					//console.log(this.lyricIndex)
				},500)
			},
			cancelLyricIndex(){
				clearInterval(this.timer)
			},
			handleToSimi(songid){
				this.getMusic(songid)
			}
		}
	}
</script>

<style scoped>
	.detail-play{width: 580rpx;height: 580rpx;background-size: cover;margin: 214rpx auto 0 auto;position: relative;}
	.detail-play image{width: 580rpx;height: 580rpx;border-radius: 50%;position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin: auto;animation: 10s linear move infinite;animation-play-state: paused;}
	.detail-play .detail-play-run{animation-play-state: running;}
	@keyframes move{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	
	.detail-play text{width: 100rpx;height: 100rpx;font-size: 100rpx;color: white;position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin: auto;}
	/* 如果有网易云播放的CD就可以用，那个指针 */
	/* .detail-play view{width: 230rpx;height: 360rpx;background: url();position: absolute;left: 80rpx;right: 0;top: -20rpx;margin: auto;background-size: cover;} */

	.detail-lyric{height: 246rpx;font-size: 32rpx;line-height: 82rpx;text-align: center;overflow: hidden;color: #6f6e73;}
	.detail-lyric-wrap{transition: .5s;}  
	.detail-lyric-item{height: 82rpx;}
	.detail-lyric.active{color: white;}
	.active{color: white;}
	
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
	
	.detail-comment{margin: 0 30rpx;}
	.detail-comment-head{font-size: 36rpx;color: white;margin: 50rpx 0;}
	.detail-comment-item{margin-bottom: 28rpx;display: flex;}
	.detail-comment-img{width: 64rpx;height: 64rpx;border-radius: 50%;overflow: hidden;margin-right: 18rpx;}
	.detail-comment-img image{width: 100%;height: 100%;}
	.detail-comment-content{flex: 1;color: #cbcacf;}
	.detail-comment-title{display: flex;justify-content: space-between;}
	.detail-comment-name{}
	.detail-comment-name view:nth-child(1){font-size: 26rpx;}
	.detail-comment-name view:nth-child(2){font-size: 20rpx;}
	.detail-comment-like{font-size: 28rpx;}
	.detail-comment-like text{font-size: 28rpx;margin-left: 14rpx;}
	.detail-comment-text{font-size: 28rpx;line-height: 40rpx;color: white;margin-top: 20rpx;border-bottom: 1px #e0e0e0 solid;padding-bottom: 40rpx;}
</style>
