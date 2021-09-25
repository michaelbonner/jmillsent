import { MdGridOn as icon } from "react-icons/md"

export default {
	name: "studioPage",
	title: "Studio Page",
	type: "document",
	icon,
	fields: [
		{
			name: "seo_title",
			title: "SEO Title",
			type: "string",
		},
		{
			name: "seo_description",
			title: "SEO Description",
			type: "string",
		},
	],
	preview: {
		select: {},
		prepare(selection) {
			return {
				title: `Studio Page`,
			}
		},
	},
}
