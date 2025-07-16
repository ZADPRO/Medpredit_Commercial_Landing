import { useLocation } from "react-router-dom";

const Version = () => {
  const location = useLocation();
  const version = location.state?.versionDetails;

  if (!version) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No version data found.
      </div>
    );
  }

  return (
    <div className="bg-[#fff7f3] text-[#0F3B36] min-h-screen py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold text-[#07332f] mb-2">
            Version {version.version}
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            {"("}{version.refStatus}{")"}
          </p>
          
          <p className="text-gray-600 text-sm mb-4">
            Released: {new Date(version.releaseDate).toLocaleDateString()}
          </p>

          <h2 className="text-lg font-semibold text-[#07332f] mb-2">
            Release Notes
          </h2>
          <p
            className="text-gray-700 leading-relaxed text-sm"
            dangerouslySetInnerHTML={{
              __html: version.notes,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Version;
