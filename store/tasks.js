import { defineStore } from "pinia";

export const useTaskStore = defineStore("tasks", {
	state: () => ({
		tasks: [
			{ id: 1, title: "hello" },
			{ id: 2, title: "hfsdaello 12" },
		],
		name: "5555555",
		searchVal: "",
	}),
	getters: {
		search(state) {
			return state.tasks.filter((task) =>
				task.title.match(this.searchVal),
			);
		},
	},
	actions: {
		change() {
			this.name = "lllllll";
		},
	},
});
