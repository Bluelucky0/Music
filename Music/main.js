import Vue from 'vue'
import App from './App'
import store from 'store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

//定义一个全局过滤器，过滤穿过来的数字
Vue.filter('formatCount',function(value){
	if( value >=10000 && value <=100000000){
		value /= 10000;
		return value.toFixed(1) + "万";
	}
	else if(value >=100000000){
		value /= 100000000;
		return value.toFixed(1) + "亿";
	}
	else{
		return value
	}
});

// Vue.filter('formatTime',function(value){
// 	var data = new Data(value)
// 	return data.getFullYear() + '年' + (data.getMonth() + 1) + '月' + data.getData() + '日';
// });
Vue.filter('formatTime',function(value){
	//data 不等于 date, 写错了找了半天
	var data = new Date(value)
	return data.getFullYear() + "年" +(data.getMonth()+1) +'月' + data.getDate()+'日'
})

const app = new Vue({
    ...App,
	store
})
app.$mount()
