// utils/checkUrlRedirect.js
export const checkUrlRedirect = (req, expectedPath) => {
  // Extract the current path and target path
  const currentPath = req.url;
  const targetPath = expectedPath;

  const extractParams = (url) => {
    try {
      const params = new URL(url, process.env.NEXT_PUBLIC_WEBAPP_BASE_URL).searchParams;
      return {
        category: params.get('category'),
        id: params.get('id'),
      };
    } catch {
      return {};
    }
  };
  const extractCategoryAndId = (path) => {
    const match = path.match(/^\/([^/]+).*article-(\d+)/);
    if (match) {
      return {
        category: match[1], // Extract category (e.g., "news")
        id: match[2], // Extract ID (e.g., "151071182")
      };
    }
    return {};
  };

  // Extract parameters from the current and target paths
  const currentParams = extractParams(currentPath);
  const targetParams = extractCategoryAndId(targetPath);

  // Check if category and id match
  if (
    currentParams.category === targetParams.category &&
    currentParams.id === targetParams.id
  ) {
    // No redirect needed
    return false;
  }

  // Redirect if paths or parameters don't match
  if (currentPath !== targetPath && targetPath !== '/undefined') {
    return {
      redirect: {
        destination: targetPath,
        permanent: false,
      },
    };
  }

  // No redirect needed
  return false;
};
