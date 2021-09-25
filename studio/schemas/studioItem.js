import { MdLocalMovies as icon } from "react-icons/md"

export default {
	name: "studioItem",
	title: "Studio Items",
	type: "document",
	icon,
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "subTitle",
			title: "Sub Title",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 100,
			},
		},
		{
			name: "description",
			title: "Description",
			type: "string",
		},
		{
			name: "poster",
			title: "Poster Image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "order",
			title: "Order",
			type: "number",
			hidden: true,
		},
	],
	preview: {
		select: {
			clientName: "clientName",
			title: "title",
			media: "poster",
		},
		prepare(selection) {
			return {
				title: `${
					selection.clientName ? `${selection.clientName} | ` : ""
				}${selection.title || ""}`,
				date: selection.date,
				subtitle: selection.date,
				media: selection.media,
			}
		},
	},
}
