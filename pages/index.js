import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

// Redux
import { fetchReposRequest } from "@/redux/repos/repoSlice";

// Helpers
import { getDateXDaysAgo } from "@/helpers";

const RepoPage = () => {
  const dispatch = useDispatch();
  const { repos, loading, error } = useSelector((state) => state.repos);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchReposRequest({ date: getDateXDaysAgo(10), page }));
  }, [dispatch, page]);

  const handleScroll = useCallback(
    (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [loading]
  );

  useEffect(() => {
    if (!loading) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, loading]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Most Starred GitHub Repos
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-4">
          {repos.map(({ id, owner, name, description, stargazers_count }) => (
            <div
              key={id}
              className="flex flex-col sm:flex-row items-center bg-white shadow rounded-lg p-4 space-y-4 sm:space-y-0 sm:space-x-4"
              role="article"
              aria-labelledby={`repo-${id}`}
            >
              <Image
                src={owner.avatar_url}
                alt={`${owner.login} avatar`}
                width={500}
                height={300}
                priority
                className="w-16 h-16 rounded-full border border-gray-300"
              />
              <div className="flex-1">
                <h3
                  id={`repo-${id}`}
                  className="text-lg font-bold text-gray-800"
                >
                  {name}
                </h3>
                <p className="text-gray-600">
                  {description || "No description available."}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500 font-semibold">
                  ⭐ {stargazers_count}
                </span>
                <span className="text-sm text-gray-500">
                  by {owner.login}
                </span>
              </div>
            </div>
          ))}
          {loading && (
            <p className="text-center text-blue-600 font-medium">
              Loading more repositories...
            </p>
          )}
          {error && (
            <p className="text-center text-red-600 font-medium">
              Error: {error.message || "Something went wrong."}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default RepoPage;
