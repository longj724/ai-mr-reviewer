const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-900 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
