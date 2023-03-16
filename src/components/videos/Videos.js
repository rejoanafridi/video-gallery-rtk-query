import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";

import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";
import { useEffect, useState } from "react";

export default function Videos() {
	const [data, setData] = useState(false);
	const {
		data: videos,
		isLoading,
		isError,
	} = useGetVideosQuery();

	useEffect(() => {
		setData(true);
	}, []);

	// decide what to render
	let content = null;
	if (isLoading) {
		content = (
			<>
				<VideoLoader />
				<VideoLoader />
				<VideoLoader />
				<VideoLoader />
			</>
		);
	}
	if (!isLoading && isError) {
		content = <Error message="There was an Error" />;
	}
	if (!isLoading && isError && videos?.length === 0) {
		content = <Error message="There was an Error" />;
	}

	if (!isLoading && !isError && videos?.length > 0) {
		content = videos.map((video) => (
			<Video key={video.id} video={video} />
		));
	}

	return content;
}
