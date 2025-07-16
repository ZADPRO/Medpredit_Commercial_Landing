import { Helmet } from "react-helmet";

interface SeoProps {
  title: string;
  description: string;
  keywords: string[];
}

const Seo: React.FC<SeoProps> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
    </Helmet>
  );
};

export default Seo;
