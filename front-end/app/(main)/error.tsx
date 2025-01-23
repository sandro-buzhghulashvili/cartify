'use client';

interface GlobalErrorPageProps {
  error: Error;
}

const GlobalErrorPage = ({ error }: GlobalErrorPageProps) => {
  return (
    <div className="px-[10%]">
      <h1>This is global error : {error?.message}</h1>
    </div>
  );
};

export default GlobalErrorPage;
