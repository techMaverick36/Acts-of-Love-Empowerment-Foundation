import { FiArrowLeft } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";
import StatusMessage from "../components/ui/StatusMessage";
import { PAGES } from "../config/seo";

export default function NotFoundPage() {
	const { pathname } = useLocation();
	return (
		<PageLayout seo={{ ...PAGES.notFound, path: pathname }} offsetHeader>
			<StatusMessage
				eyebrow="Page Not Found"
				title="We couldn't find that page"
				action={
					<Button to="/" variant="secondary" icon={FiArrowLeft}>
						Back to Home
					</Button>
				}
			>
				The page you're looking for may have moved or no longer exists.
			</StatusMessage>
		</PageLayout>
	);
}
