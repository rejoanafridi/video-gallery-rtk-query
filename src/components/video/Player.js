export default function Player({ video }) {
	const { title, thumbnail } = video;
	return (
		<iframe
			width="100%"
			className="aspect-video"
			src={thumbnail}
			title={title}
			frameBorder=""
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		></iframe>
	);
}
