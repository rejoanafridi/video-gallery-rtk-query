import { useState } from "react";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { useEditVideoMutation } from "../../features/api/apiSlice";
import Success from "../ui/Success";
import Error from "../ui/Error";

export default function Form({ video }) {
	const {
		id,
		title: initialTitle,
		author: initialAuthor,
		description: initialDescription,
		link: initialLink,
		thumbnail: initialThumbnail,
		date: initialDate,
		duration: initialDuration,
		views: initialViews,
	} = video;
	const [editVideo, { data: editedVideo, isLoading, isError, isSuccess }] =
		useEditVideoMutation();
	const [inputForm, setInputForm] = useState({
		title: initialTitle,
		author: initialAuthor,
		description: initialDescription,
		link: initialLink,
		thumbnail: initialThumbnail,
		date: initialDate,
		duration: initialDuration,
		views: initialViews,
	});

	const reset = () => {
		setInputForm({
			title: "",
			author: "",
			description: "",
			link: "",
			thumbnail_link: "",
			date: "",
			video_duration: "",
			views: "",
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		editVideo({
			id: id,

			data: {
				title: inputForm.title,
				author: inputForm.author,
				description: inputForm.description,
				link: inputForm.link,
				thumbnail: inputForm.thumbnail,
				date: inputForm.date,
				video: inputForm.duration,
				views: inputForm.views,
			},
		});
	
	};

	return (
		<form onSubmit={handleSubmit} method="POST">
			<div className="shadow overflow-hidden sm:rounded-md">
				<div className="px-4 py-5 bg-white sm:p-6">
					<div className="grid grid-cols-6 gap-6">
						<div className="col-span-6 sm:col-span-3">
							<TextInput
								title="Video Title"
								required
								onChange={(e) =>
									setInputForm({ ...inputForm, title: e.target.value })
								}
								value={inputForm.title}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<TextInput
								title="Author"
								required
								onChange={(e) =>
									setInputForm({ ...inputForm, author: e.target.value })
								}
								value={inputForm.author}
							/>
						</div>

						<div className="col-span-6">
							<TextArea
								title="Description"
								required
								onChange={(e) =>
									setInputForm({ ...inputForm, description: e.target.value })
								}
								value={inputForm.description}
							/>
						</div>

						<div className="col-span-6">
							<TextInput
								title="YouTube Video link"
								required
								onChange={(e) =>
									setInputForm({ ...inputForm, link: e.target.value })
								}
								value={inputForm.link}
							/>
						</div>

						<div className="col-span-6">
							<TextInput
								title="Thumbnail link"
								required
								onChange={(e) =>
									setInputForm({ ...inputForm, thumbnail: e.target.value })
								}
								value={inputForm.thumbnail}
							/>
						</div>

						<div className="col-span-6 sm:col-span-6 lg:col-span-2">
							<TextInput
								title="Upload Date"
								required
								onChange={(e) =>
									setInputForm({ ...inputForm, date: e.target.value })
								}
								value={inputForm.date}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3 lg:col-span-2">
							<TextInput
								title="Video Duration"
								required
								onChange={(e) =>
									setInputForm({ ...inputForm, duration: e.target.value })
								}
								value={inputForm.duration}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3 lg:col-span-2">
							<TextInput
								title="Video no of views"
								required
								onChange={(e) =>
									setInputForm({
										...inputForm,
										views: e.target.value,
									})
								}
								value={inputForm.views}
							/>
						</div>
					</div>
				</div>
				<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
					<button
						disabled={isLoading}
						type="submit"
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
					>
						Save
					</button>
				</div>
				{isError ? <Error message={"There was an error!!"} /> : ""}
				{isSuccess ? <Success message="Video was Update successfully" /> : ""}
			</div>
		</form>
	);
}
