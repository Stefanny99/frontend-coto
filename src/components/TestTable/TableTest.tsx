import { useQuery } from "@apollo/client";
import { QUERY_ALL_DATA } from "./queries";

interface TableTestProps {
  id?: string;
  testing_string?: string;
}

const TestTable: React.FC<TableTestProps> = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.test.map(({ id, testing_string }) => (
    <div key={id}>
      <p>first query: {testing_string}</p>
    </div>
  ));
};

export default TestTable;
