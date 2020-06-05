import Vue from 'vue'; // Vue
import Vuex from 'vuex'; // Vuex

Vue.use(Vuex);

const store = new Vuex.Store({
	/**
	 * State
	 */ 
	state: {
		// 我的名字
		myName: '陈万照'
	},
	
	/**
	 * Mutation
	 */ 
	mutations: {
		/**
		 * 更新我的名字
		 */ 
		myName(state, myName) {
			state.myName = myName;
		}
	},
	
	/**
	 * Action
	 */ 
	actions: {},
	
	/**
	 * Module
	 */ 
	modules: {}
});

export default store;