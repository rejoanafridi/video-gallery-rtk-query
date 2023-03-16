import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import React from "react";

export default function Video() {
	const { videoId } = useParams();
	const { data: video, isLoading, isError } = useGetVideoQuery(videoId);

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
	if (!isLoading && isError) {
		content = <Error message="There was an Error" />;
	}

	if (!isLoading && !isError && video?.id) {
		content = (
			<>
				<Player video={video} />
				<Description video={video} />
			</>
		);
	}
	return (
		<>
			<section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
				<div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
					<div className="grid grid-cols-3 gap-2 lg:gap-8">
						<div className="col-span-full w-full space-y-8 lg:col-span-2">
							{content}
						</div>

						{video?.id && <RelatedVideos video={video} />}
					</div>
				</div>
			</section>
		</>
	);
}
