import DocumentsList from './DocumentsList';

export default async function Documents() {

  const data = await getData();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Documents</h1>
      <DocumentsList data={data} />
    </div>
  );
}

async function getData() {
  const res = await fetch("http://localhost:3000/api/getDocuments");

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  };

  const { files } = await res.json();

  if (!files) {
    throw new Error('Failed to receive files')
  }

  return files;
}
